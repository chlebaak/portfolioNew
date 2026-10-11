import { workGalleries, worksMeta } from "@/lib/data";
import { cs } from "./cs";
import { en } from "./en";
import type { Content, Locale, ResolvedWork } from "./types";

export const LOCALES = ["cs", "en"] as const;

const dictionaries: Record<Locale, Content> = { cs, en };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getContent(locale: Locale) {
  const content = dictionaries[locale];

  const works: ResolvedWork[] = content.works.map((work) => {
    const meta = worksMeta[work.id];
    return {
      ...work,
      gradient: meta.gradient,
      image: meta.image,
      gallery: workGalleries[work.id] ?? [],
      links: meta.links.map((link) => ({
        label: content.workLinkLabels[link.kind],
        href: link.href,
      })),
    };
  });

  return { ...content, works };
}

export type SiteContent = ReturnType<typeof getContent>;

export type { Locale, ResolvedWork } from "./types";
