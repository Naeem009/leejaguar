import sharp from "sharp";
import { copyFile, mkdir } from "node:fs/promises";

await mkdir("reference", { recursive: true });
await mkdir("public/brand", { recursive: true });
await copyFile("logo-reference.png", "reference/logo-reference.png");
await copyFile("design-reference.jpeg", "reference/design-reference.jpeg");

const source = sharp("reference/logo-reference.png").ensureAlpha();
const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
const pixels = Buffer.from(data);

for (let index = 0; index < pixels.length; index += 4) {
  const red = pixels[index];
  const green = pixels[index + 1];
  const blue = pixels[index + 2];
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const saturation = max === 0 ? 0 : (max - min) / max;
  const luminance = (red + green + blue) / 3;
  if (luminance > 206 && saturation < 0.22) {
    const fade = Math.min(1, (luminance - 206) / 32);
    pixels[index + 3] = Math.round(pixels[index + 3] * (1 - fade));
  }
}

const trimmed = await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 12 })
  .png()
  .toBuffer();

await sharp(trimmed).png().toFile("public/brand/logo.png");
const meta = await sharp("public/brand/logo.png").metadata();
const markWidth = Math.round((meta.width ?? 400) * 0.22);
const mark = await sharp("public/brand/logo.png")
  .extract({ left: 0, top: 0, width: markWidth, height: meta.height ?? 100 })
  .trim()
  .png()
  .toBuffer();
await sharp(mark).png().toFile("public/brand/logo-mark.png");
const iconMark = await sharp(mark)
  .resize(420, 420, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
await sharp({
  create: { width: 512, height: 512, channels: 4, background: "#F2ECE3" },
})
  .composite([{ input: iconMark, gravity: "centre" }])
  .png()
  .toFile("src/app/icon.png");
const markMeta = await sharp("public/brand/logo-mark.png").metadata();
console.log("logo", meta.width, meta.height, "mark", markMeta.width, markMeta.height);
