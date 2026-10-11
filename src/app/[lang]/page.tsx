import { notFound } from "next/navigation";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServicesList } from "@/components/ServicesList";
import { TechStack } from "@/components/TechStack";
import { TelemetryStrip } from "@/components/TelemetryStrip";
import { WorksStack } from "@/components/WorksStack";
import { getContent, isLocale } from "@/lib/content";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <main id="top">
      <Header content={content} locale={lang} />
      <Hero content={content} />
      <TelemetryStrip content={content} locale={lang} />
      <WorksStack content={content} />
      <ServicesList content={content} />
      <TechStack content={content} />
      <Background content={content} />
      <Contact content={content} />
    </main>
  );
}
