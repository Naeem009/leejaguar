export const processStages = [
  {
    number: "01",
    slug: "trend-research",
    title: "Trend research & creative direction",
    description:
      "Seasonal research, colour direction, market insights, mood boards and collection concepts.",
    icon: "pencil",
    image: "process01",
  },
  {
    number: "02",
    slug: "design-development",
    title: "Design & collection development",
    description: "Garment design, silhouettes, artwork, prints and range development.",
    icon: "form",
    image: "process02",
  },
  {
    number: "03",
    slug: "fabrics-materials",
    title: "Fabrics & materials",
    description: "Fabric research, knitted and woven materials, yarn selection, trims and accessories.",
    icon: "layers",
    image: "process03",
  },
  {
    number: "04",
    slug: "technical-development",
    title: "Technical product development",
    description: "Tech packs, specifications, pattern development, measurements, construction and costing.",
    icon: "ruler",
    image: "process04",
  },
  {
    number: "05",
    slug: "sampling",
    title: "Sampling & approval",
    description: "Proto samples, fit samples, material approvals, revisions and pre-production samples.",
    icon: "scissors",
    image: "process05",
  },
  {
    number: "06",
    slug: "manufacturing",
    title: "Manufacturing & production",
    description: "Production planning, manufacturing coordination, quality management and delivery coordination.",
    icon: "check",
    image: "process06",
  },
] as const;

export type ProcessStage = (typeof processStages)[number];
export type StageIcon = ProcessStage["icon"];
