import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { ConsoleProvider } from "@/components/CommandDrawer";
import { ProjectSheetProvider } from "@/components/ProjectSheet";
import { LOCALES, getContent, isLocale } from "@/lib/content";
import { fontSans } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const content = getContent(lang);

  return {
    metadataBase: new URL("https://murasaki.tech"),
    title: content.meta.title,
    description: content.meta.description,
    keywords: [
      "Jan Fiala",
      "Full-Stack Developer",
      "Automation",
      "Next.js",
      "TypeScript",
      "Portfolio",
      "Praha",
      "Prague",
    ],
    authors: [{ name: "Jan Fiala", url: "https://murasaki.tech" }],
    alternates: {
      canonical: `/${lang}`,
      languages: { cs: "/cs", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: lang === "cs" ? "cs_CZ" : "en_US",
      url: `https://murasaki.tech/${lang}`,
      siteName: "Jan Fiala",
      title: content.meta.title,
      description: content.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <html lang={lang} className={fontSans.variable}>
      <body>
        <ConsoleProvider content={content} locale={lang}>
          <ProjectSheetProvider content={content}>{children}</ProjectSheetProvider>
        </ConsoleProvider>
      </body>
    </html>
  );
}
