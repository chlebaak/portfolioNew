import { cn } from "@/lib/utils";

/** Uppercase expanded label — the A24 "eyebrow". */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[13px] font-medium uppercase tracking-[0.08em] text-muted [font-stretch:115%]",
        className,
      )}
    >
      {children}
    </p>
  );
}
