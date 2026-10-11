"use client";

import { Command } from "cmdk";
import {
  ArrowDownToLine,
  Check,
  ClipboardCopy,
  Command as CommandIcon,
  FolderGit2,
  Globe,
  GraduationCap,
  Languages,
  Layers,
  Mail,
  RefreshCw,
  Type,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Kbd } from "@/components/ui/Kbd";
import { copyText } from "@/lib/clipboard";
import { cvHref, site } from "@/lib/data";
import { GITHUB_REFRESH_EVENT } from "@/lib/hooks/useGitHubStats";
import { playBlip } from "@/lib/sound";
import type { Locale, SiteContent } from "@/lib/content";
import { EASE } from "@/lib/utils";

const subscribeNever = () => () => {};
const getShortcutSnapshot = () =>
  /Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? "⌘K" : "Ctrl+K";
const getShortcutServerSnapshot = () => "⌘K";

/** Tiny external store for the sound preference (localStorage-backed). */
let soundPreference: boolean | null = null;
const soundListeners = new Set<() => void>();

function subscribeSound(listener: () => void) {
  soundListeners.add(listener);
  return () => {
    soundListeners.delete(listener);
  };
}

function getSoundSnapshot(): boolean {
  if (soundPreference === null) {
    soundPreference = window.localStorage.getItem("jf.sound") === "on";
  }
  return soundPreference;
}

function getSoundServerSnapshot(): boolean {
  return false;
}

function writeSoundPreference(next: boolean) {
  soundPreference = next;
  window.localStorage.setItem("jf.sound", next ? "on" : "off");
  for (const listener of soundListeners) listener();
}

type ConsoleContextValue = {
  open: () => void;
  soundOn: boolean;
  shortcutLabel: string;
};

const ConsoleContext = createContext<ConsoleContextValue | null>(null);

export function useConsole(): ConsoleContextValue {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error("useConsole must be used inside <ConsoleProvider>");
  }
  return context;
}

/**
 * Command console (⌘K / Ctrl+K / ~) built on cmdk — real actions only:
 * copy email, download CV, switch language, refresh GitHub telemetry,
 * sound toggle, section navigation and external links.
 */
