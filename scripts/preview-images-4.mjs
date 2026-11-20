import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const pexels = [
  1375736, 1536618, 3662667, 3933275, 1648377, 4498482, 4498606, 4753986, 1552242, 863988, 3755700,
  3755706, 3755710, 4271569, 6567739, 7671164, 4940763, 3933232, 3662840, 1148998, 1620760, 3933980,
  7679448, 5704845, 1007657, 1457812, 996329, 1926769, 1055691, 4273433, 4621921, 3735654, 6311476,
  7679724, 5709655, 4622444,
];

await mkdir("tmp/previews", { recursive: true });
const cells = [];
const map = [];

for (const id of pexels) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=420`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    console.log("FAIL", id, res.status);
    continue;
  }
  const label = String(id);
  const buf = Buffer.from(await res.arrayBuffer());
  const img = await sharp(buf).resize(220, 160, { fit: "cover", position: "attention" }).jpeg({ quality: 68 }).toBuffer();
  const caption = Buffer.from(
    `<svg width="220" height="26" xmlns="http://www.w3.org/2000/svg"><rect width="220" height="26" fill="#F2ECE3"/><text x="6" y="18" font-size="13" font-family="Arial" fill="#352720">${label}</text></svg>`,
  );
  cells.push(
    await sharp({ create: { width: 220, height: 186, channels: 3, background: "#F2ECE3" } })
      .composite([
        { input: img, top: 0, left: 0 },
        { input: caption, top: 160, left: 0 },
      ])
      .jpeg()
      .toBuffer(),
  );
  map.push(id);
  console.log("OK", id);
}

const cols = 6;
const rows = Math.ceil(cells.length / cols) || 1;
await sharp({
  create: { width: cols * 220, height: rows * 186, channels: 3, background: "#C9B8A5" },
})
  .composite(cells.map((input, index) => ({ input, left: (index % cols) * 220, top: Math.floor(index / cols) * 186 })))
  .jpeg({ quality: 74 })
  .toFile("tmp/previews/sheet4.jpg");

await writeFile("tmp/previews/map4.json", JSON.stringify(map));
console.log("COUNT", cells.length);
