"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll";
import { companyInfo, navItems } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { MobileMenu } from "@/components/nav/MobileMenu";

const SECTION_IDS = navItems.map((item) => item.id);
const QUOTE_CTA_LABEL = "Wycena";
const MOBILE_MENU_ID = "menu-mobilne";

function logoInitial(name: string): string {
  return name.match(/\p{L}/u)?.[0]?.toUpperCase() ?? "R";
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeSection = useActiveSection(SECTION_IDS);
  const reducedMotion = useReducedMotionSafe();

  const goTo = (id: string) => {
    scrollToSection(id, reducedMotion);
    setMenuOpen(false);
  };

  // Disclosure-navigation pattern: Escape closes the drawer, focus returns
  // to the toggle so the keyboard user is not stranded in a hidden menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header>
      <nav
        aria-label="Główna nawigacja"
        className="fixed top-0 left-0 z-150 w-full border-b border-text/7 bg-nav/82 backdrop-blur-[14px]"
      >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4.5 px-[clamp(18px,4vw,40px)] py-3.5">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goTo("home");
          }}
          className="flex shrink-0 items-center gap-2.75 text-text"
        >
          <span className="grid size-8.5 place-items-center rounded-[9px] bg-linear-140 from-brass-deep to-brass font-mono text-[17px] font-extrabold text-bg">
            {logoInitial(companyInfo.name)}
          </span>
          <span className="text-base font-bold">{companyInfo.name}</span>
        </a>

        <div className="hidden items-center gap-1.5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(item.id);
              }}
              aria-current={activeSection === item.id ? "true" : undefined}
              className={cn(
                "rounded-[9px] px-3 py-2 text-ui font-medium whitespace-nowrap transition-colors duration-200 hover:text-text",
                activeSection === item.id ? "text-text" : "text-muted",
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              goTo("kontakt");
            }}
            className="ml-2 rounded-pill bg-brass px-5 py-3 text-ui font-bold whitespace-nowrap text-bg transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-cta"
          >
            {QUOTE_CTA_LABEL}
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
          className="grid size-11 cursor-pointer place-items-center rounded-field border border-text/12 bg-text/5 text-text lg:hidden"
        >
          {menuOpen ? (
            <X aria-hidden size={20} strokeWidth={1.8} />
          ) : (
            <Menu aria-hidden size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

        <MobileMenu
          id={MOBILE_MENU_ID}
          open={menuOpen}
          ctaLabel={QUOTE_CTA_LABEL}
          onNavigate={goTo}
          activeSection={activeSection}
        />
      </nav>
    </header>
  );
}
