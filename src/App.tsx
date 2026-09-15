import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutSection } from "./components/AboutSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ContactSection } from "./components/ContactSection";
import { ElasticSection } from "./components/ElasticSection";
import { FaqSection } from "./components/FaqSection";
import { HeroSection } from "./components/HeroSection";
import { LayeredRevealWrapper } from "./components/LayeredRevealWrapper";
import { PhilosophySection } from "./components/PhilosophySection";
import { ProcessSection } from "./components/ProcessSection";
import { RecognitionSection } from "./components/RecognitionSection";
import { SampleWorksSection } from "./components/SampleWorksSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { TransformationSection } from "./components/TransformationSection";
import { WorkSection } from "./components/WorkSection";

gsap.registerPlugin(ScrollTrigger);

function useRevealMotion() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      // General reveal animation for headings and blocks
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      // Work section project panels entry
      gsap.utils
        .toArray<HTMLElement>(".project-panel")
        .forEach((panel, index) => {
          gsap.from(panel, {
            y: 80,
            rotate: index % 2 ? 1.5 : -1.5,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 82%", once: true },
          });
        });
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return root;
}

function App() {
  const root = useRevealMotion();

  return (
    <div ref={root} className="site-shell">
      <div className="scroll-progress" />
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <LayeredRevealWrapper
          foreground={<RecognitionSection />}
          background={<TransformationSection />}
        />
        <ElasticSection />
        <CapabilitiesSection />
        <SampleWorksSection />
        <WorkSection />
        <ProcessSection />
        <FaqSection />
        <AboutSection />
        <PhilosophySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
