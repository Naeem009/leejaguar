import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

const assets = {
  full: {
    src: "/brand/logo.png",
    width: 6240,
    height: 1728,
    sizes: "(min-width: 768px) 192px, 140px",
    className: "h-9 w-auto md:h-12",
  },
  mark: {
    src: "/brand/logo-mark.png",
    width: 1200,
    height: 1269,
    sizes: "36px",
    className: "h-9 w-auto",
  },
} as const;

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const asset = assets[variant];

  return (
    <Link href="/" aria-label="Lee Jaguar — Home" className={`shrink-0 items-center ${className || "inline-flex"}`}>
      {/* TODO(brand): replace with the client vector file when it is supplied. */}
      <Image src={asset.src} alt="" width={asset.width} height={asset.height} sizes={asset.sizes} className={asset.className} />
    </Link>
  );
}
