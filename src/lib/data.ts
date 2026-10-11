/** Locale-agnostic constants shared by both language mutations. */

export const site = {
  name: "Jan Fiala",
  email: "jan@murasaki.tech",
  github: "chlebaak",
} as const;

/** TODO: drop the real CV into /public/cv.pdf — the button already points there. */
export const cvHref = "/cv.pdf";

export const socials = [
  { label: "GitHub", href: "https://github.com/chlebaak" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/janfiala331" },
] as const;

/** Poster rows for the tech stack section (names are language-independent). */
export const stackRows = [
  ["TypeScript", "Next.js"],
  ["React", "PostgreSQL", "Node.js"],
  ["Tailwind CSS", "Express", "Vite"],
  ["Python", "Drizzle"],
  ["NextAuth", "Gemini API"],
] as const;

export type WorkLinkKind = "github" | "live";

type WorkMeta = {
  /** Soft gradient behind the cover — visible while the photo loads. */
  gradient: string;
  /** Cover photo in /public/works; falls back to the gradient when missing. */
  image?: string;
  links: { kind: WorkLinkKind; href: string }[];
};

export const worksMeta: Record<string, WorkMeta> = {
  tattly: {
    gradient:
      "radial-gradient(120% 120% at 15% 0%, #c7ceff 0%, #e6e9ff 55%, #f6f7ff 100%)",
    image: "/works/tattly/cover.webp",
    links: [
      { kind: "github", href: "https://github.com/chlebaak/tattly" },
      { kind: "live", href: "https://tattly.vercel.app" },
    ],
  },
  taxfolio: {
    gradient:
      "radial-gradient(120% 120% at 15% 0%, #c5e4f2 0%, #e5f2f9 55%, #f4fafc 100%)",
    image: "/works/taxfolio/cover.webp",
    links: [
      { kind: "github", href: "https://github.com/chlebaak/trading" },
      { kind: "live", href: "https://trading-six-ecru.vercel.app" },
    ],
  },
  knihotok: {
    gradient:
      "radial-gradient(120% 120% at 15% 0%, #cde3d4 0%, #e8f3ea 55%, #f6faf7 100%)",
    image: "/works/knihotok/cover.webp",
    links: [
      { kind: "github", href: "https://github.com/chlebaak/knihotok" },
      { kind: "live", href: "https://knihotok.vercel.app" },
    ],
  },
  refugio: {
    gradient:
      "radial-gradient(120% 120% at 15% 0%, #f0dfc5 0%, #f8f0e2 55%, #fcf8f1 100%)",
    image: "/works/refugio/cover.webp",
    links: [
      { kind: "github", href: "https://github.com/chlebaak/refugio2" },
      { kind: "live", href: "https://refugio-ruddy.vercel.app" },
    ],
  },
};

/** Case-study gallery item — photo with its gradient as the loading backdrop. */
export type GalleryItem = { gradient: string; image?: string };

export const workGalleries: Record<string, GalleryItem[]> = {
  tattly: [
    {
      gradient:
        "radial-gradient(120% 120% at 80% 10%, #c7ceff 0%, #e9ebff 55%, #f6f7ff 100%)",
      image: "/works/tattly/01.webp",
    },
    {
      gradient:
        "radial-gradient(120% 120% at 20% 90%, #dde1ff 0%, #f0f1ff 60%, #fafaff 100%)",
      image: "/works/tattly/02.webp",
    },
    {
      gradient:
        "radial-gradient(120% 120% at 80% 10%, #c7ceff 0%, #e9ebff 55%, #f6f7ff 100%)",
      image: "/works/tattly/03.webp",
    },
    {
      gradient:
        "radial-gradient(120% 120% at 20% 90%, #dde1ff 0%, #f0f1ff 60%, #fafaff 100%)",
      image: "/works/tattly/04.webp",
    },
    {
      gradient:
        "radial-gradient(120% 120% at 80% 10%, #c7ceff 0%, #e9ebff 55%, #f6f7ff 100%)",
      image: "/works/tattly/05.webp",
    },
  ],
  taxfolio: [
    {
      gradient:
        "radial-gradient(120% 120% at 80% 10%, #c5e4f2 0%, #e6f3f9 55%, #f4fafc 100%)",
      image: "/works/taxfolio/01.webp",
    },
    {
      gradient:
        "radial-gradient(120% 120% at 20% 90%, #d6eaf4 0%, #eef7fb 60%, #fbfdfe 100%)",
      image: "/works/taxfolio/02.webp",
    },
  ],
  knihotok: [
    {
      gradient:
        "radial-gradient(120% 120% at 80% 10%, #cde3d4 0%, #e9f4eb 55%, #f6faf7 100%)",
      image: "/works/knihotok/01.webp",
    },
    {
      gradient:
        "radial-gradient(120% 120% at 20% 90%, #dcebe1 0%, #f0f7f2 60%, #fbfdfc 100%)",
      image: "/works/knihotok/02.webp",
    },
  ],
  refugio: [
    {
      gradient:
        "radial-gradient(120% 120% at 80% 10%, #f0dfc5 0%, #f8f1e5 55%, #fcf9f2 100%)",
      image: "/works/refugio/01.webp",
    },
    {
      gradient:
        "radial-gradient(120% 120% at 20% 90%, #ece2d2 0%, #f7f1e8 60%, #fdfbf7 100%)",
      image: "/works/refugio/02.webp",
    },
  ],
};
