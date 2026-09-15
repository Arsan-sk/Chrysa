import { ConnectedSystemAnimation } from './ConnectedSystemAnimation'

export function TransformationSection() {
  return (
    <section id="possibility" className="transform-section dark-section">
      <div className="transform-inner">
        <div className="transform-copy">
          <p className="kicker light">From manual to meaningful</p>
          <div className="transform-headlines-wrapper">
            <h2 className="transform-before">
              What if the pieces<br />started working together?
            </h2>
            <h2 className="transform-after">
              A better business<br />is a connected one.
            </h2>
          </div>
          {/* <p className="transform-caption mt-10 pl-50">
            Move through the system. The line responds because connection should feel physical.
          </p> */}
        </div>

        <div className="transform-visual">
          <ConnectedSystemAnimation />
        </div>
      </div>
    </section>
  )
}
