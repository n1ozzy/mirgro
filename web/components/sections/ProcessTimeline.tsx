import { cn } from "@/lib/cn";
import { processSection, processSteps } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const REVEAL_STAGGER_MS = 80;

export function ProcessTimeline() {
  return (
    <Section>
      <Container width="narrow">
        <Reveal className="mb-13">
          <SectionHeading align="center" {...processSection} />
        </Reveal>
        <div className="relative pl-2">
          <div
            aria-hidden
            className="absolute inset-y-2.5 left-[29px] w-0.5 bg-linear-to-b from-brass to-brass/15"
          />
          <ol>
            {processSteps.map((step, index) => {
              const isLast = index === processSteps.length - 1;
              // <li> must be a direct child of <ol> (screen readers announce
              // "step x of 4") — the Reveal wrapper animates inside it.
              return (
                <li key={step.index} className={cn("relative", !isLast && "pb-8.5")}>
                  <Reveal delay={index * REVEAL_STAGGER_MS} className="flex gap-6">
                    <div
                      className={cn(
                        "z-1 grid size-11 shrink-0 place-items-center rounded-full border-2 border-brass font-mono text-body font-bold",
                        isLast ? "bg-brass text-bg" : "bg-bg text-brass",
                      )}
                    >
                      {String(step.index).padStart(2, "0")}
                    </div>
                    <div className="pt-1">
                      <h3 className="mb-1.5 text-[19px] font-bold">{step.title}</h3>
                      <p className="text-body text-muted">{step.description}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
