import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeCopy } from "@/content/copy";
import { images } from "@/lib/images";

const supports = [
  { image: images.heroMannequin, ratio: "aspect-[4/5]" },
  { image: images.heroFabrics, ratio: "aspect-[4/5]" },
  { image: images.heroSewing, ratio: "aspect-[3/2]" },
] as const;

export function Hero() {
  const copy = homeCopy.hero;

  return (
    <section id="hero" className="bg-cream text-espresso">
      <div className="grid min-h-[80vh] lg:min-h-[88vh] lg:grid-cols-12">
        <div className="flex items-center lg:col-span-5">
          <div className="w-full px-5 py-14 md:px-8 lg:py-20 lg:pr-8 xl:pl-[max(2rem,calc((100vw-1360px)/2+2rem))]">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h1 className="font-display text-[length:var(--text-h1)] font-medium uppercase leading-[0.92] tracking-[-0.01em] text-espresso">
              {copy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 font-display text-[clamp(1.25rem,2vw,1.6rem)] italic leading-snug text-espresso">
              {copy.tagline}
            </p>
            <p className="mt-6 max-w-[18em] font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium uppercase italic leading-[1.15] tracking-[-0.01em] text-sienna">
              {copy.supporting}
            </p>
            <div className="mt-6 max-w-[46ch] space-y-4 text-base leading-[1.7] text-espresso">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={copy.primary.href}>{copy.primary.label}</Button>
              <Button href={copy.secondary.href} variant="secondary">
                {copy.secondary.label}
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-2 p-2 sm:gap-3 sm:p-3 lg:h-full lg:grid-cols-[1.45fr_0.9fr] lg:grid-rows-3">
            <div className="relative aspect-[3/4] overflow-hidden lg:col-start-1 lg:row-span-3 lg:aspect-auto lg:min-h-[70vh]">
              <SiteImage image={images.heroMain} sizes="(min-width: 1024px) 42vw, 100vw" priority />
            </div>
            <div className="flex min-w-0 gap-2 overflow-x-auto sm:gap-3 lg:contents">
              {supports.map((item, index) => (
                <div
                  key={item.image.file}
                  className={`relative ${item.ratio} w-[42%] shrink-0 overflow-hidden sm:w-[31%] lg:aspect-auto lg:w-auto lg:shrink ${
                    index === 0 ? "lg:col-start-2 lg:row-start-1" : ""
                  } ${index === 1 ? "lg:col-start-2 lg:row-start-2" : ""} ${
                    index === 2 ? "lg:col-start-2 lg:row-start-3" : ""
                  }`}
                >
                  <SiteImage image={item.image} sizes="(min-width: 1024px) 18vw, 42vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
