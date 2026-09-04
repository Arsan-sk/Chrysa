import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, MoveRight, Plus, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'Bonhomie', kind: 'Event registration platform', note: 'A calmer way to hold 3,000+ real registrations.', tone: 'coral' },
  { name: 'Share-Bite', kind: 'Social impact application', note: 'Making food-sharing easier to coordinate.', tone: 'lime' },
  { name: 'Tony', kind: 'Outbound voice agent', note: 'Turning a conversation into a useful next step.', tone: 'blue' },
]

const capabilities = [
  ['01', 'Build', 'Websites, web applications, SaaS and internal tools.'],
  ['02', 'Automate', 'Workflows, integrations, dashboards and process systems.'],
  ['03', 'Understand', 'AI integrations and experiences with a practical job to do.'],
  ['04', 'Evolve', 'Ongoing refinement, analytics, infrastructure and care.'],
]

function useRevealMotion() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('.reveal', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.reveal', start: 'top 88%', once: true },
      })

      gsap.to('.hero-mark', {
        rotate: 90,
        scale: 1.15,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      const transformation = gsap.timeline({
        scrollTrigger: { trigger: '.transform-section', start: 'top top', end: '+=150%', pin: true, scrub: 1 },
      })
      transformation
        .to('.transform-before', { opacity: 0, y: -30, duration: 0.28 })
        .to('.system-line', { strokeDashoffset: 0, duration: 0.55, stagger: 0.12 }, '<0.1')
        .to('.transform-after', { opacity: 1, y: 0, duration: 0.3 }, '-=0.16')
        .to('.system-node', { scale: 1, opacity: 1, stagger: 0.1, duration: 0.35 }, '<0.05')

      gsap.to('.process-line', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: { trigger: '.process', start: 'top 65%', end: 'bottom 75%', scrub: true },
      })

      gsap.utils.toArray<HTMLElement>('.project-panel').forEach((panel, index) => {
        gsap.from(panel, {
          y: 80,
          rotate: index % 2 ? 1.5 : -1.5,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 82%', once: true },
        })
      })
    }, root)

    return () => context.revert()
  }, [])

  return root
}

function ElasticSystem() {
  const [point, setPoint] = useState({ x: 50, y: 50 })
  const path = `M 8 50 Q ${point.x} ${point.y} 92 50`

  return (
    <div
      className="elastic-system"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        setPoint({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 })
      }}
      onPointerLeave={() => setPoint({ x: 50, y: 50 })}
      aria-label="Interactive connection line. Move across it to reshape the connection."
      role="img"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="elastic-shadow" d={path} />
        <path className="elastic-path" d={path} />
      </svg>
      <span className="elastic-node node-a">A</span>
      <span className="elastic-node node-b">B</span>
    </div>
  )
}

