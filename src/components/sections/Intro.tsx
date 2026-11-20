import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeCopy } from "@/content/copy";
import { images } from "@/lib/images";

export function Intro() {
  const copy = homeCopy.intro;

  return (
    <section id="introduction" className="bg-cream py-[clamp(3.25rem,6vw,5.5rem)] text-espresso">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
            <SiteImage image={images.introStudio} sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-7">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_1px_minmax(0,1.1fr)] lg:gap-8">
              <h2 className="font-display text-[length:var(--text-h2)] font-medium uppercase leading-[1.05] tracking-[-0.01em] text-espresso">
                {copy.title}
              </h2>
              <span aria-hidden className="hidden bg-stone lg:block" />
              <div className="space-y-4 text-base leading-[1.7] text-espresso">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <p className="mt-10 max-w-[16em] font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-medium uppercase leading-[1.12] tracking-[-0.01em] text-sienna">
              {copy.highlight}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
