import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeCopy } from "@/content/copy";
import { images } from "@/lib/images";

export function FinalCta() {
  const copy = homeCopy.final;

  return (
    <section id="start" className="border-y border-stone bg-cream text-espresso">
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <SiteImage image={images.ctaBand} sizes="100vw" />
      </div>
      <Container className="py-[clamp(3.25rem,6vw,5.5rem)]">
        <h2 className="max-w-[14ch] font-display text-[length:var(--text-h2)] font-medium uppercase leading-[1.05] tracking-[-0.01em] text-espresso">
          {copy.title}
        </h2>
        <p className="mt-5 max-w-[52ch] text-base leading-[1.7] text-espresso">{copy.body}</p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="/contact">{copy.primary}</Button>
          <Button href="/contact" variant="text">
            {copy.secondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
