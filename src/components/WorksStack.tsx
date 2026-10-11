"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { useProjectSheet } from "@/components/ProjectSheet";
import type { ResolvedWork, SiteContent } from "@/lib/content";
import { cn, EASE } from "@/lib/utils";

/**
 * Editorial works stack — one wide featured piece plus three items, titles
 * below the art (A24 caption style). Every item opens the case study sheet.
 */
export function WorksStack({ content }: { content: SiteContent }) {
  const [featured, ...rest] = content.works;
  const { open } = useProjectSheet();

  return (
    <section id="projects" className="border-t border-hairline">
      <Container className="py-16 md:py-24">
        <Eyebrow>{content.worksSection.eyebrow}</Eyebrow>

        <WorkItem
          work={featured}
          wide
          caseStudyLabel={content.sheet.caseStudy}
          className="mt-8"
          onOpen={() => open(featured.id)}
        />

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {rest.map((work) => (
            <WorkItem
              key={work.id}
              work={work}
              caseStudyLabel={content.sheet.caseStudy}
              onOpen={() => open(work.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function WorkItem({
  work,
  wide = false,
  caseStudyLabel,
  className,
  onOpen,
}: {
  work: ResolvedWork;
  wide?: boolean;
  caseStudyLabel: string;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${work.title} — ${caseStudyLabel}`}
      className={cn("ix-zoom block w-full cursor-pointer text-left", className)}
    >
      <div className="relative overflow-hidden">
        <motion.div
          layoutId={`cover-${work.id}`}
          transition={{ duration: 0.45, ease: EASE }}
          className={cn(
            "ix-image relative w-full",
            wide ? "aspect-[16/9]" : "aspect-[4/3]",
          )}
          style={{ background: work.gradient }}
        >
          {work.image && (
            <Image
              src={work.image}
              alt=""
              fill
              quality={85}
              sizes={
                wide
                  ? "(min-width: 1680px) 1600px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)"
                  : "(min-width: 1680px) 512px, (min-width: 768px) calc((100vw - 144px) / 3), calc(100vw - 40px)"
              }
              className="object-cover"
            />
          )}
        </motion.div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3
          className={cn(
            "ix-text font-medium tracking-[-0.03em]",
            wide ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl",
          )}
        >
          {work.title}
          <sup className="ml-[0.12em] align-super text-[0.32em] font-normal tracking-normal text-muted">
            {work.year}
          </sup>
        </h3>
        <span className="shrink-0 text-[13px] uppercase tracking-[0.08em] text-muted [font-stretch:115%]">
          {work.category}
        </span>
      </div>
      <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted">
        {work.tagline}
      </p>
    </button>
  );
}
