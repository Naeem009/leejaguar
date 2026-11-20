import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const shots = [
  ["heroMain", "hero/hero-main.webp", "Pexels", "6567739", "p", 2000, "Model wearing a tailored camel coat", "center 18%", ""],
  ["heroMannequin", "hero/hero-mannequin.webp", "Pexels", "3738077", "p", 1600, "Hands marking a pattern on a fashion studio table", "center", ""],
  ["heroFabrics", "hero/hero-fabrics.webp", "Unsplash", "1558769132-cb1aea458c5e", "u", 1600, "Hanging textile swatches in warm neutral tones", "center", ""],
  ["heroSewing", "hero/hero-sewing.webp", "Pexels", "3738086", "p", 1800, "Hands guiding fabric through a sewing machine during sampling", "center", ""],
  ["introStudio", "intro/intro-studio.webp", "Pexels", "3738081", "p", 1600, "Fabric and tools arranged in a fashion studio", "center", ""],
  ["process01", "process/01-trend.webp", "Pexels", "5709655", "p", 1600, "Garment sketches and textile swatches pinned for creative direction", "center", ""],
  ["process02", "process/02-design.webp", "Pexels", "3738079", "p", 1600, "Scissors cutting cloth during garment development", "center", ""],
  ["process03", "process/03-fabrics.webp", "Pexels", "3738080", "p", 1600, "A length of cloth held up for material review", "center", ""],
  ["process04", "process/04-tech.webp", "Pexels", "3738082", "p", 1600, "A ruler measuring pattern markings on cloth", "center", ""],
  ["process05", "process/05-sampling.webp", "Pexels", "3738089", "p", 1600, "Hand finishing a cloth sample", "center", ""],
  ["process06", "process/06-production.webp", "Unsplash", "1490481651871-ab68de25d43d", "u", 1800, "Finished garments hanging on a rail for review", "center", ""],
  ["knitwear", "categories/knitwear.webp", "Pexels", "794064", "p", 1600, "Model in a pale pink knit sweater", "center 15%", ""],
  ["activewear", "categories/activewear.webp", "Pexels", "4498482", "p", 1600, "Model in training apparel during a studio session", "center", ""],
  ["loungewear", "categories/loungewear.webp", "Unsplash", "1515886657613-9f3515b0c78f", "u", 1600, "Model in a coordinated yellow loungewear set", "center", ""],
  ["outerwear", "categories/outerwear.webp", "Pexels", "6764040", "p", 1600, "Model wearing a contemporary padded jacket", "center", ""],
  ["denim", "categories/denim-woven.webp", "Pexels", "1536619", "p", 1600, "Model in a denim jacket", "center", ""],
  ["dresses", "categories/dresses.webp", "Pexels", "985635", "p", 1600, "Model in a contemporary green dress", "center", ""],
  ["swimwear", "categories/swimwear.webp", "Unsplash", "1496747611176-843222e1e57c", "u", 1600, "Model in a floral dress by the sea, styled as resortwear", "center", ""],
  ["whyFabric", "why/fabric.webp", "Unsplash", "1434389677669-e08b4cac3105", "u", 1600, "Close view of a cream knit texture", "center", ""],
  ["whyStitch", "why/stitch.webp", "Pexels", "4621921", "p", 1600, "Hands stitching cloth at close range", "center", ""],
  ["whyRack", "why/rack.webp", "Unsplash", "1445205170230-053b83016050", "u", 1800, "Garments hanging on a studio rail", "center", ""],
  ["whyNotes", "why/notes.webp", "Unsplash", "1452860606245-08befc0ff44b", "u", 1800, "Scissors, tape and tools laid out on a development desk", "center", ""],
  ["aboutMain", "about/about-main.webp", "Pexels", "3738078", "p", 1800, "A fashion studio table set for garment development", "center", ""],
  ["ctaBand", "cta/cta-band.webp", "Unsplash", "1523381210434-271e8be1f52b", "u", 2200, "Soft shirts hanging in a row", "center", ""],
];

const pending = [
  {
    key: "intimates",
    file: "categories/intimates.webp",
    alt: "TODO(image): tasteful studio image of intimates and shapewear",
    note: "TODO(image): A tasteful flat lay for intimates and shapewear is still to be supplied.",
  },
  {
    key: "kidswear",
    file: "categories/kidswear.webp",
    alt: "TODO(image): flat lay of a baby romper and bodysuit",
    note: "TODO(image): A flat lay of a baby romper and bodysuit is still to be supplied.",
  },
];

async function encode(buffer, maxWidth) {
  let quality = 78;
  let result = buffer;
  let meta = await sharp(buffer).metadata();
  while (quality >= 54) {
    result = await sharp(buffer)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality });
    result = await result.toBuffer();
    meta = await sharp(result).metadata();
    if (result.length <= 250 * 1024) break;
    quality -= 6;
  }
  const blur = await sharp(result).resize(16, 12, { fit: "cover" }).webp({ quality: 40 }).toBuffer();
  return {
    buffer: result,
    width: meta.width ?? maxWidth,
    height: meta.height ?? maxWidth,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    bytes: result.length,
  };
}

const manifest = [];

for (const shot of shots) {
  const [key, file, source, id, kind, maxWidth, alt, position] = shot;
  const url =
    kind === "p"
      ? `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${maxWidth}`
      : `https://images.unsplash.com/photo-${id}?auto=format&fit=max&w=${maxWidth}&q=82`;
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) {
    throw new Error(`Download failed ${response.status} ${key}`);
  }
  const encoded = await encode(Buffer.from(await response.arrayBuffer()), maxWidth);
  const destination = path.join("public/images", file);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, encoded.buffer);
  const pageUrl = kind === "p" ? `https://www.pexels.com/photo/${id}/` : `https://images.unsplash.com/photo-${id}`;
  manifest.push({
    key,
    file,
    source,
    author: `${source} contributor`,
    url: pageUrl,
    license: `${source} License`,
    alt,
    width: encoded.width,
    height: encoded.height,
    blurDataURL: encoded.blurDataURL,
    position,
    pending: false,
    note: "",
  });
  console.log(key, encoded.width, encoded.height, Math.round(encoded.bytes / 1024) + "kb");
}

const stone = await sharp({
  create: { width: 16, height: 12, channels: 3, background: "#C9B8A5" },
})
  .webp({ quality: 40 })
  .toBuffer();
const blurDataURL = `data:image/webp;base64,${stone.toString("base64")}`;

for (const item of pending) {
  manifest.push({
    key: item.key,
    file: item.file,
    source: "",
    author: "",
    url: "",
    license: "",
    alt: item.alt,
    width: 1600,
    height: 2000,
    blurDataURL,
    position: "center",
    pending: true,
    note: item.note,
  });
}

await mkdir("src/content", { recursive: true });
await writeFile("src/content/image-manifest.json", JSON.stringify(manifest, null, 2));
console.log("manifest", manifest.length);
