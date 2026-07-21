import { cn } from "@/lib/cn";

type KickerTone = "brass" | "laser" | "muted";

interface KickerProps {
  tone?: KickerTone;
  className?: string;
  children: React.ReactNode;
}

const toneClasses: Record<KickerTone, string> = {
  brass: "text-brass",
  laser: "text-laser",
  muted: "text-muted",
};

export function Kicker({ tone = "brass", className, children }: KickerProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-kicker",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
