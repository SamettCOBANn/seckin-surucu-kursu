import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadTypeScript(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { trainingGuides, trainingSources, trainingProcess } = await loadTypeScript("../src/content/training-guides.ts");
const { trainingOfferings } = await loadTypeScript("../src/content/training-offerings.ts");
const { vehicles } = await loadTypeScript("../src/content/vehicles.ts");

test("every published offering links to its category's existing detail route", () => {
  for (const guide of Object.values(trainingGuides)) {
    const offerings = trainingOfferings.filter((offering) => offering.category === guide.category);
    assert.ok(offerings.length > 0, guide.category);
    assert.equal(new Set(offerings.map((offering) => offering.detailHref)).size, 1);
    for (const offering of offerings) {
      assert.ok(existsSync(new URL(`../src/app${offering.detailHref}/page.tsx`, import.meta.url)), offering.detailHref);
    }
  }
  assert.equal(trainingOfferings.find((item) => item.id === "b-manual").detailHref,
    trainingOfferings.find((item) => item.id === "b-automatic").detailHref);
});

test("regulatory references resolve and independent reviews carry a date", () => {
  const ids = new Set(trainingSources.map((source) => source.id));
  assert.equal(ids.size, trainingSources.length);
  for (const section of [...Object.values(trainingGuides), trainingProcess]) {
    for (const id of section.sourceIds) assert.ok(ids.has(id), id);
  }
  for (const source of trainingSources) {
    assert.equal(new URL(source.url).protocol, "https:");
    assert.ok(source.basis.length > 0);
    if (source.verification === "authority-reviewed") assert.match(source.reviewedAt ?? "", /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("vehicle offering associations cannot reference an unpublished training option", () => {
  const ids = new Set(trainingOfferings.map((offering) => offering.id));
  for (const vehicle of vehicles) {
    for (const id of vehicle.offeringIds) assert.ok(ids.has(id), `${vehicle.id}: ${id}`);
  }
});

test("final fleet images exist and their recorded dimensions match the PNG assets", () => {
  assert.equal(vehicles.filter((vehicle) => vehicle.active).length, 5);
  assert.equal(new Set(vehicles.map((vehicle) => vehicle.id)).size, vehicles.length);
  for (const vehicle of vehicles) {
    assert.ok(vehicle.image, vehicle.id);
    const bytes = readFileSync(new URL(`../public${vehicle.image.src}`, import.meta.url));
    assert.equal(bytes.subarray(1, 4).toString(), "PNG");
    assert.equal(bytes.readUInt32BE(16), vehicle.image.width, vehicle.name);
    assert.equal(bytes.readUInt32BE(20), vehicle.image.height, vehicle.name);
    if (vehicle.kind === "motorcycle") {
      assert.equal(vehicle.manufacturer, null);
      assert.equal(vehicle.model, null);
      assert.equal(vehicle.transmission, null);
    }
  }
  for (const [category, count] of [["B", 3], ["A1", 1], ["A2", 1]]) {
    const ids = trainingOfferings.filter((offering) => offering.category === category).map((offering) => offering.id);
    assert.equal(vehicles.filter((vehicle) => vehicle.active && vehicle.offeringIds.some((id) => ids.includes(id))).length, count);
  }
});
