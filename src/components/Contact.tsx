"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { useConsole } from "@/components/CommandDrawer";
import { copyText } from "@/lib/clipboard";
import { cvHref, site, socials } from "@/lib/data";
import { playBlip } from "@/lib/sound";
import type { SiteContent } from "@/lib/content";

/** Giant display contact statement + footer line. */
export function Contact({ content }: { content: SiteContent }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | null>(null);
  const { soundOn } = useConsole();
  const c = content.contact;

  useEffect(() => {
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  const handleCopy = async () => {
    const ok = await copyText(site.email);
    if (!ok) return;

    setCopied(true);
    if (soundOn) playBlip();
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="border-t border-hairline">
      <Container className="py-20 md:py-32">
        <Eyebrow>{c.eyebrow}</Eyebrow>

        <h2 className="mt-8 max-w-[18ch] text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          {c.headline}
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${site.email}`}
              className="ix-text text-xl font-medium tracking-[-0.02em] md:text-2xl"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="ix-dim flex cursor-pointer items-center gap-2 bg-ink px-5 py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-white [font-stretch:115%]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="ok"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <Check aria-hidden className="size-3.5" strokeWidth={2} />
                    {c.copied}
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    {c.copy}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <a
              href={cvHref}
              download
              className="ix-text text-[13px] font-medium uppercase tracking-[0.08em] [font-stretch:115%]"
            >
              {c.cv}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="ix-text group inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.08em] [font-stretch:115%]"
              >
                {social.label}
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-sm text-muted">{c.response}</p>
      </Container>

      <footer className="border-t border-hairline">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.name} · {c.footerNote}
          </p>
          <p className="uppercase tracking-[0.08em] [font-stretch:115%]">
            <span aria-hidden className="mr-1.5 text-accent">紫</span>{c.footerMeta}
          </p>
        </Container>
      </footer>
    </section>
  );
}
