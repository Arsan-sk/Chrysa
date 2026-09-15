import { useEffect, useRef } from 'react'
import { MoveRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Three balanced headline states.
   Each state has identical 2-line structure and length
   for consistent visual rhythm and smooth transitions.
   ───────────────────────────────────────── */
const headlineStates = [
  {
    lines: ['What you are today', "isn't the limit."],
    emphasisIndex: 1,
  },
  {
    lines: ['From what you are', 'to what you can become.'],
    emphasisIndex: 1,
  },
  {
    lines: ['Connected systems,', "built for what's next."],
    emphasisIndex: 1,
  },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const mm = gsap.matchMedia(section)

    mm.add(
      {
        isDesktop: '(min-width: 801px)',
        isMobile: '(max-width: 800px)',
      },
      (context) => {
        const { isMobile } = context.conditions as { isDesktop: boolean; isMobile: boolean }
        const scrollDistance = isMobile ? '+=120%' : '+=200%'

        /* ── Master Hero Scroll Timeline ── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: scrollDistance,
            pin: pin,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        // Initial state: hide state 1 & 2
        gsap.set('.hero-state-1', { opacity: 0, y: 24, pointerEvents: 'none' })
        gsap.set('.hero-state-2', { opacity: 0, y: 24, pointerEvents: 'none' })

        // Step 1: Fade out support text and CTA
        tl.to('.hero-intro-fade', {
          opacity: 0,
          y: -15,
          duration: 0.15,
          ease: 'power2.in',
        })

        // Step 2: Transition State 0 -> State 1
        tl.to('.hero-state-0', {
          opacity: 0,
          y: -24,
          duration: 0.25,
          ease: 'power2.inOut',
          pointerEvents: 'none',
        }, '+=0.05')
        tl.to('.hero-state-1', {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
          pointerEvents: 'auto',
        }, '-=0.1')

        // Hold State 1
        tl.to({}, { duration: 0.15 })

        // Step 3: Transition State 1 -> State 2
        tl.to('.hero-state-1', {
          opacity: 0,
          y: -24,
          duration: 0.25,
          ease: 'power2.inOut',
          pointerEvents: 'none',
        })
        tl.to('.hero-state-2', {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
          pointerEvents: 'auto',
        }, '-=0.1')

        // Hold State 2 before unpinning
        tl.to({}, { duration: 0.15 })

        // Continuous SVG mark rotation
        gsap.to('.hero-mark', {
          rotate: '+=180',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: scrollDistance,
            scrub: 1,
          },
        })

        // Orbit rotations
        gsap.to('.hero-orbit.orbit-one', {
          rotate: '+=30',
          scaleX: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: scrollDistance,
            scrub: 1.2,
          },
        })
        gsap.to('.hero-orbit.orbit-two', {
          rotate: '+=25',
          scaleX: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: scrollDistance,
            scrub: 1.2,
          },
        })
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={sectionRef} className="hero-scroll-container">
      <section ref={pinRef} className="hero section-pad">
        <div className="hero-copy">
          {/* Intro elements */}
          <div className="hero-kicker-wrapper">
            <p className="kicker">Digital systems for the next version of your business</p>
          </div>

          {/* Three headline states */}
          <div className="hero-headline-stage">
            {headlineStates.map((state, stateIndex) => (
              <div
                key={stateIndex}
                className={`hero-headline-state hero-state-${stateIndex}`}
                aria-hidden={stateIndex !== 0}
              >
                {state.lines.map((line, lineIndex) => (
                  <span
                    key={lineIndex}
                    className={`hero-headline-line ${stateIndex === 0 && lineIndex === 1 ? 'limit-line' : ''}`}
                  >
                    {lineIndex === state.emphasisIndex ? (
                      <em>{line}</em>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Support text and CTA */}
          <div className="hero-intro-fade">
            <p className="hero-support">
              We connect ideas, experiences and technology into something your business can become.
            </p>
            <a className="text-link" href="#possibility">
              See what could change <MoveRight size={18} />
            </a>
          </div>
        </div>

        <div className="hero-figure" aria-hidden="true">
          <div className="hero-mark">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="hero-figure-label">TODAY / BECOMING</span>
        </div>

        <div className="hero-footer">
          <span>01 — Encounter</span>
          <span>Scroll to explore <MoveRight size={15} /></span>
        </div>
      </section>
    </div>
  )
}
