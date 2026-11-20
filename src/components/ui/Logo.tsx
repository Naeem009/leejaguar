import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const mark = variant === "mark";

  return (
    <Link href="/" aria-label="Lee Jaguar — Home" className={`inline-flex shrink-0 items-center ${className}`}>
      {/* TODO(brand): replace with the client vector file when it is supplied. */}
      <Image
        src={mark ? "/brand/logo-mark.png" : "/brand/logo.png"}
        alt=""
        width={mark ? 158 : 718}
        height={181}
        className={mark ? "h-9 w-auto" : "h-9 w-auto md:h-12"}
      />
    </Link>
  );
}
