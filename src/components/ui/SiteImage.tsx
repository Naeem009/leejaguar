import Image from "next/image";
import type { ImageAsset } from "@/lib/images";

type SiteImageProps = {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function SiteImage({ image, sizes, priority = false, className = "" }: SiteImageProps) {
  if (image.pending) {
    return (
      <div className={`absolute inset-0 bg-stone ${className}`} role="img" aria-label={image.alt} />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={`object-cover ${className}`}
      style={{ objectPosition: image.position }}
    />
  );
}
