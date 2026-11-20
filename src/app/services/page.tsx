import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { SiteImage } from "@/components/ui/SiteImage";
import { StageIcon } from "@/components/ui/StageIcon";
import { pageCopy } from "@/content/copy";
import { processStages } from "@/content/process";
import { images, type ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "A connected approach to developing fashion products, bringing creative thinking and technical execution together.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const copy = pageCopy.services;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title}>
        <p>{copy.lead}</p>
        <p className="border border-stone px-4 py-3">{copy.todo}</p>
      </PageHero>
      <div className="bg-cream text-espresso">
        {processStages.map((stage, index) => {
          const photo = images[stage.image as ImageKey];
          const reversed = index % 2 === 1;
          return (
            <article key={stage.slug} id={stage.slug} className="scroll-mt-24 border-b border-stone">
              <div className="mx-auto grid w-full max-w-wide items-center gap-8 px-5 py-[clamp(3rem,7vw,5.5rem)] md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className={`relative aspect-[4/5] overflow-hidden ${reversed ? "lg:order-2" : ""}`}>
                  <SiteImage image={photo} sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <StageIcon name={stage.icon} />
                    <p className="font-display text-[1.75rem] leading-none text-sienna">{stage.number}</p>
                  </div>
                  <h2 className="mt-4 font-display text-[length:var(--text-h3)] font-medium uppercase leading-tight text-espresso">
                    {stage.title}
                  </h2>
                  <p className="mt-4 max-w-[48ch] text-base leading-[1.7] text-espresso">{stage.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <FinalCta />
    </>
  );
}
