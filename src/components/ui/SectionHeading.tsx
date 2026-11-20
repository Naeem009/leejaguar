import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const Tag = as;
  const aligned = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`${aligned} ${className}`}>
      {eyebrow ? <Eyebrow align={align}>{eyebrow}</Eyebrow> : null}
      <Tag className="font-display text-[length:var(--text-h2)] font-medium uppercase leading-[1.08] tracking-[-0.01em] text-espresso text-balance">
        {title}
      </Tag>
      {lead ? (
        <p
          className={`mt-5 max-w-[60ch] text-[length:var(--text-body)] leading-[1.7] text-espresso ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
