import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Jan Fiala — Full-Stack Developer & Automation Builder",
    description:
      "Applied informatics student at the Prague University of Economics and Business. I build web applications, automations and internal tools — from data model to the last pixel.",
  },
  site: { status: "Open for work", availability: "Q2/Q3" },
  header: { consoleLabel: "Console", languageLabel: "Language" },
  hero: { eyebrow: "Featured project", next: "Next" },
  telemetry: {
    eyebrow: "Dev telemetry",
    live: "Live",
    lastPush: "Last push",
    repos: "Public repos",
    topLanguage: "Top language",
    localTime: "Local time",
    status: "Status",
    fallback:
      "I work at Valeo R&D on automations for engineering teams. In the evenings I build Tattly and learn Docker and CI/CD.",
  },
  worksSection: { eyebrow: "Selected works" },
  services: {
    eyebrow: "What I can build for you",
    items: [
      {
        title: "Web applications",
        description:
          "Next.js, React, PostgreSQL. From data model to production deploy.",
      },
      {
        title: "Automation & scripts",
        description:
          "Python and integrations that kill manual work — reporting, data, internal tools.",
      },
      {
        title: "Websites & landing pages",
        description: "Fast, accessible custom websites. Design and development.",
      },
    ],
    footer: "Not sure where your project fits?",
    footerLink: "Write me — I'll help.",
  },
  stackSection: {
    eyebrow: "Tech stack",
    countLabel: "technologies",
    learningLabel: "Learning",
    learning: "Docker, CI/CD, testing",
  },
  background: {
    eyebrow: "Background",
    educationLabel: "Education",
    experienceLabel: "Experience",
    graduationLabel: "expected graduation",
    presentLabel: "now",
    education: {
      school: "Prague University of Economics and Business — Faculty of Informatics and Statistics",
      program: "Applied Informatics",
      graduation: "2028",
      focus:
        "I focus on software engineering, database systems and automation.",
    },
    experience: [
      {
        period: "2026.03 — Present",
        company: "Valeo R&D",
        role: "Software Script Trainee",
        present: true,
        note: "Automation and internal tooling for R&D teams — Python, scripts, reporting.",
      },
      {
        period: "2023.02 — 2024.03",
        company: "DS Smith",
        role: "IT Specialist",
        note: "Managing enterprise systems and infrastructure; operations at corporate scale.",
      },
      {
        period: "2022.05 — 2022.06",
        company: "DPMÚL",
        role: "IT Infrastructure Intern",
        note: "Network infrastructure and operations — where my professional path started.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline: "Looking for a junior developer? Or need a website or automation built?",
    copy: "Copy email",
    copied: "Copied",
    cv: "Download CV",
    response: "Write me — I usually reply within 24 hours.",
    footerNote: "Built in Prague",
    footerMeta: "murasaki.tech · Q2/Q3",
  },
  sheet: {
    caseStudy: "Case study",
    back: "Back to portfolio",
    next: "Next",
    nextProject: "Next project",
    closeAria: "Close case study",
    year: "Year",
    type: "Type",
    category: "Category",
    status: "Status",
    brief: "Brief",
    solution: "Solution",
    learned: "What I learned",
    stack: "Stack",
    zoom: "Enlarge image",
    prevImage: "Previous image",
    nextImage: "Next image",
  },
  workLinkLabels: { github: "GitHub", live: "Live web" },
  console: {
    title: "Console",
    placeholder: "Type a command…",
    empty: "Nothing found",
    hint: "[↑↓] navigate · [↵] run",
    groups: { actions: "Actions", navigation: "Navigation", links: "Links" },
    commands: {
      copyEmail: { label: "Copy email", hint: "jan@murasaki.tech to clipboard" },
      downloadCv: { label: "Download CV", hint: "PDF resume" },
      switchLanguage: { label: "Switch to Czech", hint: "change site language" },
      refreshGithub: { label: "Refresh GitHub data", hint: "reload the telemetry" },
      sound: { label: "Sound", hint: "audio feedback on actions" },
      projects: { label: "Projects", hint: "jump to selected works" },
      stack: { label: "Tech stack", hint: "jump to technologies" },
      background: { label: "Background", hint: "education and experience" },
      contact: { label: "Contact", hint: "email and links" },
      github: { label: "GitHub", hint: "open profile" },
      linkedin: { label: "LinkedIn", hint: "open profile" },
    },
    status: {
      ready: "murasaki :: ready",
      copied: "CLIPBOARD :: jan@murasaki.tech [200 OK]",
      copyFailed: "CLIPBOARD :: FAILED",
      downloading: "FETCHING :: cv.pdf",
      refreshed: "GITHUB :: REFRESHED",
      soundOn: "SOUND :: ON",
      soundOff: "SOUND :: OFF",
    },
  },
  works: [
    {
      id: "tattly",
      title: "Tattly",
      year: "2026",
      category: "SaaS platform",
      tagline: "Booking SaaS for tattoo artists — clients, calendar, notifications.",
      brief:
        "Tattoo artists handle bookings through Instagram DMs and paper diaries. I wanted to build a system that does it for them.",
      solution:
        "A booking platform with its own account — availability and client management, photo uploads, email notifications and calendar export.",
      learned:
        "Designing a data model for time slots and production integrations: auth, emails, background jobs and object storage.",
      stack: [
        "Next.js 15",
        "TypeScript",
        "PostgreSQL",
        "Drizzle ORM",
        "NextAuth",
        "Resend",
        "Inngest",
      ],
      type: "Personal project",
      status: "Live",
    },
    {
      id: "taxfolio",
      title: "Taxfolio",
      year: "2026",
      category: "Automation & data",
      tagline: "Live Trading 212 portfolio dashboard with Czech tax monitoring.",
      brief:
        "Investing through Trading 212 generates hundreds of trades a year — and a pile of manual tax math. I wanted an overview that fetches, calculates and explains.",
      solution:
        "A Next.js dashboard wired straight into the live Trading 212 API — tracking the 100,000 CZK value test and the 3-year time test with FIFO lot accounting, showing when each position becomes tax-free.",
      learned:
        "Wiring a live API with rate limits (caching, pagination, error handling) and implementing the tax logic — FIFO lots and the value & time tests under §4 of the Czech Income Tax Act.",
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Trading 212 API",
        "Recharts",
      ],
      type: "Personal project",
      status: "Live (private)",
    },
    {
      id: "knihotok",
      title: "Knihotok",
      year: "2025",
      category: "Full-stack system",
      tagline: "A reading platform — from idea to defence.",
      brief:
        "My high-school final project: a web app for readers — from database design to defending it before a committee.",
      solution:
        "A separate backend (Express + PostgreSQL with JWT auth) and frontend (React + Vite) — library, ratings and user profiles.",
      learned:
        "The complete full-stack cycle: API design, authentication, deployment — and defending my own code in front of a committee.",
      stack: ["React", "Vite", "Express", "PostgreSQL", "JWT"],
      type: "High-school final project",
      status: "Live",
    },
    {
      id: "refugio",
      title: "Refugio",
      year: "2025",
      category: "Web & brand",
      tagline: "A website for a restaurant — atmosphere, menu, reservations.",
      brief:
        "The restaurant needed a site that sells both the atmosphere and the menu — and works great on mobile.",
      solution:
        "A visually rich site with a motion layer — menu, gallery and contact in one smooth experience.",
      learned:
        "Balancing a bold visual with speed and readability — and designing mobile-first.",
      stack: ["React 19", "Vite", "Tailwind CSS", "Framer Motion"],
      type: "Client project",
      status: "Live",
    },
  ],
};
