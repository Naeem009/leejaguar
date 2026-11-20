type EyebrowProps = {
  children: string;
  align?: "left" | "center";
  tone?: "espresso" | "cream";
  className?: string;
};

export function Eyebrow({ children, align = "left", tone = "espresso", className = "" }: EyebrowProps) {
  const color = tone === "cream" ? "text-cream" : "text-espresso";

  return (
    <p
      className={`mb-4 flex items-center gap-3 font-sans text-[12px] font-medium uppercase tracking-[0.18em] ${color} ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-sienna" />
      {children}
    </p>
  );
}