function App() {
  const root = useRevealMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div ref={root} className="site-shell">
      <div className="scroll-progress" />
      <header className={`site-nav ${menuOpen ? 'is-open' : ''}`}>
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="Chrysa home">CHRYSA<span>.</span></a>
        <nav className="desktop-links" aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#capabilities">Capabilities</a><a href="#approach">Approach</a><a href="#about">About</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a conversation <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a><a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="mobile-menu-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
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

        <section className="recognition section-pad">
          <div className="section-heading reveal"><p className="kicker">The familiar friction</p><h2>Your business already works.<br /><span>But it could work better.</span></h2></div>
          <div className="recognition-list">
            {['The same questions, answered again.', 'Work living in five disconnected places.', 'A good idea held back by manual work.'].map((item, index) => <div className="recognition-row reveal" key={item}><span>0{index + 1}</span><p>{item}</p><Plus size={19} /></div>)}
          </div>
        </section>

        <section id="possibility" className="transform-section dark-section">
          <div className="transform-inner">
            <div className="transform-copy"><p className="kicker light">From manual to meaningful</p><h2 className="transform-before">What if the pieces<br />started working together?</h2><h2 className="transform-after">A better business<br />is a connected one.</h2><p className="transform-caption">Move through the system. The line responds because connection should feel physical.</p></div>
            <div className="system-map" aria-hidden="true"><svg viewBox="0 0 500 320"><path className="system-line" d="M90 160 H410" /><path className="system-line" d="M250 160 V70" /><path className="system-line" d="M250 160 V250" /><circle className="system-node" cx="90" cy="160" r="18" /><circle className="system-node" cx="410" cy="160" r="18" /><circle className="system-node" cx="250" cy="70" r="18" /><circle className="system-node" cx="250" cy="250" r="18" /></svg><div className="map-label label-a">CUSTOMERS</div><div className="map-label label-b">GROWTH</div><div className="map-label label-c">DATA</div><div className="map-label label-d">OPERATIONS</div></div>
          </div>
        </section>

        <section className="elastic-section section-pad"><div className="elastic-copy reveal"><p className="kicker">A small proof of concept</p><h2>Connection has a shape.</h2><p>One line can become a system. That is the work: finding the relationship between what already exists, then making it useful.</p></div><ElasticSystem /></section>

        <section id="capabilities" className="capabilities section-pad"><div className="section-heading reveal"><p className="kicker">What we make possible</p><h2>Not more software.<br /><span>Better systems.</span></h2></div><div className="capability-list">{capabilities.map(([number, title, copy]) => <article className="capability-row reveal" key={title}><span className="capability-number">{number}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={20} /></article>)}</div></section>

        <section id="work" className="work dark-section section-pad"><div className="work-header reveal"><p className="kicker light">Proof, not promises</p><h2>Things we've made<br /><span>possible.</span></h2><p>Selected systems and experiences, built as concepts, products and real-world platforms.</p></div><div className="project-stack">{projects.map((project, index) => <article className={`project-panel ${project.tone}`} key={project.name}><div className="project-visual"><div className="visual-window"><div className="window-bar"><i /><i /><i /></div><div className="visual-lines"><span /><span /><span /><span /></div><div className="visual-orb" /></div><span className="project-index">0{index + 1}</span></div><div className="project-info"><p>{project.kind}</p><h3>{project.name}</h3><span>{project.note}</span><a href="#contact" aria-label={`Discuss ${project.name}`}>Explore case <ArrowUpRight size={16} /></a></div></article>)}</div></section>

        <section id="approach" className="process section-pad"><div className="process-intro reveal"><p className="kicker">How transformation happens</p><h2>Start with the business.<br /><span>Build from there.</span></h2></div><div className="process-track"><div className="process-line" />{['Discover', 'Define', 'Design', 'Build', 'Evolve'].map((step, index) => <div className="process-step reveal" key={step}><span>0{index + 1}</span><i /><h3>{step}</h3><p>{['Understand the real context.', 'Find the problem worth solving.', 'Shape the clearest experience.', 'Engineer it to work in the world.', 'Keep making it more capable.'][index]}</p></div>)}</div></section>

        <section id="about" className="about section-pad"><div className="about-mark reveal">C<span>→</span>Y</div><div className="about-copy reveal"><p className="kicker">The people behind the system</p><h2>Technology is built by people who pay attention.</h2><p>Chrysa is led by Shaikh Mohd Arsan, a systems architect focused on full-stack engineering, AI/ML and the product thinking that makes technology useful.</p><a className="text-link" href="#contact">Meet us in a conversation <MoveRight size={18} /></a></div></section>

        <section id="contact" className="final-cta dark-section section-pad"><p className="kicker light reveal">The next version starts here</p><h2 className="reveal">Let's build<br /><em>what's next.</em></h2><form className="contact-form reveal" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label>Name<input name="name" required autoComplete="name" /></label><label>What are you trying to improve, build or change?<textarea name="message" required rows={3} /></label><button className="large-link" type="submit">{submitted ? 'Message ready to send' : 'Start the conversation'} <ArrowUpRight size={23} /></button>{submitted && <p className="form-status" role="status">Thanks. Your note is ready for the next step.</p>}</form><div className="footer-line"><span>CHRYSA.</span><span>Today → Becoming</span><span>© 2026</span></div></section>
      </main>
    </div>
  )
}

export default App
