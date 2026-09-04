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
  return (
    <section id="approach" className="process-scroll">
      <div className="process-pin">
        <div className="process-layout section-pad">
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
              <span className="guide-arrow">↓</span>
              <div>
                <b>Keep scrolling</b>
                <small>Move through the method, one step at a time.</small>
              </div>
            </div>
            <div className="process-counter">
              <span className="process-counter-current">01</span>
              <i />
              <span>06</span>
            </div>
          </div>
          <div className="process-card-stage" aria-live="polite">
            {processSteps.map(([step, copy], index) => {
              const [title, description, label] = stageDetails[index];
              return (
                <article
                  className={`process-card process-card-${index + 1}`}
                  data-process-card={index}
                  key={step}
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
        </div>
      </div>
    </section>
  );
}
