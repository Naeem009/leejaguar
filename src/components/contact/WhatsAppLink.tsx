import type { SVGProps } from "react";
import { contactDetails } from "@/content/site";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <path d="M12 20.5a8.5 8.5 0 0 1-4.1-1l-4.4 1.2 1.2-4.2A8.5 8.5 0 1 1 12 20.5Z" />
      <path d="M9.2 10.2c.2 1.6 1.5 3 3.1 3.4.4.1.8 0 1.1-.3l.6-.7c.2-.2.5-.3.8-.2l1.5.5c.3.1.5.4.4.7-.2 1.1-1.2 1.9-2.3 1.8-2.4-.2-4.6-2.5-5.1-4.9-.2-1 .4-2 1.4-2.3.3-.1.6 0 .8.2l.6.8c.2.3.1.6-.1.8l-.8.2Z" />
    </svg>
  );
}

type WhatsAppLinkProps = {
  className?: string;
  children?: string;
};

export function WhatsAppButton() {
  if (!contactDetails.whatsappHref) return null;

  return (
    <a
      href={contactDetails.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ${contactDetails.whatsapp}`}
      className="fixed bottom-5 right-5 z-30 inline-flex min-h-12 items-center gap-2 border border-espresso bg-stone px-3 text-espresso shadow-[inset_0_-2px_0_0_#A9573D] hover:border-sienna hover:bg-cream sm:px-4"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em]">WhatsApp</span>
    </a>
  );
}

export function WhatsAppLink({ className = "", children }: WhatsAppLinkProps) {
  if (!contactDetails.whatsappHref) return null;

  return (
    <a
      href={contactDetails.whatsappHref}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children ?? contactDetails.whatsapp}
    </a>
  );
}
