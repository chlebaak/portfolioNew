import { cn } from "@/lib/utils";

/** Minimal keycap chip. */
export function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "border border-hairline px-1.5 py-0.5 text-[10px] leading-none text-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
