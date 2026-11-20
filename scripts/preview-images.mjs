import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const ids = [
  "1490481651871-ab68de25d43d",
  "1469334031218-e382a71b716b",
  "1515886657613-9f3515b0c78f",
  "1539109136881-3be0616acf4b",
  "1509631179647-0177331693ae",
  "1529139574466-a303027c1d8b",
  "1496747611176-843222e1e57c",
  "1524504388940-b1c1722653e1",
  "1485968579580-b6d095142e6e",
  "1539533018447-63fcce2678e3",
  "1544022613-e87ca75a784a",
  "1487222477894-8943e31ef7b2",
  "1503342217505-b0a15ec3261c",
  "1515372039744-b8f02a3ae446",
  "1566174053879-31528523f8ae",
  "1595777457583-95e059d581b8",
  "1492447273231-0f8fecec1e3a",
  "1488161628813-04466f872be2",
  "1542272604-787c3835535d",
  "1541099649105-f69ad21f3246",
  "1518310383802-640c2de311b2",
  "1571019614242-c5c5dee9f50b",
  "1518611012118-696072aa579a",
  "1556905055-8f358a7a47b2",
  "1523381210434-271e8be1f52b",
  "1445205170230-053b83016050",
  "1558171813-4c088753af8f",
  "1434389677669-e08b4cac3105",
  "1562157873-818bc0726f68",
  "1558769132-cb1aea458c5e",
  "1452860606245-08befc0ff44b",
  "1605289982774-9a6fef564df8",
  "1620799140408-edc6dcb6d633",
  "1528459801416-a9e53bbf4e17",
  "1612423284934-2850a4ea6b0f",
  "1576566588028-4147f3842f27",
  "1521572163474-6864f9cf17ab",
  "1475180098004-ca77a66827be",
  "1495385794356-15371f348c31",
  "1441984904996-e0b6ba687e04",
  "1519689680058-324335c77eba",
  "1515488042361-ee00e0ddd4e4",
  "1522771930-78848d9293e8",
  "1594938291221-94f18cbb5660",
  "1581044777550-4cfa60707c03",
  "1490481651871-ab68de25d43d",
];

const unique = [...new Set(ids)];
await mkdir("tmp/previews", { recursive: true });
const cells = [];

for (const id of unique) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=480&q=60`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) {
      console.log("FAIL", res.status, id);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const img = await sharp(buf).resize(300, 220, { fit: "cover" }).jpeg({ quality: 70 }).toBuffer();
    const label = Buffer.from(
      `<svg width="300" height="36" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="36" fill="#F2ECE3"/><text x="6" y="24" font-size="14" font-family="Arial" fill="#352720">${id.slice(0, 13)}</text></svg>`,
    );
    const cell = await sharp({
      create: { width: 300, height: 256, channels: 3, background: "#F2ECE3" },
    })
      .composite([
        { input: img, top: 0, left: 0 },
        { input: label, top: 220, left: 0 },
      ])
      .jpeg()
      .toBuffer();
    cells.push(cell);
    console.log("OK", id);
  } catch (error) {
    console.log("ERR", id, error instanceof Error ? error.message : error);
  }
}

const cols = 4;
const rows = Math.ceil(cells.length / cols);
const composites = cells.map((input, index) => ({
  input,
  left: (index % cols) * 300,
  top: Math.floor(index / cols) * 256,
}));

await sharp({
  create: { width: cols * 300, height: rows * 256, channels: 3, background: "#C9B8A5" },
})
  .composite(composites)
  .jpeg({ quality: 78 })
  .toFile("tmp/previews/sheet.jpg");

console.log("SHEET", cells.length);
