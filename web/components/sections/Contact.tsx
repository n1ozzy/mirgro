import { Mail, MessageCircle, Phone } from "lucide-react";
import { companyInfo, companyPhoneHref, contactSection } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCard } from "@/components/sections/ContactCard";
import { ContactForm } from "@/components/sections/ContactForm";

/** Strips formatting so the number can be used in wa.me links. */
function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function Contact() {
  return (
    <Section id="kontakt" tone="alt">
      <Container>
        <Reveal className="mb-11 max-w-160">
          <SectionHeading
            size="lg"
            kicker={contactSection.kicker}
            title={contactSection.title}
            description={contactSection.description}
          />
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(20px,3vw,40px)]">
          <Reveal>
            <div className="rounded-panel border border-text/12 bg-surface p-[clamp(20px,2.4vw,28px)]">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-3.5">
              <ContactCard
                href={companyPhoneHref}
                icon={Phone}
                label="ZADZWOŃ"
                value={companyInfo.phone}
              />
              <ContactCard
                href={`mailto:${companyInfo.email}`}
                icon={Mail}
                label="NAPISZ"
                value={companyInfo.email}
              />
              <ContactCard
                href={whatsappHref(companyInfo.phone)}
                icon={MessageCircle}
                label="WHATSAPP"
                value="Napisz na WhatsApp"
                tone="laser"
                external
              />
              <div className="rounded-[14px] border border-text/12 bg-surface p-5">
                <span className="mb-2 block font-mono text-xs tracking-tag text-muted">
                  OBSZAR DZIAŁANIA
                </span>
                <span className="block text-body text-text-2">
                  {companyInfo.region} i okolice
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
