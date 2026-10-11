import type { GalleryItem } from "@/lib/data";

export type Locale = "cs" | "en";
export type WorkId = "tattly" | "taxfolio" | "knihotok" | "refugio";

export type WorkText = {
  id: WorkId;
  title: string;
  year: string;
  category: string;
  tagline: string;
  brief: string;
  solution: string;
  learned: string;
  stack: string[];
  type: string;
  status: string;
};

export type ResolvedWork = WorkText & {
  gradient: string;
  image?: string;
  gallery: GalleryItem[];
  links: { label: string; href: string }[];
};

export type Content = {
  meta: { title: string; description: string };
  site: { status: string; availability: string };
  header: { consoleLabel: string; languageLabel: string };
  hero: { eyebrow: string; next: string };
  telemetry: {
    eyebrow: string;
    live: string;
    lastPush: string;
    repos: string;
    topLanguage: string;
    localTime: string;
    status: string;
    fallback: string;
  };
  worksSection: { eyebrow: string };
  services: {
    eyebrow: string;
    items: { title: string; description: string }[];
    footer: string;
    footerLink: string;
  };
  stackSection: {
    eyebrow: string;
    countLabel: string;
    learningLabel: string;
    learning: string;
  };
  background: {
    eyebrow: string;
    educationLabel: string;
    experienceLabel: string;
    graduationLabel: string;
    presentLabel: string;
    education: { school: string; program: string; graduation: string; focus: string };
    experience: {
      period: string;
      company: string;
      role: string;
      note: string;
      present?: boolean;
    }[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    copy: string;
    copied: string;
    cv: string;
    response: string;
    footerNote: string;
    footerMeta: string;
  };
  sheet: {
    caseStudy: string;
    back: string;
    next: string;
    nextProject: string;
    closeAria: string;
    year: string;
    type: string;
    category: string;
    status: string;
    brief: string;
    solution: string;
    learned: string;
    stack: string;
    zoom: string;
    prevImage: string;
    nextImage: string;
  };
  workLinkLabels: { github: string; live: string };
  console: {
    title: string;
    placeholder: string;
    empty: string;
    hint: string;
    groups: { actions: string; navigation: string; links: string };
    commands: {
      copyEmail: { label: string; hint: string };
      downloadCv: { label: string; hint: string };
      switchLanguage: { label: string; hint: string };
      refreshGithub: { label: string; hint: string };
      sound: { label: string; hint: string };
      projects: { label: string; hint: string };
      stack: { label: string; hint: string };
      background: { label: string; hint: string };
      contact: { label: string; hint: string };
      github: { label: string; hint: string };
      linkedin: { label: string; hint: string };
    };
    status: {
      ready: string;
      copied: string;
      copyFailed: string;
      downloading: string;
      refreshed: string;
      soundOn: string;
      soundOff: string;
    };
  };
  works: WorkText[];
};
