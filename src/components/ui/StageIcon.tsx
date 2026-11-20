import { ClipboardCheck, Layers, Pencil, Ruler, Scissors } from "lucide-react";
import type { SVGProps } from "react";
import type { StageIcon as StageIconName } from "@/content/process";

type IconProps = SVGProps<SVGSVGElement>;

function DressFormIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <circle cx="12" cy="4.2" r="1.7" />
      <path d="M8.5 8.2h7l1.4 3.4-2.4.8V20H9.5v-7.6l-2.4-.8 1.4-3.4z" />
      <path d="M8 20.5h8" />
    </svg>
  );
}

const icons = {
  pencil: Pencil,
  form: DressFormIcon,
  layers: Layers,
  ruler: Ruler,
  scissors: Scissors,
  check: ClipboardCheck,
} as const;

export function StageIcon({ name }: { name: StageIconName }) {
  const Icon = icons[name];
  return <Icon aria-hidden className="h-6 w-6 shrink-0 text-espresso" strokeWidth={1.5} />;
}
