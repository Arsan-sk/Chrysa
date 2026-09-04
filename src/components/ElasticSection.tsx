import { useState } from 'react'

export function ElasticSection() {
  const [point, setPoint] = useState({ x: 50, y: 50 })
  const path = `M 8 50 Q ${point.x} ${point.y} 92 50`

  return (
    <section className="elastic-section section-pad">
      <div className="elastic-copy reveal"><p className="kicker">A small proof of concept</p><h2>Connection has a shape.</h2><p>One line can become a system. That is the work: finding the relationship between what already exists, then making it useful.</p></div>
      <div className="elastic-system" onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); setPoint({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 }) }} onPointerLeave={() => setPoint({ x: 50, y: 50 })} aria-label="Interactive connection line. Move across it to reshape the connection." role="img">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="elastic-shadow" d={path} /><path className="elastic-path" d={path} /></svg><span className="elastic-node node-a">A</span><span className="elastic-node node-b">B</span>
      </div>
    </section>
  )
}
