import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Check the built Worker with `npm run start:vinext` running in another terminal.
const baseUrl = new URL(process.argv[2] ?? "http://127.0.0.1:4173");
assert.ok(["127.0.0.1", "localhost", "[::1]"].includes(baseUrl.hostname), "Use a local preview URL");

async function loadContent(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { registrationPolicy } = await loadContent("../src/content/registration.ts");
const { getNextRegistrationDeadline } = await loadContent("../src/lib/registration.ts");
const { vehicles } = await loadContent("../src/content/vehicles.ts");
const routes = ["/", "/fiyatlar", "/egitimler", "/egitimler/b-sinifi", "/egitimler/a1", "/egitimler/a2"];
const assets = new Set();

for (const route of routes) {
  const before = getNextRegistrationDeadline(new Date(), registrationPolicy).deadline.toISOString();
  const response = await fetch(new URL(route, baseUrl));
  assert.equal(response.status, 200, route);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/, route);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route}: server-rendered H1`);
  assert.match(html, /<title>[^<]+<\/title>/, `${route}: metadata`);
  for (const match of html.matchAll(/(?:src|href)="([^\"]+)"/g)) {
    if (match[1].startsWith("/_next/static/")) assets.add(match[1]);
  }
  if (route === "/") {
    const after = getNextRegistrationDeadline(new Date(), registrationPolicy).deadline.toISOString();
    const rendered = html.match(/<time\s+dateTime="([^\"]+)"/)?.[1];
    assert.ok(rendered === before || rendered === after, "Deadline must match current server time");
    assert.match(response.headers.get("cache-control") ?? "", /no-store/, "Deadline HTML must not be cached");
    assert.ok(html.includes("Kayıt İçin Gerekli Belgeler"), "Documents must be server-rendered");
    const second = await fetch(new URL(route, baseUrl));
    assert.equal(second.status, 200);
    assert.match(second.headers.get("cache-control") ?? "", /no-store/);
  }
  console.log(`PASS ${route}`);
}

assert.ok(assets.size > 0, "Built CSS/JavaScript must be referenced");
for (const asset of assets) {
  const response = await fetch(new URL(asset.replaceAll("&amp;", "&"), baseUrl));
  assert.equal(response.status, 200, asset);
}
for (const { image } of vehicles.filter((vehicle) => vehicle.active && vehicle.image)) {
  const imageUrl = new URL("/_next/image", baseUrl);
  imageUrl.search = new URLSearchParams({ url: image.src, w: "640", q: "75" }).toString();
  const response = await fetch(imageUrl);
  assert.equal(response.status, 200, image.src);
  assert.match(response.headers.get("content-type") ?? "", /^image\//, image.src);
  const bytes = await response.arrayBuffer();
  const sourceBytes = readFileSync(new URL(`../public${image.src}`, import.meta.url));
  assert.ok(bytes.byteLength > 0 && bytes.byteLength < sourceBytes.byteLength, `${image.src}: optimized delivery`);
}
console.log(`PASS ${assets.size} built assets, five optimized vehicle images, current deadline and uncached homepage`);
