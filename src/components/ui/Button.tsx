import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  compact?: boolean;
  tone?: "espresso" | "cream";
};

type LinkProps = CommonProps & {
  href: string;
  onClick?: () => void;
};

type ActionProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

const variants: Record<Variant, string> = {
  primary:
    "border border-espresso bg-stone shadow-[inset_0_-2px_0_0_#A9573D] hover:border-sienna hover:bg-cream hover:shadow-none",
  secondary: "border border-espresso bg-transparent hover:bg-stone",
  text: "min-h-11 border-0 bg-transparent px-0 underline decoration-sienna decoration-1 underline-offset-[6px] hover:decoration-2",
};

function classes(variant: Variant, className: string, compact: boolean, tone: "espresso" | "cream") {
  const width = variant === "text" || compact ? "w-auto" : "w-full sm:w-auto";
  const padding = compact ? "px-4 xl:px-7" : variant === "text" ? "px-0" : "px-5 sm:px-7";
  const onDark = tone === "cream" && variant !== "primary";
  const variantClass = onDark
    ? "border border-cream bg-transparent text-cream hover:bg-cream/15"
    : variants[variant];
  return [
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] py-3 text-center font-sans text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200",
    onDark ? "text-cream" : "text-espresso",
    width,
    padding,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function Label({ children, cream }: { children: ReactNode; cream: boolean }) {
  return (
    <>
      <span>{children}</span>
      <ArrowRight
        aria-hidden
        className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 ${
          cream ? "text-cream group-hover:text-sienna group-focus-visible:text-sienna" : "text-espresso group-hover:text-sienna group-focus-visible:text-sienna"
        }`}
        strokeWidth={1.75}
      />
    </>
  );
}

export function Button(props: LinkProps | ActionProps) {
  const variant = props.variant ?? "primary";
  const tone = props.tone ?? "espresso";
  const className = classes(variant, props.className ?? "", Boolean(props.compact), tone);
  const cream = tone === "cream" && variant !== "primary";

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className} onClick={props.onClick}>
        <Label cream={cream}>{props.children}</Label>
      </Link>
    );
  }

  const action = props as ActionProps;
  return (
    <button type={action.type ?? "button"} className={className} disabled={action.disabled} onClick={action.onClick}>
      <Label cream={cream}>{action.children}</Label>
    </button>
  );
}
