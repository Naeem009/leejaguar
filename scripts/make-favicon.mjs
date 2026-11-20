import sharp from "sharp";

const size = 512;
const padding = 48;
const mark = await sharp("public/brand/logo-mark.png")
  .trim()
  .resize(size - padding * 2, size - padding * 2, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp({
  create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: mark, gravity: "centre" }])
  .png()
  .toFile("public/brand/favicon.png");

const { data, info } = await sharp("public/brand/favicon.png").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const corner = data[3];
const mid = (Math.floor(info.height / 2) * info.width + Math.floor(info.width / 2)) * 4;
console.log("favicon", info.width, info.height, "cornerAlpha", corner, "centre", [...data.subarray(mid, mid + 4)]);
