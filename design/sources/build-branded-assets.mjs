import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

// Self-contained SVG compositions preserve the approved artwork and exact logo.
const root = fileURLToPath(new URL('../../', import.meta.url));
const assets = path.join(root, 'apps/web/public/assets');
const dataUri = async (name, type) => `data:${type};base64,${(await readFile(path.join(assets, name))).toString('base64')}`;
const logo = await dataUri('flap-company-logo.png', 'image/png');
const plaque = (x, y, width, height, rotation = 0) => `<g transform="rotate(${rotation} ${x + width / 2} ${y + height / 2})"><rect x="${x}" y="${y + 3}" width="${width}" height="${height}" rx="5" fill="#100b22" opacity=".4"/><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="5" fill="#171027" stroke="#a18bba" stroke-width="1.5"/><image href="${logo}" x="${x + 10}" y="${y + (height - (width - 20) * 169 / 652) / 2}" width="${width - 20}" height="${(width - 20) * 169 / 652}"/></g>`;
const outputs = [
  { source: 'projects-folder-v01.webp', output: 'projects-folder-branded-v02.svg', width: 320, height: 320, mark: plaque(70, 148, 172, 65, 10) },
  { source: 'company-journal-v01.webp', output: 'company-journal-branded-v02.svg', width: 320, height: 320, mark: plaque(87, 120, 158, 68, -12) },
  { source: 'office-sunburst-adapted-v02.webp', output: 'office-sunburst-branded-v03.svg', width: 2688, height: 1520, mark: plaque(1390, 299, 263, 145, 1.8) },
];
for (const item of outputs) {
  const raster = sharp(path.join(assets, item.source));
  const opaque = item.source.startsWith('office-');
  const bytes = await (opaque ? raster.jpeg({ quality: 98, chromaSubsampling: '4:4:4' }) : raster.png()).toBuffer();
  const source = `data:image/${opaque ? 'jpeg' : 'png'};base64,${bytes.toString('base64')}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${item.width}" height="${item.height}" viewBox="0 0 ${item.width} ${item.height}"><image href="${source}" width="${item.width}" height="${item.height}"/>${item.mark}</svg>`;
  await writeFile(path.join(assets, item.output), svg);
  console.log(item.output);
}
