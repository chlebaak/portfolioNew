import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { stackRows } from "@/lib/data";
import type { SiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Tech stack as A24 poster typography — giant words spread edge-to-edge,
 * hover switches a word to an outline. Pure CSS, zero JS.
 * Font size adapts to the row count so the poster never overwhelms the page.
 */
export function TechStack({ content }: { content: SiteContent }) {
  const count = stackRows.flat().length;
  const rowCount = stackRows.length;
  const s = content.stackSection;

  const sizeClass =
    rowCount >= 6
      ? "text-[clamp(2rem,4.75vw,4.25rem)]"
      : rowCount >= 4
        ? "text-[clamp(2.25rem,5.5vw,5rem)]"
        : "text-[clamp(2.5rem,7vw,6rem)]";

  return (
    <section id="stack" className="border-t border-hairline">
      <Container className="py-16 md:py-24">
        <div className="flex items-baseline justify-between gap-4">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <span className="text-[13px] uppercase tracking-[0.08em] text-muted/70 [font-stretch:115%]">
            {String(count).padStart(2, "0")} {s.countLabel}
          </span>
        </div>

        <div className="mt-10 space-y-1 md:mt-14 md:space-y-2">
          {stackRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-between gap-x-8 gap-y-1"
            >
              {row.map((word) => (
                <span
                  key={word}
                  className={cn(
                    "cursor-default font-medium leading-[0.95] tracking-[-0.04em] transition-colors duration-150 ease-out hover:text-transparent hover:[-webkit-text-stroke:1.5px_#0a0a0a]",
                    sizeClass,
                  )}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-hairline pt-4 text-[13px] text-muted">
          {s.learningLabel}: {s.learning}
        </p>
      </Container>
    </section>
  );
}
