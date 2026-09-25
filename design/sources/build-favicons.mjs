import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = fileURLToPath(new URL("../../", import.meta.url));
const app = path.join(root, "apps/web/app");
const logo = await readFile(path.join(root, "apps/web/public/assets/flap-company-logo.png"));

// Frame the original emblem, preserving its pixels and colors. The wordmark
// starts beyond this 198px viewport and is unnecessary at favicon sizes.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="52" fill="#100d20"/><svg x="20" y="36" width="216" height="184" viewBox="0 0 198 169" overflow="hidden"><image width="652" height="169" href="data:image/png;base64,${logo.toString("base64")}"/></svg></svg>`;
await writeFile(path.join(app, "icon.svg"), svg);
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile(path.join(app, "apple-icon.png"));

// ICO directory with lossless PNG entries for standard browser tab sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((bytes, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(bytes.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += bytes.length;
});
await writeFile(path.join(app, "favicon.ico"), Buffer.concat([header, ...images]));
console.log("Created icon.svg, favicon.ico (16/32/48px), and apple-icon.png (180px) from the approved logo.");
