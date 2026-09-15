import { SampleWorksCarousel } from './SampleWorksCarousel'

export function SampleWorksSection() {
  return (
    <section id="sample-works" className="sample-works-section">
      <div className="sample-works-header reveal">
        <div className="sample-header-left">
          <p className="kicker">04 — Interfaces & Applications</p>
          <h2>
            Live digital products<br />
            <span>engineered for scale.</span>
          </h2>
        </div>
        <div className="sample-header-right">
          <p className="sample-header-desc">
            Explore active deployments and architectural prototypes designed to replace fragmented tools with cohesive, high-velocity digital experiences.
          </p>
        </div>
      </div>

      <div className="sample-works-body">
        <SampleWorksCarousel />
      </div>
    </section>
  )
}
