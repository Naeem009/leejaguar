"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/content/site";

type MobileMenuProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
  id: string;
};

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(function MobileMenu(
  { open, pathname, onClose, id },
  ref,
) {
  if (!open) return null;

  return (
    <div
      ref={ref}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      className="fixed inset-0 z-40 overflow-y-auto bg-cream px-6 pb-12 pt-24 text-espresso lg:hidden"
    >
      <nav aria-label="Mobile" className="flex min-h-[calc(100%-1rem)] w-full flex-col">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <li key={item.href} className="border-b border-stone">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={onClose}
                  className="inline-flex py-3 font-display text-[clamp(2rem,8vw,3.1rem)] uppercase leading-none tracking-[-0.01em] text-espresso"
                >
                  <span className={active ? "underline decoration-sienna decoration-2 underline-offset-8" : ""}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto pt-10">
          <Button href="/contact" onClick={onClose}>
            Start a project
          </Button>
        </div>
      </nav>
    </div>
  );
});
