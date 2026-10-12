import type { Content } from "./types";

export const cs: Content = {
  meta: {
    title: "Jan Fiala — Full-Stack Developer & Automation Builder",
    description:
      "Student aplikované informatiky na VŠE v Praze. Stavím webové aplikace, automatizace a interní nástroje — od datového modelu po poslední pixel.",
  },
  site: { status: "Open for work", availability: "Q2/Q3" },
  header: { consoleLabel: "Konzole", languageLabel: "Jazyk" },
  hero: { eyebrow: "Vybraný projekt", next: "Další" },
  telemetry: {
    eyebrow: "Dev telemetry",
    live: "Live",
    lastPush: "Poslední push",
    repos: "Veřejné repozitáře",
    topLanguage: "Top jazyk",
    localTime: "Lokální čas",
    status: "Status",
    fallback:
      "Pracuji ve Valeo R&D na automatizacích pro vývojové týmy. Po večerech stavím Tattly a učím se Docker a CI/CD.",
  },
  worksSection: { eyebrow: "Vybrané projekty" },
  services: {
    eyebrow: "Co pro vás umím postavit",
    items: [
      {
        title: "Webové aplikace",
        description:
          "Next.js, React, PostgreSQL. Od datového modelu po produkční deploy.",
      },
      {
        title: "Automatizace & skripty",
        description:
          "Python a integrace, které zruší ruční práci — reporting, data, interní nástroje.",
      },
      {
        title: "Weby & landing pages",
        description: "Rychlé a přístupné weby na míru. Design i vývoj.",
      },
    ],
    footer: "Nevíte, kam projekt patří?",
    footerLink: "Napište — poradím.",
  },
  stackSection: {
    eyebrow: "Tech stack",
    countLabel: "technologií",
    learningLabel: "Učím se",
    learning: "Docker, CI/CD, testy",
  },
  background: {
    eyebrow: "Background",
    educationLabel: "Vzdělání",
    experienceLabel: "Praxe",
    graduationLabel: "předpokládané dokončení",
    presentLabel: "nyní",
    education: {
      school: "VŠE Praha — Fakulta informatiky a statistiky",
      program: "Aplikovaná informatika",
      graduation: "2028",
      focus:
        "Zaměřuji se na softwarové inženýrství, databázové systémy a automatizaci.",
    },
    experience: [
      {
        period: "2026.03 — nyní",
        company: "Valeo R&D",
        role: "Software Script Trainee",
        present: true,
        note: "Automatizace a interní nástroje pro R&D týmy — Python, skripty, reporting.",
      },
      {
        period: "2023.02 — 2024.03",
        company: "DS Smith",
        role: "IT Specialist",
        note: "Správa podnikových systémů a infrastruktury; provoz v korporátním měřítku.",
      },
      {
        period: "2022.05 — 2022.06",
        company: "DPMÚL",
        role: "IT Infrastructure Intern",
        note: "Síťová infrastruktura a provoz — start profesní cesty.",
      },
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    headline:
      "Hledáte juniora do týmu? Nebo potřebujete postavit web či automatizaci?",
    copy: "Kopírovat e-mail",
    copied: "Zkopírováno",
    cv: "Stáhnout CV",
    response: "Napište mi — obvykle odpovídám do 24 hodin.",
    footerNote: "Postaveno v Praze",
    footerMeta: "murasaki.tech · Q2/Q3",
  },
  sheet: {
    caseStudy: "Case study",
    back: "Zpět na portfolio",
    next: "Další",
    nextProject: "Další projekt",
    closeAria: "Zavřít case study",
    year: "Rok",
    type: "Typ",
    category: "Kategorie",
    status: "Stav",
    brief: "Zadání",
    solution: "Řešení",
    learned: "Co jsem se naučil",
    stack: "Stack",
    zoom: "Zvětšit obrázek",
    prevImage: "Předchozí obrázek",
    nextImage: "Další obrázek",
  },
  workLinkLabels: { github: "GitHub", live: "Živý web" },
  console: {
    title: "Konzole",
    placeholder: "Napište příkaz…",
    empty: "Nic nenalezeno",
    hint: "[↑↓] navigace · [↵] spustit",
    groups: { actions: "Akce", navigation: "Navigace", links: "Odkazy" },
    commands: {
      copyEmail: { label: "Kopírovat e-mail", hint: "jan@murasaki.tech do schránky" },
      downloadCv: { label: "Stáhnout CV", hint: "PDF životopis" },
      switchLanguage: { label: "Přepnout na English", hint: "změnit jazyk stránky" },
      refreshGithub: { label: "Obnovit GitHub data", hint: "znovu načíst telemetrii" },
      sound: { label: "Zvuk", hint: "zvukový feedback při akcích" },
      projects: { label: "Projekty", hint: "přejít na vybrané projekty" },
      stack: { label: "Tech stack", hint: "přejít na technologie" },
      background: { label: "Background", hint: "vzdělání a praxe" },
      contact: { label: "Kontakt", hint: "e-mail a odkazy" },
      github: { label: "GitHub", hint: "otevřít profil" },
      linkedin: { label: "LinkedIn", hint: "otevřít profil" },
    },
    status: {
      ready: "murasaki :: připraveno",
      copied: "SCHRÁNKA :: jan@murasaki.tech [200 OK]",
      copyFailed: "SCHRÁNKA :: CHYBA",
      downloading: "STAHUJI :: cv.pdf",
      refreshed: "GITHUB :: OBNOVENO",
      soundOn: "ZVUK :: ZAPNUT",
      soundOff: "ZVUK :: VYPNUT",
    },
  },
  works: [
    {
      id: "tattly",
      title: "Tattly",
      year: "2026",
      category: "SaaS platforma",
      tagline: "Rezervační SaaS pro tatéry — klienti, kalendář, notifikace.",
      brief:
        "Tatéři řeší rezervace přes zprávy na Instagramu a papírové diáře. Chtěl jsem postavit systém, který to zvládne za ně.",
      solution:
        "Rezervační platforma s vlastním účtem — správa dostupnosti a klientů, nahrávání fotek, e-mailové notifikace a export do kalendáře.",
      learned:
        "Návrh datového modelu pro časové sloty a produkční integrace: autentizace, e-maily, background joby a object storage.",
      stack: [
        "Next.js 15",
        "TypeScript",
        "PostgreSQL",
        "Drizzle ORM",
        "NextAuth",
        "Resend",
        "Inngest",
      ],
      type: "Osobní projekt",
      status: "Live",
    },
    {
      id: "taxfolio",
      title: "Taxfolio",
      year: "2026",
      category: "Automatizace & data",
      tagline: "Live dashboard portfolia z Trading 212 s hlídáním českých daní.",
      brief:
        "Investování přes Trading 212 generuje stovky obchodů ročně — a s nimi ruční počítání daní. Chtěl jsem přehled, který data stáhne, spočítá a vysvětlí.",
      solution:
        "Next.js dashboard napojený přímo na live Trading 212 API — hlídá hodnotový test (limit 100 000 Kč) i časový test s FIFO účtováním lotů a ukazuje, kdy která pozice přestane být zdanitelná.",
      learned:
        "Napojení live API s rate limity (cache, paginace, error handling) a implementace daňové logiky — FIFO loty, hodnotový a časový test podle §4 zákona o daních z příjmů.",
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Trading 212 API",
        "Recharts",
      ],
      type: "Osobní projekt",
      status: "Live (privátní)",
    },
    {
      id: "knihotok",
      title: "Knihotok",
      year: "2025",
      category: "Full-stack systém",
      tagline: "Čtenářská platforma — od nápadu po obhajobu.",
      brief:
        "Maturitní projekt na střední škole: webová aplikace pro čtenáře — od návrhu databáze po obhajobu před komisí.",
      solution:
        "Oddělený backend (Express + PostgreSQL s JWT autentizací) a frontend (React + Vite) — knihovna, hodnocení a uživatelské profily.",
      learned:
        "Kompletní full-stack cyklus: návrh API, autentizace, nasazení — a obhajoba vlastního kódu před komisí.",
      stack: ["React", "Vite", "Express", "PostgreSQL", "JWT"],
      type: "Maturitní projekt",
      status: "Live",
    },
    {
      id: "refugio",
      title: "Refugio",
      year: "2025",
      category: "Web & brand",
      tagline: "Web pro restauraci — atmosféra, menu, rezervace.",
      brief:
        "Restaurace potřebovala web, který prodá atmosféru i menu — a funguje skvěle na mobilu.",
      solution:
        "Vizuálně bohatý web s motion vrstvou — menu, galerie a kontakt v jednom plynulém zážitku.",
      learned:
        "Jak skloubit výrazný vizuál s rychlostí a čitelností — a jak navrhovat pro malé obrazovky první.",
      stack: ["React 19", "Vite", "Tailwind CSS", "Framer Motion"],
      type: "Klientský projekt",
      status: "Live",
    },
  ],
};
