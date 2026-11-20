import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const items = [
  ["u", "1597696926732-5c0d1a0e1c0a"],
  ["u", "1574634534894-0c0b0c0c0c0c"],
  ["u", "1595341888016-1a0e0e0e0e0e"],
  ["u", "1604176354204-8026b2460c0d"],
  ["u", "1593032465171-1c1c1c1c1c1c"],
  ["u", "1556906781-9a412961c28c"],
  ["u", "1567401893414-76b7b1e5a7a5"],
  ["u", "1441986300917-64674bd600d8"],
  ["u", "1495121605193-b116b5b9c5fe"],
  ["u", "1512436991641-08d2738a4a4e"],
  ["u", "1525507119028-ed4c629a60a3"],
  ["u", "1596755094514-6c0d1a0e1c0a"],
  ["u", "1620799140188-6c0d1a0e1c0a"],
  ["u", "1610701596007-6c0d1a0e1c0a"],
  ["u", "1578500494198-6c0d1a0e1c0a"],
  ["u", "1603252109303-6c0d1a0e1c0a"],
  ["u", "1483058712412-4245e9b90334"],
  ["u", "1513364776144-60967b0f800f"],
  ["u", "1456327102063-6c0d1a0e1c0a"],
  ["u", "1544816155-6c0d1a0e1c0a"],
  ["u", "1550684848-6c0d1a0e1c0a"],
  ["u", "1541701494587-6c0d1a0e1c0a"],
  ["u", "1522771739844-6c0d1a0e1c0a"],
  ["u", "1596462502278-6c0d1a0e1c0a"],
  ["u", "1617331721458-6c0d1a0e1c0a"],
  ["u", "1570976447640-6c0d1a0e1c0a"],
  ["u", "1507525428034-b723cf961d3e"],
  ["u", "1517836357463-6c0d1a0e1c0a"],
  ["u", "1571019613454-6c0d1a0e1c0a"],
  ["u", "1599058917212-6c0d1a0e1c0a"],
  ["p", "7679720"],
  ["p", "7671166"],
  ["p", "794064"],
  ["p", "985635"],
  ["p", "1536619"],
  ["p", "2681751"],
  ["p", "291762"],
  ["p", "2983464"],
  ["p", "3755706"],
  ["p", "5709665"],
  ["p", "6311475"],
  ["p", "4940756"],
  ["p", "6068960"],
  ["p", "3738088"],
  ["p", "4620843"],
  ["p", "6764040"],
  ["p", "7679454"],
  ["p", "5704849"],
];

await mkdir("tmp/previews", { recursive: true });
const cells = [];
const map = [];

for (let index = 0; index < items.length; index += 1) {
  const [source, id] = items[index];
  const label = String(index + 1).padStart(2, "0");
  const url =
    source === "u"
      ? `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=480&q=55`
      : `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=480`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) {
      console.log("FAIL", label, res.status, source, id);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const img = await sharp(buf).resize(280, 200, { fit: "cover", position: "attention" }).jpeg({ quality: 70 }).toBuffer();
    const caption = Buffer.from(
      `<svg width="280" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="32" fill="#F2ECE3"/><text x="8" y="22" font-size="16" font-family="Arial" fill="#352720">${label} ${source}</text></svg>`,
    );
    const cell = await sharp({
      create: { width: 280, height: 232, channels: 3, background: "#F2ECE3" },
    })
      .composite([
        { input: img, top: 0, left: 0 },
        { input: caption, top: 200, left: 0 },
      ])
      .jpeg()
      .toBuffer();
    cells.push(cell);
    map.push({ label, source, id });
    console.log("OK", label, source, id);
  } catch (error) {
    console.log("ERR", label, error instanceof Error ? error.message : error);
  }
}

const cols = 6;
const rows = Math.ceil(cells.length / cols);
await sharp({
  create: { width: cols * 280, height: rows * 232, channels: 3, background: "#C9B8A5" },
})
  .composite(
    cells.map((input, index) => ({
      input,
      left: (index % cols) * 280,
      top: Math.floor(index / cols) * 232,
    })),
  )
  .jpeg({ quality: 76 })
  .toFile("tmp/previews/sheet2.jpg");

await writeFile("tmp/previews/map2.json", JSON.stringify(map, null, 2));
console.log("SHEET", cells.length);
