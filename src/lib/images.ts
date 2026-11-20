import manifest from "@/content/image-manifest.json";

export type ImageAsset = {
  key: string;
  file: string;
  src: string;
  source: string;
  author: string;
  url: string;
  license: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  position: string;
  pending: boolean;
  note: string;
};

type ManifestItem = Omit<ImageAsset, "src">;

const items = manifest as ManifestItem[];

function asset(key: string): ImageAsset {
  const item = items.find((entry) => entry.key === key);
  if (!item) {
    throw new Error(`Missing image manifest entry: ${key}`);
  }
  return { ...item, src: `/images/${item.file}` };
}

export const images = {
  heroMain: asset("heroMain"),
  heroMannequin: asset("heroMannequin"),
  heroFabrics: asset("heroFabrics"),
  heroSewing: asset("heroSewing"),
  introStudio: asset("introStudio"),
  process01: asset("process01"),
  process02: asset("process02"),
  process03: asset("process03"),
  process04: asset("process04"),
  process05: asset("process05"),
  process06: asset("process06"),
  knitwear: asset("knitwear"),
  activewear: asset("activewear"),
  loungewear: asset("loungewear"),
  outerwear: asset("outerwear"),
  denim: asset("denim"),
  dresses: asset("dresses"),
  swimwear: asset("swimwear"),
  intimates: asset("intimates"),
  kidswear: asset("kidswear"),
  whyFabric: asset("whyFabric"),
  whyStitch: asset("whyStitch"),
  whyRack: asset("whyRack"),
  whyNotes: asset("whyNotes"),
  aboutMain: asset("aboutMain"),
  ctaBand: asset("ctaBand"),
} as const;

export type ImageKey = keyof typeof images;
