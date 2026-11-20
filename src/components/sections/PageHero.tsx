import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className="border-b border-stone bg-cream text-espresso">
      <Container className="py-[clamp(3.5rem,8vw,6.5rem)]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-[16ch] font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium uppercase leading-[1.02] tracking-[-0.01em] text-espresso">
          {title}
        </h1>
        {children ? <div className="mt-6 max-w-[62ch] space-y-4 text-base leading-[1.7] text-espresso">{children}</div> : null}
      </Container>
    </section>
  );
}
