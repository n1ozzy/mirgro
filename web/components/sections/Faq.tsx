"use client";

import { useState } from "react";
import { faqSection, faqs } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="relative px-section-x pt-[clamp(40px,5vw,60px)] pb-section-y">
      <Container width="narrow">
        <Reveal className="mb-11">
          <SectionHeading align="center" {...faqSection} />
        </Reveal>
        <Reveal>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => {
              const isOpen = faq.id === openId;
              const panelId = `faq-panel-${faq.id}`;
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-[14px] border border-text/11 bg-surface"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5.5 py-5 text-left text-text"
                  >
                    <span className="text-base leading-normal font-semibold">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-7 shrink-0 place-items-center rounded-lg border border-brass/30 bg-brass/10 text-lg leading-none font-bold text-brass"
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div id={panelId} className="px-5.5 pb-5.5 text-body leading-relaxed text-muted">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
