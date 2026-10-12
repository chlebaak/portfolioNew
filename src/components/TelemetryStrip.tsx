"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { StatusDot } from "@/components/ui/StatusDot";
import { site } from "@/lib/data";
import { useGitHubStats } from "@/lib/hooks/useGitHubStats";
import type { Locale, SiteContent } from "@/lib/content";

const CLOCK_INTERVAL_MS = 40;

/** Minimal dev telemetry — big numbers in a row, A24 eyebrow labels. */
export function TelemetryStrip({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const { stats, failed } = useGitHubStats(site.github, locale);
  const [zone, setZone] = useState("CET");
  const clockRef = useRef<HTMLSpanElement>(null);
  const t = content.telemetry;

  // Prague clock with milliseconds — written straight to the DOM (no re-renders)
  useEffect(() => {
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Prague",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tz = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Prague",
      timeZoneName: "short",
    });

    const update = () => {
      const element = clockRef.current;
      if (!element) return;
      const now = new Date();
      element.textContent = `${time.format(now)}.${String(now.getMilliseconds()).padStart(3, "0")}`;
    };
    const updateZone = () => {
      const part = tz
        .formatToParts(new Date())
        .find((piece) => piece.type === "timeZoneName");
      if (part?.value) setZone(part.value);
    };

    update();
    updateZone();
    const clockId = window.setInterval(update, CLOCK_INTERVAL_MS);
    const zoneId = window.setInterval(updateZone, 60_000);
    return () => {
      window.clearInterval(clockId);
      window.clearInterval(zoneId);
    };
  }, []);

  return (
    <section className="border-t border-hairline">
      <Container className="py-14 md:py-20">
        <Eyebrow>{t.eyebrow}</Eyebrow>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-x-0">
          <Stat label={t.lastPush}>{stats?.lastPush ?? "—"}</Stat>
          <Stat label={t.repos}>
            {stats ? String(stats.publicRepos) : "—"}
          </Stat>
          <Stat label={t.topLanguage}>{stats?.topLanguage ?? "—"}</Stat>
          <Stat label={t.localTime}>
            <span ref={clockRef} className="tabular-nums">
              --:--:--.---
            </span>{" "}
            <span className="hidden text-sm font-normal text-muted md:inline">{zone}</span>
          </Stat>
          <Stat label={t.status}>
            <span className="flex items-center gap-2 text-accent">
              <StatusDot tone="accent" className="size-1.5" />
              {content.site.status}
            </span>
          </Stat>
        </div>

        {failed ? (
          <p className="mt-10 max-w-[56ch] text-sm leading-relaxed text-muted">
            {t.fallback}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

function Stat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:border-l md:border-hairline md:pl-6 md:first:border-l-0 md:first:pl-0">
      <p className="text-2xl font-medium tracking-[-0.02em] md:text-4xl">
        {children}
      </p>
      <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-muted [font-stretch:115%]">
        {label}
      </p>
    </div>
  );
}
