"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FolderGit2,
  Globe,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import type { SiteContent } from "@/lib/content";
import { EASE } from "@/lib/utils";

type SheetSource = "hero" | "tile";

type ProjectSheetContextValue = {
  openId: string | null;
  open: (id: string, source?: SheetSource) => void;
  close: () => void;
};

const ProjectSheetContext = createContext<ProjectSheetContextValue | null>(null);

export function useProjectSheet(): ProjectSheetContextValue {
  const context = useContext(ProjectSheetContext);
  if (!context) {
    throw new Error("useProjectSheet must be used inside <ProjectSheetProvider>");
  }
  return context;
}

/**
 * Case study sheet — full-screen overlay with a shared-element (layoutId) morph
 * from the hero or a works tile, chained next-project navigation, Escape/back
 * closing and a body scroll lock.
 */
export function ProjectSheetProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  const works = content.works;
  const sheet = content.sheet;

  const [openId, setOpenId] = useState<string | null>(null);
  // which element should morph into the sheet cover (only the directly opened one)
  const [morph, setMorph] = useState<{ id: string; source: SheetSource } | null>(
    null,
  );
  // gallery image shown enlarged — kept together with its project id so a
  // project switch (next / back / history) closes it without an effect
  const [lightbox, setLightbox] = useState<{
    projectId: string;
    index: number;
  } | null>(null);
  const reduce = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((id: string, source: SheetSource = "tile") => {
    setMorph({ id, source });
    setOpenId(id);
    window.history.pushState({ sheetId: id }, "");
  }, []);

  const close = useCallback(() => {
    setMorph(null);
    if ((window.history.state as { sheetId?: string } | null)?.sheetId) {
      window.history.back();
    } else {
      setOpenId(null);
    }
  }, []);

  const index = openId ? works.findIndex((work) => work.id === openId) : -1;
  const work = index >= 0 ? works[index] : null;
  const nextWork = work ? works[(index + 1) % works.length] : null;
  const lightboxIndex =
    lightbox && work && lightbox.projectId === work.id ? lightbox.index : null;
  const lightboxOpen = lightboxIndex !== null;
  const lightboxImage =
    work && lightboxIndex !== null
      ? work.gallery[lightboxIndex]?.image
      : undefined;

  // keep React state in sync with history (back button / swipe)
  useEffect(() => {
    const onPopState = () => {
      const state = window.history.state as { sheetId?: string } | null;
      setMorph(null);
      setOpenId(state?.sheetId ?? null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Escape closes (lightbox first, then the sheet); arrows page the lightbox
  useEffect(() => {
    if (!openId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) setLightbox(null);
        else close();
        return;
      }
      if (lightboxIndex !== null && work) {
        const count = work.gallery.length;
        if (count > 1 && event.key === "ArrowRight") {
          setLightbox({
            projectId: work.id,
            index: (lightboxIndex + 1) % count,
          });
        } else if (count > 1 && event.key === "ArrowLeft") {
          setLightbox({
            projectId: work.id,
            index: (lightboxIndex - 1 + count) % count,
          });
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openId, close, lightboxIndex, work]);

  // focus moves into the lightbox when it opens
  useEffect(() => {
    if (lightboxOpen) lightboxCloseRef.current?.focus();
  }, [lightboxOpen]);

  // body scroll lock (scrollbar gutter is reserved globally, so no shift)
  useEffect(() => {
    if (!openId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [openId]);

  const showNext = useCallback(() => {
    if (!work) return;
    const next = works[(index + 1) % works.length];
    setMorph(null); // chained navigation crossfades instead of morphing
    setOpenId(next.id);
    window.history.replaceState({ sheetId: next.id }, "");
  }, [work, index, works]);

  // scroll the sheet back to the top when the project changes
  useEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 });
  }, [openId]);

  const value = useMemo(
    () => ({ openId, open, close }),
    [openId, open, close],
  );

  const morphLayoutId =
    !reduce && work && morph?.id === work.id
      ? morph.source === "hero"
        ? `cover-hero-${work.id}`
        : `cover-${work.id}`
      : undefined;

  const sectionLabel =
    "text-[13px] uppercase tracking-[0.08em] text-muted [font-stretch:115%]";

  return (
    <ProjectSheetContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {work ? (
          <motion.div
            key="project-sheet"
            ref={sheetRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.25, ease: EASE }}
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-canvas"
          >
            <div className="sticky top-0 z-20 border-b border-hairline bg-canvas/80 backdrop-blur-sm">
              <Container className="flex h-14 items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={close}
                  aria-label={sheet.back}
                  className="ix-text flex cursor-pointer items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] [font-stretch:115%]"
                >
                  <ArrowLeft aria-hidden className="size-4" strokeWidth={1.75} />
                  <span className="hidden sm:inline">{sheet.back}</span>
                </button>
                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap text-[13px] tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(works.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={showNext}
                    className="ix-text group flex cursor-pointer items-center gap-2 text-[13px] font-medium uppercase tracking-[0.08em] [font-stretch:115%]"
                  >
                    {sheet.next}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={sheet.closeAria}
                    className="ix-invert flex size-8 cursor-pointer items-center justify-center text-muted"
                  >
                    <X aria-hidden className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
              </Container>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0.1 : 0.22, ease: EASE }}
              >
                <Container className="pb-24 pt-8 md:pt-12">
                  <div className="relative">
                    <motion.div
                      layoutId={morphLayoutId}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="ix-image relative h-[56vh] min-h-[380px] w-full md:h-[64vh]"
                      style={{ background: work.gradient }}
                    >
                      {work.image && (
                        <Image
                          src={work.image}
                          alt=""
                          fill
                          quality={85}
                          sizes="(min-width: 1680px) 1520px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)"
                          className="object-cover object-top"
                        />
                      )}
                    </motion.div>
                    {/* White scrim keeps the ink overlay readable over dark covers */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%]"
                      style={{
                        background:
                          "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.97) 27%, rgba(255,255,255,0.86) 50%, rgba(255,255,255,0.3) 74%, rgba(255,255,255,0) 100%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                      <Eyebrow className="text-ink/60">{sheet.caseStudy}</Eyebrow>
                      <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                        {work.title}
                        <sup className="ml-[0.12em] align-super text-[0.3em] font-normal tracking-normal text-ink/60">
                          {work.year}
                        </sup>
                      </h2>
                      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink/70">
                        {work.tagline}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-6 sm:grid-cols-4">
                    <div>
                      <dt className={sectionLabel}>{sheet.year}</dt>
                      <dd className="mt-2 text-sm font-medium">{work.year}</dd>
                    </div>
                    <div>
                      <dt className={sectionLabel}>{sheet.type}</dt>
                      <dd className="mt-2 text-sm font-medium">{work.type}</dd>
                    </div>
                    <div>
                      <dt className={sectionLabel}>{sheet.category}</dt>
                      <dd className="mt-2 text-sm font-medium">{work.category}</dd>
                    </div>
                    <div>
                      <dt className={sectionLabel}>{sheet.status}</dt>
                      <dd className="mt-2 flex items-center gap-2 text-sm font-medium">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-accent"
                        />
                        {work.status}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-12 grid gap-8 md:grid-cols-12">
                    <h3 className={`${sectionLabel} md:col-span-3`}>
                      {sheet.brief}
                    </h3>
                    <p className="max-w-[62ch] text-[15px] leading-[1.9] text-ink/80 md:col-span-9">
                      {work.brief}
                    </p>
                  </div>

                  <div className="mt-10 grid gap-8 md:grid-cols-12">
                    <h3 className={`${sectionLabel} md:col-span-3`}>
                      {sheet.solution}
                    </h3>
                    <p className="max-w-[62ch] text-[15px] leading-[1.9] text-ink/80 md:col-span-9">
                      {work.solution}
                    </p>
                  </div>

                  <div className="mt-10 grid gap-8 md:grid-cols-12">
                    <h3 className={`${sectionLabel} md:col-span-3`}>
                      {sheet.learned}
                    </h3>
                    <p className="max-w-[62ch] text-[15px] leading-[1.9] text-ink/80 md:col-span-9">
                      {work.learned}
                    </p>
                  </div>

                  <div className="mt-12 grid gap-8 md:grid-cols-12">
                    <h3 className={`${sectionLabel} md:col-span-3`}>
                      {sheet.stack}
                    </h3>
                    <ul className="flex flex-wrap gap-2 md:col-span-9">
                      {work.stack.map((item) => (
                        <li
                          key={item}
                          className="border border-hairline px-3.5 py-1.5 text-[13px] text-ink/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3">
                    {work.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="ix-dim group flex items-center gap-2 bg-ink px-5 py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-white [font-stretch:115%]"
                      >
                        {link.label === "GitHub" ? (
                          <FolderGit2
                            aria-hidden
                            className="size-4"
                            strokeWidth={1.75}
                          />
                        ) : (
                          <Globe
                            aria-hidden
                            className="size-4"
                            strokeWidth={1.75}
                          />
                        )}
                        {link.label}
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 opacity-60 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.75}
                        />
                      </a>
                    ))}
                  </div>

                  <div className="mt-12 grid gap-4 md:grid-cols-2">
                    {work.gallery.map((item, galleryIndex) => (
                      <div
                        key={galleryIndex}
                        className="relative overflow-hidden"
                      >
                        {item.image ? (
                          <button
                            type="button"
                            onClick={() =>
                              setLightbox({
                                projectId: work.id,
                                index: galleryIndex,
                              })
                            }
                            aria-label={`${sheet.zoom} — ${work.title} ${galleryIndex + 1}`}
                            className="ix-image relative block aspect-[16/10] w-full cursor-zoom-in"
                            style={{ background: item.gradient }}
                          >
                            <Image
                              src={item.image}
                              alt={`${work.title} — ${galleryIndex + 1}`}
                              fill
                              quality={85}
                              sizes="(min-width: 1680px) 752px, (min-width: 768px) calc((100vw - 96px) / 2), calc(100vw - 40px)"
                              className="object-cover"
                            />
                          </button>
                        ) : (
                          <div
                            className="ix-image relative aspect-[16/10]"
                            style={{ background: item.gradient }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={showNext}
                    className="ix-text group mt-14 flex w-full cursor-pointer items-center justify-between border-t border-hairline pt-8 text-left"
                  >
                    <span>
                      <span className={sectionLabel}>{sheet.nextProject}</span>
                      <span className="mt-2 block text-2xl font-medium tracking-[-0.03em] md:text-4xl">
                        {nextWork?.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-6 text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </button>
                </Container>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Gallery lightbox — a sibling of the sheet so no transformed ancestor
          traps the fixed overlay; Esc/arrows are handled by the sheet listener */}
      <AnimatePresence>
        {work && lightboxIndex !== null && lightboxImage ? (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.2, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={`${work.title} — ${lightboxIndex + 1} / ${work.gallery.length}`}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-canvas/95 p-4 backdrop-blur-sm md:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.1 : 0.22, ease: EASE }}
                onClick={(event) => event.stopPropagation()}
                className="relative"
              >
                <Image
                  src={lightboxImage}
                  alt={`${work.title} — ${lightboxIndex + 1}`}
                  width={3420}
                  height={2146}
                  quality={85}
                  sizes="100vw"
                  className="h-auto max-h-[86vh] w-auto max-w-[92vw]"
                />
              </motion.div>
            </AnimatePresence>

            <button
              ref={lightboxCloseRef}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightbox(null);
              }}
              aria-label={sheet.closeAria}
              className="ix-invert absolute right-4 top-4 flex size-10 cursor-pointer items-center justify-center text-muted md:right-6 md:top-6"
            >
              <X aria-hidden className="size-5" strokeWidth={1.5} />
            </button>

            {work.gallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setLightbox({
                      projectId: work.id,
                      index:
                        (lightboxIndex - 1 + work.gallery.length) %
                        work.gallery.length,
                    });
                  }}
                  aria-label={sheet.prevImage}
                  className="ix-invert absolute left-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center text-muted md:left-6"
                >
                  <ArrowLeft aria-hidden className="size-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setLightbox({
                      projectId: work.id,
                      index: (lightboxIndex + 1) % work.gallery.length,
                    });
                  }}
                  aria-label={sheet.nextImage}
                  className="ix-invert absolute right-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center text-muted md:right-6"
                >
                  <ArrowRight
                    aria-hidden
                    className="size-5"
                    strokeWidth={1.5}
                  />
                </button>
              </>
            ) : null}

            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[13px] tabular-nums text-muted">
              {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {String(work.gallery.length).padStart(2, "0")}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ProjectSheetContext.Provider>
  );
}
