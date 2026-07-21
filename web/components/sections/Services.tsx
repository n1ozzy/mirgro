"use client";

import { useState } from "react";
import { services } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCatalog } from "@/components/sections/ServiceCatalog";
import { ServicePanel } from "@/components/sections/ServicePanel";
import { ServiceTabs } from "@/components/sections/ServiceTabs";

const HEADING = {
  kicker: "Zakres usług",
  title: "Szeroki zakres prac, jeden standard jakości",
  description:
    "Wybierz obszar, aby zobaczyć szczegóły. Do każdego zlecenia podchodzimy indywidualnie i z tą samą starannością.",
} as const;

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <Section id="uslugi" tone="alt" className="border-b border-text/5">
      <Container>
        <Reveal className="max-w-160">
          <SectionHeading size="lg" {...HEADING} />
        </Reveal>
        <Reveal className="mt-11">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-[clamp(16px,2vw,28px)]">
            <ServiceTabs
              services={services}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
            <ServicePanel service={activeService} />
          </div>
        </Reveal>
        <Reveal className="mt-18">
          <ServiceCatalog />
        </Reveal>
      </Container>
    </Section>
  );
}
