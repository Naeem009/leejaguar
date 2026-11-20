export const company = {
  name: "Lee Jaguar",
  legalName: "Lee Jaguar",
  descriptor: "Textiles & Apparel",
  statement: "Fashion development and production, from the first idea to the finished collection.",
  tagline: "Ideas into products. Creativity into production.",
  locationLine: "Based in the UAE",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Fashion & Retail", href: "/fashion-retail" },
  { label: "Our Services", href: "/services" },
  { label: "Product Categories", href: "/product-categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const cta = {
  label: "Start a project",
  href: "/contact",
} as const;

export const audiences = [
  "Established fashion brands",
  "Emerging labels",
  "Fashion retailers / retail chains",
  "Online fashion businesses",
  "Private-label brands",
  "Distributors and brand owners",
] as const;

function present(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : "";
}

const officeAddress = "401-05 GAL BUSINESS CENTER GALADARI BUILDING 16 DUBAI PRODUCTION CITY, DUBAI";

export const contactDetails = {
  email: present(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  phone: present(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  address: present(process.env.NEXT_PUBLIC_CONTACT_ADDRESS) || officeAddress,
  linkedin: present(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
  instagram: present(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
};

export function siteUrl() {
  return (present(process.env.NEXT_PUBLIC_SITE_URL) || "https://example.com").replace(/\/$/, "");
}
