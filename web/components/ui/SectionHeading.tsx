import { cn } from "@/lib/cn";
import { Kicker } from "@/components/ui/Kicker";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  /** 'lg' = section openers (services/contact), 'md' = inner blocks. */
  size?: "lg" | "md";
  align?: "start" | "center";
  kickerTone?: "brass" | "laser";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  size = "md",
  align = "start",
  kickerTone = "brass",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Kicker tone={kickerTone} className="mb-4">
        {kicker}
      </Kicker>
      <h2
        className={cn(
          "font-extrabold tracking-tight text-balance",
          size === "lg" ? "text-h2-lg" : "text-h2",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4.5 max-w-prose text-lead text-muted">{description}</p>
      )}
    </div>
  );
}
