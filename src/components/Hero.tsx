"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { useProjectSheet } from "@/components/ProjectSheet";
import { LongArrow } from "@/components/ui/LongArrow";
import type { SiteContent } from "@/lib/content";

const CYCLE_MS = 4000;

/**
 * A24-style hero — full-screen cover art of the active project (h-svh) with a
 * giant white cycling title over dark gradients. Auto-advances every 4s
 * (paused on hover and while the case study sheet is open), crossfades with a
 * 200ms opacity transition.
 */
export function Hero({ content }: { content: SiteContent }) {
  const works = content.works;
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const { open, openId } = useProjectSheet();
  const hoverPaused = useRef(false);
  const sheetOpen = useRef(false);
  const work = works[index];

  useEffect(() => {
    sheetOpen.current = openId !== null;
  }, [openId]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!hoverPaused.current && !sheetOpen.current) {
        setIndex((value) => (value + 1) % works.length);
      }
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce, works.length]);

  const showNext = () => setIndex((value) => (value + 1) % works.length);

  return (
    <section
      id="hero"
      onMouseEnter={() => {
        hoverPaused.current = true;
      }}
      onMouseLeave={() => {
        hoverPaused.current = false;
      }}
    >
      <div className="ix-zoom relative h-svh min-h-[560px] w-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={work.id}
            layoutId={reduce ? undefined : `cover-hero-${work.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: "easeInOut" }}
            className="ix-image absolute inset-0"
            style={{ background: work.gradient }}
          >
            {work.image && (
              <Image
                src={work.image}
                alt=""
                fill
                quality={85}
                sizes="(max-aspect-ratio: 16/10) 160vh, 100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover object-top"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark veil + progressive blur keep the white nav and headline
            readable and push the cover art back */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-ink/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.52), rgba(10,10,10,0))",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.4) 32%, rgba(10,10,10,0) 70%)",
          }}
        />
        {/* progressive blur: soft behind the nav… */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 backdrop-blur-[6px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 35%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 35%, transparent 100%)",
          }}
        />
        {/* …and behind the headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] backdrop-blur-[10px]"
          style={{
            maskImage:
              "linear-gradient(to top, #000 0%, #000 45%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, #000 0%, #000 45%, transparent 100%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-10 md:pb-14">
            <Eyebrow className="text-white/70">{content.hero.eyebrow}</Eyebrow>

            <button
              type="button"
              onClick={() => open(work.id, "hero")}
              aria-label={`${work.title} — ${content.sheet.caseStudy}`}
              className="mt-3 block cursor-pointer text-left"
            >
              <h1 className="ix-text-light text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white">
                {work.title}
                <sup className="ml-[0.12em] align-super text-[0.28em] font-normal tracking-normal text-white/70">
                  {work.year}
                </sup>
              </h1>
            </button>

            <div className="mt-6 flex items-center justify-between md:mt-8">
              <span className="text-[13px] tabular-nums tracking-[0.04em] text-white/70">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(works.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={showNext}
                aria-label={content.hero.next}
                className="ix-text-light group flex cursor-pointer items-center gap-3 text-[13px] font-medium uppercase tracking-[0.08em] text-white [font-stretch:115%]"
              >
                {content.hero.next}
                <LongArrow className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </button>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
