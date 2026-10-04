import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run against either a normal Next.js production server or the built Workers preview.
const base = new URL(process.argv[2] ?? "http://127.0.0.1:3101");
assert.ok(["127.0.0.1", "localhost", "[::1]"].includes(base.hostname), "Use a local preview URL");
const origin = "https://seckinsurucu68.com";
const paths = ["/", "/fiyatlar", "/egitimler", "/egitimler/b-sinifi", "/egitimler/a1", "/egitimler/a2"];
const titles = new Set(), descriptions = new Set(), internalLinks = new Set(), icons = new Set();
const pages = new Map();
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(([tag]) =>
    Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^\"]*)"/g)].map(([, key, value]) => [key, decode(value)])));
}

for (const path of paths) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  pages.set(path, html);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: H1`);
  const links = tags(html, "link"), meta = tags(html, "meta");
  const canonical = links.filter((link) => link.rel === "canonical");
  assert.equal(canonical.length, 1, path);
  assert.equal(new URL(canonical[0].href).href, new URL(path, origin).href, `${path}: canonical`);
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
  const description = meta.find((tag) => tag.name === "description")?.content;
  assert.ok(title && description);
  titles.add(title); descriptions.add(description);
  assert.equal(meta.find((tag) => tag.property === "og:url")?.content, canonical[0].href);
  assert.equal(meta.find((tag) => tag.property === "og:title")?.content, title);
  assert.equal(meta.find((tag) => tag.property === "og:description")?.content, description);
  assert.equal(meta.find((tag) => tag.property === "og:locale")?.content, "tr_TR");
  assert.equal(meta.find((tag) => tag.property === "og:image")?.content, `${origin}/images/brand/seckin-logo.png`);
  assert.equal(meta.find((tag) => tag.name === "twitter:card")?.content, "summary_large_image");
  assert.equal(meta.find((tag) => tag.name === "twitter:title")?.content, title);
  assert.equal(meta.find((tag) => tag.name === "twitter:description")?.content, description);
  assert.ok(!meta.some((tag) => ["robots", "googlebot"].includes(tag.name) && /noindex/.test(tag.content)));
  assert.ok(!/noindex/.test(response.headers.get("x-robots-tag") ?? ""));
  const structured = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(structured.length, 1);
  const data = JSON.parse(structured[0][1]);
  assert.equal(data["@type"], "LocalBusiness");
  assert.equal(data.name, "Seçkin Sürücü Kursu");
  assert.equal(data.url, `${origin}/`);
  assert.equal(data.telephone, "+905453036768");
  assert.equal(data.address.addressLocality, "Aksaray");
  assert.deepEqual(data.sameAs, ["https://www.instagram.com/68seckinsurucukursu/", "https://www.tiktok.com/@sekin.src.kursu"]);
  for (const field of ["geo", "openingHours", "aggregateRating", "review", "priceRange", "taxID"]) assert.equal(data[field], undefined);
  assert.equal(data.address.postalCode, undefined);
  for (const link of links.filter((link) => ["icon", "apple-touch-icon"].includes(link.rel))) icons.add(link.href);
  for (const link of tags(html, "a")) {
    if (link.href?.startsWith("/") || link.href?.startsWith("#")) internalLinks.add(new URL(link.href, new URL(path, base)).href);
  }
  assert.match(html, /<a[^>]+href="tel:\+905453036768"/);
  console.log(`PASS ${path}: canonical, OG/Twitter, JSON-LD, H1, indexing and contact`);
}
assert.equal(titles.size, paths.length); assert.equal(descriptions.size, paths.length);
for (const link of internalLinks) {
  const url = new URL(link);
  const html = pages.get(url.pathname);
  assert.ok(html, `Existing internal route: ${url.pathname}`);
  if (url.hash) assert.ok(html.includes(`id="${url.hash.slice(1)}"`), link);
}
const sitemap = await fetch(new URL("/sitemap.xml", base));
assert.equal(sitemap.status, 200);
assert.match(sitemap.headers.get("content-type") ?? "", /xml/);
const xml = await sitemap.text();
assert.deepEqual([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url).sort(), paths.map((path) => new URL(path, origin).href).sort());
assert.ok(!xml.includes("<lastmod>"), "Do not fabricate modification dates");
const robots = await fetch(new URL("/robots.txt", base));
assert.equal(robots.status, 200);
const txt = await robots.text();
assert.match(txt, /User-Agent: \*/i); assert.match(txt, /Allow: \//);
assert.ok(txt.includes(`Sitemap: ${origin}/sitemap.xml`)); assert.ok(!txt.includes("Disallow:"));

assert.ok([...icons].some((url) => url.startsWith("/favicon.ico")));
assert.ok([...icons].some((url) => url.startsWith("/icon.png")));
assert.ok([...icons].some((url) => url.startsWith("/apple-icon.png")));
for (const href of icons) {
  const url = new URL(href, base);
  const response = await fetch(url);
  assert.equal(response.status, 200, href);
  assert.match(response.headers.get("content-type") ?? "", /image\//);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), readFileSync(new URL(`../src/app${url.pathname}`, import.meta.url)), href);
}
console.log("PASS sitemap, robots, all internal routes/anchors, unique metadata and exact branded icon responses");
