import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Jan Fiala — Full-Stack Developer & Automation Builder",
    description:
      "Applied informatics student at the Prague University of Economics and Business. I focus on websites with complete design, AI automations, and robust SaaS platforms.",
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
      "I work at Valeo R&D on automations for engineering teams. In the evenings, I build Tattly and focus on modern architecture and application deployment.",
  },
  worksSection: { eyebrow: "Selected works" },
  services: {
    eyebrow: "What I can build for you",
    items: [
      {
        title: "Websites & complete design",
        description:
          "I design and build fast, accessible, and visually clean custom websites. From the initial sketch to the final launch.",
      },
      {
        title: "AI & script automation",
        description:
          "I streamline routine processes. I connect systems and build smart tools that save time and minimize manual work.",
      },
      {
        title: "SaaS platforms & APIs",
        description:
          "I build robust web applications and booking systems. I handle the complete architecture from database design to the user interface.",
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
        "I focus on software engineering, API integrations, and process automation.",
    },
    experience: [
      {
        period: "2026.03 — Present",
        company: "Valeo R&D",
        role: "Software Script Trainee",
        present: true,
        note: "Development of internal tools and scripts for process automation in R&D teams, reporting support, and AI integration.",
      },
      {
        period: "2023.02 — 2024.03",
        company: "DS Smith",
        role: "IT Specialist",
        note: "Comprehensive enterprise systems management. Ensuring smooth operation of IT services and infrastructure in a corporate environment.",
      },
      {
        period: "2022.05 — 2022.06",
        company: "DPMÚL",
        role: "IT Infrastructure Intern",
        note: "Network infrastructure support and administration — the successful start of my professional journey.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline: "Looking for a junior developer? Or need a custom website or automated processes?",
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
      category: "SaaS platforms & APIs",
      tagline: "Comprehensive booking platform for tattoo artists with automated notifications and client management.",
      brief:
        "Tattoo artists usually spend hours handling bookings through messages and paper diaries. The goal was to build a system that automates and streamlines the entire process.",
      solution:
        "A fully functional booking system with custom availability management, a client profile, automated notifications, and calendar synchronization.",
      learned:
        "Designing complex data models for time slots and production integrations for authentication, communication, and secure data storage.",
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
      category: "AI & script automation",
      tagline: "Analytical investment portfolio dashboard with automated tax calculations and monitoring.",
      brief:
        "Active investing generates hundreds of transactions a year, complicating tax returns. I needed a tool that automatically processes and evaluates the data.",
      solution:
        "A system connected to real market data via API. It automatically pairs buys and sells, monitors tax limits, and tracks time tests according to current legislation.",
      learned:
        "Working with live data via API, query optimization, and implementing complex financial and tax logic into a reliable application.",
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
      category: "SaaS platforms & APIs",
      tagline: "Community platform for readers focused on sharing and reviewing books.",
      brief:
        "The goal of my high-school final project was to design and implement a complete web system for cataloging and reviewing books, from initial concept to final defense.",
      solution:
        "A decoupled backend and frontend architecture. Building a custom API for database communication, ensuring secure authentication, and creating an interactive user interface.",
      learned:
        "Mastering the entire application development cycle, from database design and secure access to the successful presentation of the finished product.",
      stack: ["React", "Vite", "Express", "PostgreSQL", "JWT"],
      type: "High-school final project",
      status: "Live",
    },
    {
      id: "refugio",
      title: "Refugio",
      year: "2025",
      category: "Websites & complete design",
      tagline: "Visually engaging restaurant website emphasizing atmosphere and smooth user experience.",
      brief:
        "A local restaurant needed a modern online presence to showcase its unique atmosphere, with a strong focus on mobile performance.",
      solution:
        "A dynamic and responsive website with fluid animations, combining the menu, gallery, and contact information into a single seamless layout.",
      learned:
        "Finding the balance between rich visual design and fast load times, with a primary focus on responsiveness and accessibility.",
      stack: ["React 19", "Vite", "Tailwind CSS", "Framer Motion"],
      type: "Client project",
      status: "Live",
    },
  ],
};