export function ConsoleProvider({
  content,
  locale,
  children,
}: {
  content: SiteContent;
  locale: Locale;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(content.console.status.ready);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const reduce = useReducedMotion();
  const router = useRouter();
  const cmd = content.console;

  const soundOn = useSyncExternalStore(
    subscribeSound,
    getSoundSnapshot,
    getSoundServerSnapshot,
  );
  const shortcutLabel = useSyncExternalStore(
    subscribeNever,
    getShortcutSnapshot,
    getShortcutServerSnapshot,
  );

  // global shortcuts
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target !== null &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      const modifier = event.metaKey || event.ctrlKey;

      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
        return;
      }
      if (!modifier && !typing && (event.key === "~" || event.key === "`")) {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);

  const toggleSound = useCallback(() => {
    const next = !getSoundSnapshot();
    writeSoundPreference(next);
    if (next) playBlip(660);
    setStatus(next ? cmd.status.soundOn : cmd.status.soundOff);
  }, [cmd.status.soundOn, cmd.status.soundOff]);

  const handleCopyEmail = useCallback(async () => {
    const ok = await copyText(site.email);
    setCopiedEmail(ok);
    setPulseKey((key) => key + 1);
    setStatus(ok ? cmd.status.copied : cmd.status.copyFailed);
    if (ok && soundOn) playBlip();
  }, [cmd.status.copied, cmd.status.copyFailed, soundOn]);

  const handleDownloadCv = useCallback(() => {
    // TODO: drop the real CV into /public/cv.pdf — this already downloads it.
    const link = document.createElement("a");
    link.href = cvHref;
    link.download = "Jan-Fiala-CV.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setStatus(cmd.status.downloading);
    if (soundOn) playBlip();
  }, [cmd.status.downloading, soundOn]);

  const handleSwitchLanguage = useCallback(() => {
    setIsOpen(false);
    if (soundOn) playBlip();
    router.push(locale === "cs" ? "/en" : "/cs");
  }, [locale, router, soundOn]);

  const handleRefreshGithub = useCallback(() => {
    window.dispatchEvent(new CustomEvent(GITHUB_REFRESH_EVENT));
    setStatus(cmd.status.refreshed);
    if (soundOn) playBlip();
  }, [cmd.status.refreshed, soundOn]);

  const goTo = useCallback(
    (id: string) => {
      setIsOpen(false);
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
      });
    },
    [reduce],
  );

  const openExternal = useCallback((href: string) => {
    setIsOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const value = useMemo(
    () => ({ open, soundOn, shortcutLabel }),
    [open, soundOn, shortcutLabel],
  );

  const groupClassName =
    "text-[11px] font-medium uppercase tracking-[0.1em] text-muted/70 [font-stretch:115%] [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2";

  return (
    <ConsoleContext.Provider value={value}>
      {children}

      <Command.Dialog
        open={isOpen}
        onOpenChange={(next) => {
          setIsOpen(next);
          if (next) {
            setStatus(cmd.status.ready);
            setCopiedEmail(false);
          }
        }}
        label={cmd.title}
        loop
        overlayClassName="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out"
        contentClassName="fixed left-1/2 top-[16%] z-50 w-[min(92vw,560px)] -translate-x-1/2 overflow-hidden border border-ink/[0.10] bg-panel shadow-[0_24px_80px_-24px_rgba(10,10,10,0.28)] data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out"
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <CommandIcon
            aria-hidden
            strokeWidth={1.5}
            className="size-4 shrink-0 text-accent"
          />
          <Command.Input
            placeholder={cmd.placeholder}
            className="h-12 w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted/70"
          />
          <Kbd>ESC</Kbd>
        </div>

        <Command.List className="max-h-[320px] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-[13px] text-muted">
            {cmd.empty}
          </Command.Empty>

          <Command.Group heading={cmd.groups.actions} className={groupClassName}>
            <ConsoleItem
              icon={<ClipboardCopy strokeWidth={1.5} />}
              label={cmd.commands.copyEmail.label}
              hint={cmd.commands.copyEmail.hint}
              pulseKey={pulseKey}
              trailing={
                copiedEmail ? (
                  <Check aria-hidden className="size-3.5 text-accent" strokeWidth={2} />
                ) : null
              }
              onSelect={handleCopyEmail}
            />
            <ConsoleItem
              icon={<ArrowDownToLine strokeWidth={1.5} />}
              label={cmd.commands.downloadCv.label}
              hint={cmd.commands.downloadCv.hint}
              onSelect={handleDownloadCv}
            />
            <ConsoleItem
              icon={<Languages strokeWidth={1.5} />}
              label={cmd.commands.switchLanguage.label}
              hint={cmd.commands.switchLanguage.hint}
              onSelect={handleSwitchLanguage}
            />
            <ConsoleItem
              icon={<RefreshCw strokeWidth={1.5} />}
              label={cmd.commands.refreshGithub.label}
              hint={cmd.commands.refreshGithub.hint}
              onSelect={handleRefreshGithub}
            />
            <ConsoleItem
              icon={
                soundOn ? (
                  <Volume2 strokeWidth={1.5} />
                ) : (
                  <VolumeX strokeWidth={1.5} />
                )
              }
              label={cmd.commands.sound.label}
              hint={cmd.commands.sound.hint}
              trailing={
                <span className={soundOn ? "text-accent" : "text-muted"}>
                  {soundOn ? "[ON]" : "[OFF]"}
                </span>
              }
              onSelect={toggleSound}
            />
          </Command.Group>

          <Command.Group
            heading={cmd.groups.navigation}
            className={groupClassName}
          >
            <ConsoleItem
              icon={<Layers strokeWidth={1.5} />}
              label={cmd.commands.projects.label}
              hint={cmd.commands.projects.hint}
              onSelect={() => goTo("projects")}
            />
            <ConsoleItem
              icon={<Type strokeWidth={1.5} />}
              label={cmd.commands.stack.label}
              hint={cmd.commands.stack.hint}
              onSelect={() => goTo("stack")}
            />
            <ConsoleItem
              icon={<GraduationCap strokeWidth={1.5} />}
              label={cmd.commands.background.label}
              hint={cmd.commands.background.hint}
              onSelect={() => goTo("background")}
            />
            <ConsoleItem
              icon={<Mail strokeWidth={1.5} />}
              label={cmd.commands.contact.label}
              hint={cmd.commands.contact.hint}
              onSelect={() => goTo("contact")}
            />
          </Command.Group>

          <Command.Group heading={cmd.groups.links} className={groupClassName}>
            <ConsoleItem
              icon={<FolderGit2 strokeWidth={1.5} />}
              label={cmd.commands.github.label}
              hint={cmd.commands.github.hint}
              onSelect={() => openExternal("https://github.com/chlebaak")}
            />
            <ConsoleItem
              icon={<Globe strokeWidth={1.5} />}
              label={cmd.commands.linkedin.label}
              hint={cmd.commands.linkedin.hint}
              onSelect={() =>
                openExternal("https://www.linkedin.com/in/janfiala331")
              }
            />
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between gap-4 border-t border-hairline px-4 py-2.5 text-[11px] text-muted">
          <span aria-live="polite" className="truncate">
            {status}
          </span>
          <span className="hidden shrink-0 text-muted/60 sm:inline">
            {cmd.hint}
          </span>
        </div>
      </Command.Dialog>
    </ConsoleContext.Provider>
  );
}

type ConsoleItemProps = {
  icon: React.ReactNode;
  label: string;
  hint: string;
  onSelect: () => void;
  trailing?: React.ReactNode;
  /** Changing this remounts the row with a subtle haptic scale-in. */
  pulseKey?: number;
};

function ConsoleItem({
  icon,
  label,
  hint,
  onSelect,
  trailing,
  pulseKey,
}: ConsoleItemProps) {
  return (
    <Command.Item
      value={`${label} ${hint}`}
      onSelect={onSelect}
      className="group cursor-pointer px-3 py-2.5 text-[13px] text-muted data-[selected=true]:bg-ink data-[selected=true]:text-white"
    >
      <motion.div
        key={pulseKey ?? "static"}
        initial={{ scale: pulseKey ? 0.96 : 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="flex items-center gap-3"
      >
        <span className="shrink-0 text-muted group-data-[selected=true]:text-white">
          {icon}
        </span>
        <span className="shrink-0 font-medium group-data-[selected=true]:text-white">
          {label}
        </span>
        <span className="hidden truncate text-[11px] text-muted/70 group-data-[selected=true]:text-white/60 sm:inline">
          {hint}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          {trailing}
          <span className="text-muted/60 opacity-0 transition-opacity duration-150 group-data-[selected=true]:text-white/60 group-data-[selected=true]:opacity-100">
            ↵
          </span>
        </span>
      </motion.div>
    </Command.Item>
  );
}
