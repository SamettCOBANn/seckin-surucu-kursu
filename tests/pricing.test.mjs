import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadTypeScript(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { pricing } = await loadTypeScript("../src/content/pricing.ts");
const { formatTurkishLira } = await loadTypeScript("../src/lib/money.ts");

test("pricing amounts are non-negative integer kuruş and official component totals agree", () => {
  const amounts = pricing.courseFees.items.map((fee) => fee.amountKurus);
  for (const fee of pricing.officialFees.items) {
    amounts.push(fee.harcKurus, fee.valuablePaperKurus, fee.foundationServiceKurus, fee.totalKurus);
    assert.equal(fee.totalKurus, fee.harcKurus + fee.valuablePaperKurus + fee.foundationServiceKurus, fee.id);
  }
  for (const amount of amounts) {
    assert.ok(Number.isSafeInteger(amount) && amount >= 0);
  }
});

test("course list covers requested categories and exam attempts without duplicate IDs", () => {
  assert.deepEqual(pricing.courseFees.items.filter((fee) => fee.kind === "base-training").map((fee) => fee.category), ["A1", "A2", "A", "B"]);
  assert.ok(pricing.courseFees.items.some((fee) => fee.kind === "penalty-training"));
  assert.deepEqual(pricing.courseFees.items.find((fee) => fee.kind === "driving-exam-retake")?.attempts, [2, 3, 4]);
  const ids = [...pricing.courseFees.items, ...pricing.officialFees.items].map((fee) => fee.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("money formatting preserves kuruş and rejects invalid amounts", () => {
  assert.equal(formatTurkishLira(123456), "₺1.234,56");
  assert.equal(formatTurkishLira(0), "₺0,00");
  for (const value of [-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => formatTurkishLira(value), RangeError);
  }
});

test("authority-verified prices require source URL and review date", () => {
  for (const { source } of [pricing.courseFees, pricing.officialFees]) {
    if (source.verification === "authority-verified") {
      assert.ok(source.authoritativeUrl?.startsWith("https://"));
      assert.match(source.verifiedAt ?? "", /^\d{4}-\d{2}-\d{2}$/);
    }
  }
});
