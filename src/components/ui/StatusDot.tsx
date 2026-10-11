import { cn } from "@/lib/utils";

type Tone = "accent" | "ink" | "muted";

const tones: Record<Tone, string> = {
  accent: "bg-accent",
  ink: "bg-ink",
  muted: "bg-muted",
};

/** Status dot with a soft expanding ping. */
export function StatusDot({
  tone = "accent",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-1.5", className)}>
      <span
        className={cn(
          "absolute inline-flex size-full animate-status-ping rounded-full",
          tones[tone],
        )}
      />
      <span
        className={cn("relative inline-flex size-full rounded-full", tones[tone])}
      />
    </span>
  );
}
