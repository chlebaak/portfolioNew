import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import type { SiteContent } from "@/lib/content";

/** Numbered editorial index of services. */
export function ServicesList({ content }: { content: SiteContent }) {
  const s = content.services;

  return (
    <section className="border-t border-hairline">
      <Container className="py-16 md:py-24">
        <Eyebrow>{s.eyebrow}</Eyebrow>

        <ul className="mt-8">
          {s.items.map((service, index) => (
            <li key={service.title} className="border-t border-hairline">
              <div className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                <span className="text-[13px] tabular-nums text-muted md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.03em] md:col-span-5 md:text-4xl">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted md:col-span-6">
                  {service.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted">
          {s.footer}{" "}
          <a href="#contact" className="ix-text font-medium text-ink">
            {s.footerLink}
          </a>
        </p>
      </Container>
    </section>
  );
}
