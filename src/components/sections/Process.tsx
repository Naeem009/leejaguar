import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { StageIcon } from "@/components/ui/StageIcon";
import { homeCopy } from "@/content/copy";
import { processStages } from "@/content/process";
import { images, type ImageKey } from "@/lib/images";

export function Process() {
  const copy = homeCopy.process;

  return (
    <section id="process" className="bg-cream py-[clamp(3.25rem,6vw,5.5rem)] text-espresso">
      <Container wide>
        <SectionHeading title={copy.title} lead={copy.lead} />
        <ol className="relative mt-14 flex flex-col gap-12 md:hidden">
          <span aria-hidden className="absolute bottom-4 left-[4px] top-4 w-px bg-stone" />
          {processStages.map((stage) => {
            const photo = images[stage.image as ImageKey];
            return (
              <li key={stage.number} className="relative pl-8">
                <span aria-hidden className="absolute left-0 top-3 h-2.5 w-2.5 rounded-full bg-sienna" />
                <div className="relative mb-4 aspect-[4/5] overflow-hidden">
                  <SiteImage image={photo} sizes="100vw" />
                </div>
                <div className="flex items-center gap-3">
                  <StageIcon name={stage.icon} />
                  <p className="font-display text-[1.75rem] leading-none text-sienna">{stage.number}</p>
                </div>
                <h3 className="mt-3 font-sans text-base font-semibold uppercase tracking-[0.08em] text-espresso">
                  {stage.title}
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-espresso">{stage.description}</p>
              </li>
            );
          })}
        </ol>
        <ol className="mt-14 hidden overflow-x-clip md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-3 xl:grid-cols-6">
          {processStages.map((stage) => {
            const photo = images[stage.image as ImageKey];
            return (
              <li key={stage.number} className="flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SiteImage image={photo} sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 30vw, 45vw" />
                </div>
                <div className="relative mt-5 flex h-6 items-center justify-center">
                  <span aria-hidden className="absolute top-1/2 right-[-1rem] left-[-1rem] h-px bg-stone" />
                  <span aria-hidden className="relative z-[1] h-2.5 w-2.5 rounded-full bg-sienna" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <StageIcon name={stage.icon} />
                  <p className="font-display text-[1.75rem] leading-none text-sienna">{stage.number}</p>
                </div>
                <h3 className="mt-3 font-sans text-base font-semibold uppercase tracking-[0.08em] text-espresso">
                  {stage.title}
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-espresso">{stage.description}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-12">
          <Button href="/services">{copy.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
