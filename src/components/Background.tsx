import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import type { SiteContent } from "@/lib/content";

/** Editorial two-column background — education left, experience right. */
export function Background({ content }: { content: SiteContent }) {
  const b = content.background;

  return (
    <section id="background" className="border-t border-hairline">
      <Container className="py-16 md:py-24">
        <Eyebrow>{b.eyebrow}</Eyebrow>

        <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Education */}
          <div className="md:col-span-5">
            <p className="text-[13px] uppercase tracking-[0.08em] text-muted/70 [font-stretch:115%]">
              {b.educationLabel}
            </p>
            <h3 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.03em] md:text-3xl">
              {b.education.school}
            </h3>
            <p className="mt-3 text-sm text-muted">
              {b.education.program} · {b.graduationLabel} {b.education.graduation}
            </p>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-muted">
              {b.education.focus}
            </p>
          </div>

          {/* Experience */}
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-[13px] uppercase tracking-[0.08em] text-muted/70 [font-stretch:115%]">
              {b.experienceLabel}
            </p>
            <ul className="mt-4">
              {b.experience.map((item) => (
                <li key={item.company} className="border-t border-hairline py-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xl font-medium tracking-[-0.02em] md:text-2xl">
                      {item.company}
                    </span>
                    <span className="text-sm text-muted">{item.role}</span>
                    {item.present ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                        <span
                          aria-hidden
                          className="size-1 rounded-full bg-accent"
                        />
                        {b.presentLabel}
                      </span>
                    ) : null}
                    <span className="ml-auto text-xs tabular-nums text-muted">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted">
                    {item.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
