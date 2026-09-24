import fs from 'node:fs/promises';
import sharp from 'sharp';

const text = await fs.readFile('apps/web/components/office-silhouettes.tsx', 'utf8');
const entries = [...text.matchAll(/slug: "([^"]+)"[\s\S]*?path: "([^"]+)"/g)];
const regions = {cedric:[415,290,155,170],irene:[240,370,165,190],jason:[625,350,155,180],toko:[825,305,180,225],shinny:[975,280,165,270],duan:[1090,425,190,190],carol:[455,465,220,215],madaks:[825,480,190,225]};
const original = await sharp('design/sources/office-sunburst-generated-v04.png').resize(1600,905).png().toBuffer();
for (const [,name,d] of entries) {
  const [x,y,w,h] = regions[name];
  let grid = '';
  for(let a=x;a<x+w;a+=20) grid += `<path d="M${a} ${y}v${h}" stroke="white" stroke-opacity=".25"/><text x="${a}" y="${y+10}" fill="white" font-size="8">${a}</text>`;
  for(let b=y;b<y+h;b+=20) grid += `<path d="M${x} ${b}h${w}" stroke="white" stroke-opacity=".25"/><text x="${x}" y="${b}" fill="white" font-size="8">${b}</text>`;
  const overlay=Buffer.from(`<svg width="1600" height="905">${grid}<path d="${d}" fill="none" stroke="#ff0066" stroke-width="1"/></svg>`);
  const annotated=await sharp(original).composite([{input:overlay}]).png().toBuffer();
  await sharp(annotated).extract({left:x,top:y,width:w,height:h}).resize(w*3,h*3).png().toFile(`design/sources/silhouette-audit-${name}.png`);
}
