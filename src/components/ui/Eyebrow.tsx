type EyebrowProps = {
  children: string;
  align?: "left" | "center";
  className?: string;
};

export function Eyebrow({ children, align = "left", className = "" }: EyebrowProps) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-espresso ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-sienna" />
      {children}
    </p>
  );
}
