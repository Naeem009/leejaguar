"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/content/site";

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = href === "/" ? pathname === "/" : pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative py-2 font-sans text-[12px] font-medium uppercase tracking-[0.06em] text-espresso xl:text-[13px] xl:tracking-[0.08em]"
    >
      {label}
      <span
        aria-hidden
        className={`absolute bottom-0 left-0 h-0.5 bg-sienna transition-all duration-200 ${
          active ? "w-full" : "w-0 group-hover:w-full group-focus-visible:w-full"
        }`}
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const button = buttonRef.current;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () => {
      const nodes: HTMLElement[] = [];
      if (button) nodes.push(button);
      if (panel) {
        nodes.push(...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      }
      return nodes;
    };

    focusable()[1]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenPath(null);
        button?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-cream text-espresso transition-[height,border-color] duration-200 ${
        scrolled ? "h-[68px] border-stone" : "h-20 border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-wide items-center justify-between gap-4 px-5 md:px-8">
        <Logo variant="mark" className="inline-flex lg:hidden" />
        <Logo className="hidden lg:inline-flex" />
        <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
          ))}
          <Button href="/contact" compact>
            Start a project
          </Button>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-espresso lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? <X aria-hidden className="h-6 w-6" strokeWidth={1.5} /> : <Menu aria-hidden className="h-6 w-6" strokeWidth={1.5} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <MobileMenu ref={panelRef} id={menuId} open={open} pathname={pathname} onClose={() => setOpenPath(null)} />
    </header>
  );
}
