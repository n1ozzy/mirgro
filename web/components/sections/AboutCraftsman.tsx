import { User } from "lucide-react";
import { about, companyInfo } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/Chip";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

export function AboutCraftsman() {
  return (
    <Section id="ofirmie" tone="alt">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(26px,3.2vw,48px)]">
        {/* The striped portrait placeholder reads as a broken page on phones —
            show it only where it holds the two-column layout together. */}
        <Reveal className="hidden lg:block">
          <div className="grid aspect-4/5 max-h-[64vh] place-items-center overflow-hidden rounded-media border border-text/10 bg-[repeating-linear-gradient(45deg,var(--color-ink),var(--color-ink)_14px,var(--color-surface)_14px,var(--color-surface)_28px)]">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 grid size-15 place-items-center rounded-full border border-dashed border-muted/40 text-muted">
                <User aria-hidden size={26} strokeWidth={1.4} />
              </div>
              <p className="font-mono text-[11.5px] leading-relaxed tracking-[0.14em] whitespace-pre-line text-muted">
                {about.portraitPlaceholder}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Kicker className="mb-4">{about.kicker}</Kicker>
          <h2 className="text-h2 font-extrabold tracking-tight">{about.title}</h2>
          <blockquote className="mt-5.5 border-l-3 border-brass pl-4.5 text-[clamp(16px,1.3vw,19px)] leading-snug font-medium text-text-2 italic">
            {about.quote}
          </blockquote>
          <p className="mt-5.5 text-base leading-relaxed text-muted">{about.description}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {about.chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
          <p className="mt-7 font-mono text-sm text-brass">— {companyInfo.name}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
