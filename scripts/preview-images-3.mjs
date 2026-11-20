import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const pexels = [
  3738077, 3738078, 3738079, 3738080, 3738081, 3738082, 3738083, 3738084, 3738085, 3738086, 3738087,
  3738089, 3738091, 4620830, 4620831, 4620832, 4620833, 4620834, 4620835, 4620836, 4620837, 4620838,
  4620839, 4620840, 4620841, 4620844, 5709656, 5709658, 5709660, 5709661, 5709662, 5709667, 5709668,
  7679715, 7679718, 7679721, 7679722, 7679723, 7679724, 7679440, 7679445, 7679450, 4940748, 4940750,
  4940752, 4940754, 4940755, 6068950, 6068954, 6068958, 6068962, 4498151, 4498482, 4498606, 4753986,
  1552242, 863988, 3662667, 3933275, 1648377, 996329, 1926769, 1536618, 1375736, 4614217, 4614227,
  4792078, 4792082, 6311390, 6311395, 1082529, 1055691, 1126993, 7679456, 5704846, 4620622, 3755700,
  3755710, 3755720, 4271569, 4620866, 4620876, 4620886, 5709630, 6311580, 6311602, 7679402, 7679410,
];

const unsplash = [
  "1489987707025-afc232f7ea0f",
  "1618354691373-d851c5c3a990",
  "1583743814966-8936f5b7be1a",
  "1551232864-3f0890e580d9",
  "1545291730-faff8ca1d4b0",
  "1552374196-1ab2a1c593e8",
  "1524502397800-2eeaad7c3fe5",
  "1567016376408-0226e4d0c1ea",
  "1578932750294-f5075e85f44a",
  "1534528741775-53994a69daeb",
  "1529626455594-4ff0802cfb7e",
  "1488426862026-3ee34a7d66df",
];

const queue = [
  ...unsplash.map((id) => ({ source: "u", id })),
  ...pexels.map((id) => ({ source: "p", id: String(id) })),
];

await mkdir("tmp/previews", { recursive: true });
const cells = [];
const map = [];

for (const item of queue) {
  if (cells.length >= 36) break;
  const url =
    item.source === "u"
      ? `https://images.unsplash.com/photo-${item.id}?auto=format&fit=crop&w=400&q=50`
      : `https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?auto=compress&cs=tinysrgb&w=400`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) continue;
    const label = String(map.length + 1).padStart(2, "0");
    const buf = Buffer.from(await res.arrayBuffer());
    const img = await sharp(buf).resize(240, 170, { fit: "cover", position: "attention" }).jpeg({ quality: 68 }).toBuffer();
    const caption = Buffer.from(
      `<svg width="240" height="28" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="28" fill="#F2ECE3"/><text x="6" y="19" font-size="14" font-family="Arial" fill="#352720">${label} ${item.source}${item.source === "p" ? item.id : ""}</text></svg>`,
    );
    const cell = await sharp({
      create: { width: 240, height: 198, channels: 3, background: "#F2ECE3" },
    })
      .composite([
        { input: img, top: 0, left: 0 },
        { input: caption, top: 170, left: 0 },
      ])
      .jpeg()
      .toBuffer();
    cells.push(cell);
    map.push({ label, ...item });
    console.log("OK", label, item.source, item.id);
  } catch {
    // Skip a failed download and keep searching.
  }
}

const cols = 6;
const rows = Math.ceil(cells.length / cols) || 1;
await sharp({
  create: { width: cols * 240, height: rows * 198, channels: 3, background: "#C9B8A5" },
})
  .composite(cells.map((input, index) => ({ input, left: (index % cols) * 240, top: Math.floor(index / cols) * 198 })))
  .jpeg({ quality: 74 })
  .toFile("tmp/previews/sheet3.jpg");

await writeFile("tmp/previews/map3.json", JSON.stringify(map, null, 2));
console.log("COUNT", cells.length);
