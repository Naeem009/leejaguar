import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("src");
const extensions = new Set([".ts", ".tsx", ".css", ".mdx"]);

const rules = [
  { name: "#fff", test: (line) => /#fff\b/i.test(line) },
  { name: "#ffffff", test: (line) => /#ffffff\b/i.test(line) },
  { name: "rgb white", test: (line) => /rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)/i.test(line) },
  { name: "rgba white", test: (line) => /rgba\(\s*255\s*,\s*255\s*,\s*255/i.test(line) },
  { name: "white utility", test: (line) => /\b(?:text|bg|border|fill|stroke|ring|outline|from|to|via|decoration|caret|accent|divide|placeholder)-white\b/.test(line) },
  { name: "white colour keyword", test: (line) => /(?<![\w-])white(?![\w-])/i.test(line) },
  { name: "dark colour scheme", test: (line) => /prefers-color-scheme:\s*dark/i.test(line) },
  { name: "uniform", test: (line) => /uniform/i.test(line) },
  { name: "workwear", test: (line) => /workwear/i.test(line) },
  { name: "corporate & institutional", test: (line) => /corporate\s*&\s*institutional/i.test(line) },
  { name: "merchandise", test: (line) => /merchandise/i.test(line) },
  { name: "institutional", test: (line) => /institutional/i.test(line) },
];

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await filesIn(full)));
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

const violations = [];
const files = await filesIn(root);

for (const file of files) {
  const source = await readFile(file, "utf8");
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const rule of rules) {
      if (rule.test(line)) {
        violations.push(`${path.relative(process.cwd(), file)}:${index + 1} [${rule.name}] ${line.trim()}`);
      }
    }
  });
}

if (violations.length > 0) {
  console.error("Colour and content check failed:\n");
  for (const violation of violations) console.error(violation);
  process.exit(1);
}

console.log(`Colour and content check passed (${files.length} files).`);
