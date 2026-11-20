import { copyFile, mkdir } from "node:fs/promises";

await mkdir("reference", { recursive: true });
await copyFile("logo-reference.png", "reference/logo-reference.png");
await copyFile("design-reference.jpeg", "reference/design-reference.jpeg");

console.log("Reference copies updated. public/brand is client-supplied and was left unchanged.");
