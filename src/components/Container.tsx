import { cn } from "@/lib/utils";

/** Editorial page container — A24-style side gutters. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1600px] px-5 md:px-10", className)}
    >
      {children}
    </div>
  );
}
