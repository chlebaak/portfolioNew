import type { Content } from "./types";

export const cs: Content = {
  meta: {
    title: "Jan Fiala — Full-Stack Developer & Automation Builder",
    description:
      "Student aplikované informatiky na VŠE v Praze. Zaměřuji se na weby s kompletním designem, AI automatizace a robustní SaaS platformy.",
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
      "Pracuji ve Valeo R&D na automatizacích pro vývojové týmy. Po večerech stavím Tattly a řeším moderní architekturu a nasazování aplikací.",
  },
  worksSection: { eyebrow: "Vybrané projekty" },
  services: {
    eyebrow: "Co pro vás umím postavit",
    items: [
      {
        title: "Weby a kompletní design",
        description:
          "Navrhuji a tvořím rychlé, přístupné a vizuálně čisté weby na míru. Od prvního nákresu až po finální spuštění.",
      },
      {
        title: "AI a skript automatizace",
        description:
          "Zefektivňuji rutinní procesy. Propojuji systémy a vytvářím chytré nástroje, které šetří čas a minimalizují manuální práci.",
      },
      {
        title: "SaaS platformy a API",
        description:
          "Stavím robustní webové aplikace a rezervační systémy. Řeším kompletní architekturu od návrhu databáze po uživatelské rozhraní.",
      },
    ],
    footer: "Nevíte, kam váš projekt patří?",
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
        "Zaměřuji se na softwarové inženýrství, integrace API a automatizaci procesů.",
    },
    experience: [
      {
        period: "2026.03 — nyní",
        company: "Valeo R&D",
        role: "Software Script Trainee",
        present: true,
        note: "Vývoj interních nástrojů a skriptů pro automatizaci procesů ve vývojových týmech, podpora reportingu a integrace AI.",
      },
      {
        period: "2023.02 — 2024.03",
        company: "DS Smith",
        role: "IT Specialist",
        note: "Komplexní správa podnikových systémů. Zajišťování plynulého chodu IT služeb a infrastruktury v korporátním prostředí.",
      },
      {
        period: "2022.05 — 2022.06",
        company: "DPMÚL",
        role: "IT Infrastructure Intern",
        note: "Podpora a správa síťové infrastruktury — úspěšný start mé profesní cesty.",
      },
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    headline:
      "Hledáte juniora do týmu? Nebo potřebujete postavit web či zautomatizovat procesy?",
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
      category: "SaaS platformy a API",
      tagline: "Komplexní rezervační platforma pro tatéry s automatickými notifikacemi a správou klientů.",
      brief:
        "Tatéři běžně tráví hodiny řešením rezervací přes zprávy a papírové diáře. Cílem bylo vytvořit systém, který celý proces zautomatizuje a zpřehlední.",
      solution:
        "Plně funkční rezervační systém s vlastní správou dostupnosti, profilem pro klienty, automatickými upozorněními a synchronizací s kalendářem.",
      learned:
        "Návrh složitých datových modelů pro časové sloty a produkční integrace pro autentizaci, komunikaci a bezpečné ukládání dat.",
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
      category: "AI a skript automatizace",
      tagline: "Analytický dashboard pro investiční portfolio s automatickým výpočtem a hlídáním daní.",
      brief:
        "Aktivní investování generuje stovky transakcí ročně, což komplikuje daňová přiznání. Potřeboval jsem nástroj, který data automaticky zpracuje a vyhodnotí.",
      solution:
        "Systém napojený na reálná tržní data přes API. Automaticky páruje nákupy a prodeje, hlídá daňové limity a časové testy podle platné legislativy.",
      learned:
        "Práce s živými daty přes API, optimalizace dotazů a implementace komplexní finanční a daňové logiky do spolehlivého celku.",
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
      category: "SaaS platformy a API",
      tagline: "Komunitní platforma pro čtenáře zaměřená na sdílení a hodnocení knih.",
      brief:
        "Cílem maturitního projektu bylo navrhnout a realizovat kompletní webový systém pro evidenci a recenzování knih od prvotního konceptu až po finální obhajobu.",
      solution:
        "Rozdělená architektura backendu a frontendu. Tvorba vlastního rozhraní pro komunikaci s databází, zajištění bezpečného přihlašování a interaktivního prostředí.",
      learned:
        "Zvládnutí celého cyklu vývoje aplikace, od návrhu databáze přes zabezpečení přístupu až po úspěšnou prezentaci hotového řešení.",
      stack: ["React", "Vite", "Express", "PostgreSQL", "JWT"],
      type: "Maturitní projekt",
      status: "Live",
    },
    {
      id: "refugio",
      title: "Refugio",
      year: "2025",
      category: "Weby a kompletní design",
      tagline: "Vizuálně atraktivní web pro restauraci s důrazem na atmosféru a plynulý uživatelský zážitek.",
      brief:
        "Lokální restaurace potřebovala moderní prezentaci, která zákazníkům přiblíží její jedinečnou atmosféru a bude skvěle fungovat i na mobilu.",
      solution:
        "Dynamický a responzivní web s plynulými animacemi, který spojuje jídelní lístek, galerii a kontakty do jednoho přehledného celku.",
      learned:
        "Hledání rovnováhy mezi bohatým vizuálním designem a rychlostí načítání, s primárním zaměřením na responzivitu a přístupnost.",
      stack: ["React 19", "Vite", "Tailwind CSS", "Framer Motion"],
      type: "Klientský projekt",
      status: "Live",
    },
  ],
};
