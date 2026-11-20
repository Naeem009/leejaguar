import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeCopy } from "@/content/copy";
import { categories } from "@/content/categories";
import { images, type ImageKey } from "@/lib/images";

export function Categories() {
  const copy = homeCopy.categories;

  return (
    <section id="categories" className="bg-cream py-[clamp(4rem,9vw,8rem)] text-espresso">
      <Container wide>
        <SectionHeading title={copy.title} lead={copy.lead} />
        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const photo = images[category.image as ImageKey];
            return (
              <li key={category.slug}>
                <Link href={`/product-categories#${category.slug}`} className="group block text-espresso">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <SiteImage
                      image={photo}
                      sizes="(min-width: 1024px) 30vw, (min-width: 480px) 45vw, 100vw"
                      className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 border-t border-stone pt-4">
                    <p className="font-display text-[1.75rem] leading-none text-sienna">{category.number}</p>
                    <h3 className="relative mt-3 inline-block font-sans text-base font-semibold uppercase tracking-[0.08em] text-espresso">
                      {category.name}
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-px w-0 bg-sienna transition-all duration-200 group-hover:w-full"
                      />
                    </h3>
                    <p className="mt-3 text-base leading-[1.7] text-espresso">{category.description}</p>
                    {photo.note ? <p className="mt-3 text-base text-espresso">{photo.note}</p> : null}
                    <ArrowRight
                      aria-hidden
                      className="mt-3 h-4 w-4 text-espresso opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                      strokeWidth={1.75}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-12">
          <Button href="/product-categories">{copy.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
