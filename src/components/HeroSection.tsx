import { MoveRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="hero section-pad">
      <div className="hero-copy">
        <p className="kicker">Digital systems for the next version of your business</p>
        <h1>What you are today <em>isn't</em> the limit.</h1>
        <p className="hero-support">We connect ideas, experiences and technology into something your business can become.</p>
        <a className="text-link" href="#possibility">See what could change <MoveRight size={18} /></a>
      </div>
      <div className="hero-figure" aria-hidden="true">
        <div className="hero-mark"><span /><span /><span /><span /></div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <span className="hero-figure-label">TODAY / BECOMING</span>
      </div>
      <div className="hero-footer"><span>01 — Encounter</span><span>Scroll to explore <MoveRight size={15} /></span></div>
    </section>
  )
}
