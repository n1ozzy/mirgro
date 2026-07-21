import { cn } from "@/lib/cn";

interface ChipProps {
  className?: string;
  children: React.ReactNode;
}

/** Small neutral pill used for value/quality tags. */
export function Chip({ className, children }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-[10px] border border-text/10 bg-text/5 px-3.75 py-2.25 text-caption text-text-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
