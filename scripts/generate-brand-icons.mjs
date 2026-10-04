import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Reuse the official logo's steering-wheel/road artwork; exclude the wordmark
// and slogan. This square crop retains the source background/alpha unchanged.
// sharp is already installed by Next.js; no new dependency is required.
const source = new URL("../public/images/brand/seckin-logo.png", import.meta.url);
const artwork = await sharp(fileURLToPath(source))
  .extract({ left: 38, top: 52, width: 160, height: 160 })
  .png()
  .toBuffer();

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => sharp(artwork).resize(size, size).png().toBuffer()));
// ICO supports PNG-encoded entries. Supply actual small sizes rather than a
// single large image that the browser has to downscale.
const directory = Buffer.alloc(6 + images.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(images.length, 4);
let offset = directory.length;
images.forEach((bytes, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(bytes.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += bytes.length;
});
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), Buffer.concat([directory, ...images]));
await sharp(artwork).resize(192, 192).png().toFile(fileURLToPath(new URL("../src/app/icon.png", import.meta.url)));
await sharp(artwork).resize(180, 180).png().toFile(fileURLToPath(new URL("../src/app/apple-icon.png", import.meta.url)));
console.log("Generated official-brand favicon (16/32/48), icon (192) and Apple icon (180).");
