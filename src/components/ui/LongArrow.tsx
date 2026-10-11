import { cn } from "@/lib/utils";

/** The A24 long arrow (their exact SVG polygon). */
export function LongArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 55 20"
      aria-hidden
      fill="currentColor"
      className={cn("h-[14px] w-10", className)}
    >
      <polygon points="43.3,0 55,10 43.3,20 42.4,19.1 52.2,10.7 0,10.7 0,9.3 52.2,9.3 42.4,0.9 43.3,0" />
    </svg>
  );
}
