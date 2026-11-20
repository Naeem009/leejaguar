import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageCopy } from "@/content/copy";

export const metadata: Metadata = {
  title: "Page not available",
  description: pageCopy.notFound.body,
};

export default function NotFound() {
  const copy = pageCopy.notFound;
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-content flex-col justify-center px-5 py-24 text-espresso md:px-8">
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h1 className="font-display text-[length:var(--text-h2)] font-medium uppercase leading-[1.05] text-espresso">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-[46ch] text-base text-espresso">{copy.body}</p>
      <div className="mt-8">
        <Button href="/">{copy.cta}</Button>
      </div>
    </div>
  );
}
