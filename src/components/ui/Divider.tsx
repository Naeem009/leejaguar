type DividerProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function Divider({ className = "", orientation = "horizontal" }: DividerProps) {
  if (orientation === "vertical") {
    return <span aria-hidden className={`block w-px self-stretch bg-stone ${className}`} />;
  }

  return <hr className={`m-0 border-0 border-t border-stone ${className}`} />;
}
