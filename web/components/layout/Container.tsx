import { cn } from "@/lib/cn";

interface ContainerProps {
  /** 'content' = 1160px (default), 'narrow' = 820px (process, FAQ). */
  width?: "content" | "narrow";
  className?: string;
  children: React.ReactNode;
}

export function Container({ width = "content", className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        width === "content" ? "max-w-content" : "max-w-narrow",
        className,
      )}
    >
      {children}
    </div>
  );
}
