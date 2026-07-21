"use client";

import { ArrowRight } from "lucide-react";
import { laserBenefits, laserSection } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LaserVisual } from "@/components/sections/LaserVisual";
import { useServiceRequest } from "@/components/providers/ServiceRequestProvider";

export function Laser() {
  const { requestService } = useServiceRequest();

  return (
    <Section id="laser" tone="laser" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-[70%_60%_at_20%_15%] from-laser/9 to-transparent to-60%"
      />
      <Container className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-[clamp(26px,3.2vw,48px)]">
        <Reveal>
          <span className="inline-flex items-center gap-2.25 rounded-pill border border-laser/30 bg-laser/8 px-3.75 py-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-laser">
            <span className="size-1.5 rounded-full bg-laser shadow-[0_0_8px] shadow-laser" />
            {laserSection.pill}
          </span>
          <h2 className="mt-5.5 text-h2-lg font-extrabold tracking-tight">
            {laserSection.title}
          </h2>
          <p className="mt-4.5 max-w-[52ch] text-lead text-muted">
            {laserSection.description}
          </p>
          <div className="mt-7.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
            {laserBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-[14px] border border-laser/16 bg-laser/4 p-4.5 sm:p-5"
                >
                  {/* Below sm the icon sits inline with the title — stacked
                      cards were twice as tall and read as an empty wall. */}
                  <div className="flex items-center gap-3 sm:block">
                    <Icon aria-hidden size={22} strokeWidth={1.6} className="shrink-0 text-laser sm:mb-3" />
                    <h3 className="text-base font-bold sm:mb-1.5">{benefit.title}</h3>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted sm:mt-0">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
          <Button
            variant="laser"
            icon={ArrowRight}
            className="mt-7.5 w-full sm:w-auto"
            onClick={() => requestService("laser")}
          >
            {laserSection.cta}
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <LaserVisual />
        </Reveal>
      </Container>
    </Section>
  );
}
