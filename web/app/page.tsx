import { ServiceRequestProvider } from "@/components/providers/ServiceRequestProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/nav/ScrollProgress";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { TrustValues } from "@/components/sections/TrustValues";
import { Services } from "@/components/sections/Services";
import { Filmstrip } from "@/components/sections/Filmstrip";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Gallery } from "@/components/sections/Gallery";
import { RenovationScrollStory } from "@/components/sections/RenovationScrollStory";
import { Laser } from "@/components/sections/Laser";
import { AboutCraftsman } from "@/components/sections/AboutCraftsman";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MobileStickyCta } from "@/components/sections/MobileStickyCta";

export default function Home() {
  return (
    <ServiceRequestProvider>
      <SmoothScroll />
      <ScrollProgress />
      <SiteHeader />
      {/* tabIndex allows the skip link / anchor nav to move real focus here */}
      <main id="tresc" tabIndex={-1}>
        <Hero />
        <TrustValues />
        <Services />
        <Filmstrip />
        <Section id="realizacje">
          <Container>
            <FeaturedProject />
            <BeforeAfter />
            <Gallery />
          </Container>
        </Section>
        <RenovationScrollStory />
        <Laser />
        <AboutCraftsman />
        <ProcessTimeline />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </ServiceRequestProvider>
  );
}
