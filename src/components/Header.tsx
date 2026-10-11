"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useConsole } from "@/components/CommandDrawer";
import { Container } from "@/components/Container";
import { Kbd } from "@/components/ui/Kbd";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Locale, SiteContent } from "@/lib/content";

const SHOW_AT_TOP = 96; // always visible near the top
const DELTA = 4; // ignore sub-pixel scroll jitter

/**
 * Fixed editorial header (A24 pattern) — transparent with white text while it
 * overlaps the hero, solid white with ink text past it. Hides on scroll down,
 * returns on scroll up (bg 150ms linear / transform 200ms ease-in-out), and is
 * `inert` while hidden so it stays out of the tab order.
 */
export function Header({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const { open, shortcutLabel } = useConsole();
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;

    const evaluate = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      const height = headerRef.current?.offsetHeight ?? 72;

      if (Math.abs(dy) > DELTA) {
        setHidden(dy > 0 && y > SHOW_AT_TOP);
        lastY.current = y;
      }

      // solid once the header no longer overlaps the hero
      const hero = document.getElementById("hero");
      if (hero) {
        setSolid(hero.getBoundingClientRect().bottom <= height);
      } else {
        setSolid(y > window.innerHeight - height);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const light = !solid;

  return (
    <header
      ref={headerRef}
      inert={hidden}
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color] duration-200 ease-in-out motion-reduce:transition-none",
        hidden ? "-translate-y-full" : "translate-y-0",
        solid ? "border-hairline bg-canvas" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex items-center justify-between py-6">
        <a
          href="#top"
          className={cn(
            "text-[13px] font-medium uppercase tracking-[0.08em] [font-stretch:115%]",
            light ? "ix-text-light text-white" : "ix-text",
          )}
        >
          {site.name}
        </a>

        <div className="flex items-center gap-5 md:gap-7">
          <nav
            aria-label={content.header.languageLabel}
            className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] [font-stretch:115%]"
          >
            {locale === "cs" ? (
              <span className={light ? "text-white" : "text-ink"}>CS</span>
            ) : (
              <Link
                href="/cs"
                className={cn(
                  light ? "ix-invert-light text-white/60" : "ix-invert text-muted",
                )}
              >
                CS
              </Link>
            )}
            <span
              aria-hidden
              className={light ? "text-white/30" : "text-muted/40"}
            >
              /
            </span>
            {locale === "en" ? (
              <span className={light ? "text-white" : "text-ink"}>EN</span>
            ) : (
              <Link
                href="/en"
                className={cn(
                  light ? "ix-invert-light text-white/60" : "ix-invert text-muted",
                )}
              >
                EN
              </Link>
            )}
          </nav>

          <button
            type="button"
            onClick={open}
            aria-label={content.header.consoleLabel}
            className={cn(
              "flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] [font-stretch:115%]",
              light ? "ix-invert-light text-white/75" : "ix-invert text-muted",
            )}
          >
            {content.header.consoleLabel}
            <Kbd
              className={light ? "border-white/30 text-white/70" : undefined}
            >
              {shortcutLabel}
            </Kbd>
          </button>
        </div>
      </Container>
    </header>
  );
}
