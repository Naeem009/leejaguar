import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  compact?: boolean;
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

function classes(variant: Variant, className: string, compact: boolean) {
  const width = variant === "text" || compact ? "w-auto" : "w-full sm:w-auto";
  const padding = compact ? "px-4 xl:px-7" : variant === "text" ? "px-0" : "px-5 sm:px-7";
  return [
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] py-3 text-center font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-espresso transition-colors duration-200",
    width,
    padding,
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function Label({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <ArrowRight
        aria-hidden
        className="h-4 w-4 shrink-0 text-espresso transition-transform duration-200 group-hover:translate-x-1 group-hover:text-sienna group-focus-visible:translate-x-1 group-focus-visible:text-sienna"
        strokeWidth={1.75}
      />
    </>
  );
}

export function Button(props: LinkProps | ActionProps) {
  const variant = props.variant ?? "primary";
  const className = classes(variant, props.className ?? "", Boolean(props.compact));

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className} onClick={props.onClick}>
        <Label>{props.children}</Label>
      </Link>
    );
  }

  const action = props as ActionProps;
  return (
    <button type={action.type ?? "button"} className={className} disabled={action.disabled} onClick={action.onClick}>
      <Label>{action.children}</Label>
    </button>
  );
}
