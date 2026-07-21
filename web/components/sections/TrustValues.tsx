import { values } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";

const REVEAL_STAGGER_MS = 80;

export function TrustValues() {
  return (
    <section className="relative px-section-x pt-[clamp(20px,3vw,40px)] pb-[clamp(44px,5vw,68px)]">
      <Container>
        {/* Keeps the heading outline gapless (H1 → H2 → card H3s). */}
        <h2 className="sr-only">Co nas wyróżnia</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * REVEAL_STAGGER_MS} className="h-full">
              <div className="h-full rounded-card border border-text/11 bg-surface px-5 py-4.5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brass/40 sm:py-5.5">
                {/* Below sm the icon sits inline with the title — four tall
                    stacked cards made the section a scroll wall. */}
                <div className="flex items-center gap-3.5 sm:block">
                  <IconTile icon={value.icon} className="shrink-0 sm:mb-4.5" />
                  <h3 className="text-lg font-bold sm:mb-2">{value.title}</h3>
                </div>
                <p className="mt-2.5 text-ui text-muted sm:mt-0">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
