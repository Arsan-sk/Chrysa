import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutSection } from "./components/AboutSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ContactSection } from "./components/ContactSection";
import { ElasticSection } from "./components/ElasticSection";
import { FaqSection } from "./components/FaqSection";
import { HeroSection } from "./components/HeroSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ProcessSection } from "./components/ProcessSection";
import { RecognitionSection } from "./components/RecognitionSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { TransformationSection } from "./components/TransformationSection";
import { WorkSection } from "./components/WorkSection";

gsap.registerPlugin(ScrollTrigger);

function useRevealMotion() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processMedia = gsap.matchMedia();
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.to(".hero-mark", {
        rotate: 90,
        scale: 1.15,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      const transformation = gsap.timeline({
        scrollTrigger: {
          trigger: ".transform-section",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 2,
        },
      });
      transformation
        .to(".transform-before", { opacity: 0, y: -30, duration: 0.28 })
        .to(
          ".flow-manual .flow-card",
          { opacity: 0.35, x: -18, stagger: 0.1, duration: 0.35 },
          "<0.1",
        )
        .to(".flow-bridge-line", { scaleX: 1, duration: 0.45 }, "<0.05")
        .to(
          ".flow-bridge i",
          { scale: 1, opacity: 1, stagger: 0.1, duration: 0.25 },
          "<0.08",
        )
        .to(".flow-system", { opacity: 1, x: 0, duration: 0.4 }, "<0.1")
        .to(".transform-after", { opacity: 1, y: 0, duration: 0.3 }, "-=0.16")
        .to(".flow-output", { opacity: 1, y: 0, duration: 0.35 }, "<0.05");

      const processCards = gsap.utils.toArray<HTMLElement>(
        "[data-process-card]",
      );
      const processCounter = document.querySelector<HTMLElement>(
        ".process-counter-current",
      );
      processMedia.add("(min-width: 801px)", () => {
        const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-scroll",
          start: "top top",
          end: "bottom bottom",
          pin: ".process-pin",
          scrub: 2,
          onUpdate: (trigger) => {
            if (processCounter)
              processCounter.textContent = String(
                Math.min(
                  processCards.length,
                  Math.floor(trigger.progress * processCards.length) + 1,
                ),
              ).padStart(2, "0");
          },
        },
        });
        processCards.forEach((card, index) => {
        const incomingDirection = index % 2 === 0 ? 64 : -64;
        processTimeline
          .fromTo(
            card,
            {
              autoAlpha: 0,
              x: incomingDirection,
              y: 34,
              rotate: index % 2 === 0 ? 3 : -3,
              scale: 0.92,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.45,
              ease: "power4.out",
            },
          )
          .to(card, { autoAlpha: 1, duration: 0.18 })
          .to(
            card,
            {
              autoAlpha: 0,
              x: -incomingDirection * 0.65,
              y: -24,
              rotate: index % 2 === 0 ? -2 : 2,
              scale: 0.96,
              duration: 0.32,
              ease: "power4.in",
            },
            index < processCards.length - 1 ? "+=.25" : "+=.45",
          );
        });
        return () => processTimeline.kill();
      });

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
      processMedia.revert();
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
        <RecognitionSection />
        <TransformationSection />
        <ElasticSection />
        <CapabilitiesSection />
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
