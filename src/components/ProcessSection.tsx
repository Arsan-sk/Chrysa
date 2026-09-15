import { useState, useEffect } from "react";
import { processSteps } from "./siteData";

const stageDetails = [
  [
    "A useful starting point",
    "We listen for the friction beneath the request: the work that is slow, unclear or harder than it needs to be.",
    "Context map",
  ],
  [
    "The problem worth solving",
    "We turn the situation into a clear opportunity, with a shared definition of what better should feel like.",
    "Problem brief",
  ],
  [
    "A shape people can use",
    "We make the experience visible early, so decisions stay grounded in the people and business it needs to serve.",
    "Experience model",
  ],
  [
    "A system that works",
    "We engineer the product, workflow or integration in the real conditions where it has to earn its place.",
    "Working system",
  ],
  [
    "Better through contact",
    "We test, measure and polish the edges that only become visible when the system meets real use.",
    "Refinement loop",
  ],
  [
    "More capable over time",
    "We leave the business with a system that can be maintained, understood and improved.",
    "Next version",
  ],
] as const;

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = processSteps.length;

  // Uninterrupted continuous 2s loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2000);

    return () => clearInterval(timer);
  }, [total]);

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="approach" className="process-scroll">
      <div className="process-pin">
        <div className="process-layout section-pad">
          {/* Left Anchor Thesis */}
          <div className="process-anchor">
            <p className="kicker">How transformation happens</p>
            <h2>
              Start with the business.
              <br />
              <span>Build from there.</span>
            </h2>
            <p className="process-lede">
              A useful question becomes a working system through a sequence of
              deliberate decisions.
            </p>
            <div className="process-guide">
              <span className="guide-arrow">→</span>
              <div>
                <b>Method sequence</b>
                <small>Auto-advancing every 2 seconds.</small>
              </div>
            </div>
            <div className="process-counter">
              <span className="process-counter-current">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <i />
              <span>06</span>
            </div>
          </div>

          {/* Right Card Stage */}
          <div className="process-stage-column">
            <div className="process-card-stage" aria-live="polite">
              {processSteps.map(([step], index) => {
                const [title, description, label] = stageDetails[index];
                const isActive = index === activeIndex;
                const isPrev =
                  index === activeIndex - 1 ||
                  (activeIndex === 0 && index === total - 1);

                return (
                  <article
                    className={`process-card process-card-${index + 1} ${
                      isActive
                        ? "is-active"
                        : isPrev
                        ? "is-prev"
                        : "is-hidden"
                    }`}
                    data-process-card={index}
                    key={step}
                    aria-hidden={!isActive}
                  >
                    <div className="process-card-meta">
                      <span>0{index + 1} / 06</span>
                      <span>{label}</span>
                    </div>
                    <div className="process-card-body">
                      <p className="process-card-step">{step}</p>
                      <p className="kicker">{title}</p>
                      <p>{description}</p>
                    </div>
                    <div className="process-card-footer">
                      <span>CHRYSA / WORKING METHOD</span>
                      <span>0{index + 1}</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Carousel Dots with signal color (#e84d37) matching 'Build from there.' */}
            <div className="process-dots-bar" aria-label="Process card pagination">
              {processSteps.map(([step], idx) => (
                <button
                  key={`dot-${step}`}
                  type="button"
                  className={`process-dot ${idx === activeIndex ? "is-active" : ""}`}
                  onClick={() => goToIndex(idx)}
                  aria-label={`Jump to step 0${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
