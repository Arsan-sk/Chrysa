import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type LayeredRevealProps = {
  foreground: ReactNode
  background: ReactNode
}

export function LayeredRevealWrapper({ foreground, background }: LayeredRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const mm = gsap.matchMedia(container)

    mm.add(
      {
        isDesktop: '(min-width: 801px)',
        isMobile: '(max-width: 800px)',
      },
      (context) => {
        const fg = container.querySelector<HTMLElement>('.layered-fg')
        if (!fg) return

        const { isMobile } = context.conditions as { isDesktop: boolean; isMobile: boolean }
        const scrollDistance = isMobile ? '+=150%' : '+=240%'

        // Master Scroll-driven timeline:
        // 1. Curtain lift of RecognitionSection
        // 2. Scroll-based transformation of TransformationSection (left copy + right connected system)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: scrollDistance,
            pin: true,
            scrub: 1.2,
          },
        })

        // Initial state of transformation after-headline
        gsap.set('.transform-after', { opacity: 0, y: 30 })

        // Phase 1: Curtain lift (Recognition lifts upward)
        tl.to(fg, {
          yPercent: -100,
          ease: 'power1.inOut',
          duration: 0.8,
        })

        // Phase 2: Short settle on TransformationSection in its initial before state
        tl.to({}, { duration: 0.15 })

        // Phase 3: Left side text switch on scroll
        tl.to('.transform-before', {
          opacity: 0,
          y: -30,
          duration: 0.45,
          ease: 'power2.in',
        })
        tl.to('.transform-after', {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        }, '<0.15')

        // Phase 4: Right side Connected System animation on scroll
        if (!isMobile) {
          // Desktop 2D Constellation Assembly
          tl.to(
            '.connected-mod-data',
            { x: -140, y: -110, rotate: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '<0.05'
          )
          tl.to(
            '.connected-mod-logic',
            { x: 140, y: -110, rotate: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '<'
          )
          tl.to(
            '.connected-mod-interface',
            { x: 180, y: 10, rotate: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '<'
          )
          tl.to(
            '.connected-mod-signals',
            { x: 130, y: 125, rotate: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '<'
          )
          tl.to(
            '.connected-mod-intelligence',
            { x: -130, y: 125, rotate: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '<'
          )
          tl.to(
            '.connected-mod-operations',
            { x: -180, y: 10, rotate: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
            '<'
          )

          // Draw SVG Connection lines
          tl.to(
            '.connected-line-path',
            {
              strokeDashoffset: 0,
              opacity: 0.95,
              stagger: 0.04,
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '<0.1'
          )

          // Illuminate Core & convergence status
          tl.to(
            '.connected-core',
            {
              scale: 1.08,
              borderColor: 'var(--signal)',
              boxShadow: '0 0 45px rgba(232, 77, 55, 0.45)',
              duration: 0.35,
              ease: 'power2.out',
            },
            '<0.1'
          )
          tl.to(
            '.connected-core-status',
            {
              opacity: 1,
              y: 0,
              duration: 0.25,
            },
            '<0.1'
          )
        } else {
          // Mobile System View Activation
          tl.to(
            '.connected-mobile-core-card',
            {
              borderColor: 'rgba(232, 77, 55, 0.5)',
              boxShadow: '0 0 30px rgba(232, 77, 55, 0.25)',
              duration: 0.35,
              ease: 'power2.out',
            },
            '<0.05'
          )
          tl.to(
            '.mobile-module-card',
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.45,
              ease: 'power2.out',
            },
            '<0.1'
          )
        }

        // Phase 5: Hold assembled system before releasing pin
        tl.to({}, { duration: 0.3 })
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={containerRef} className="layered-reveal">
      <div className="layered-bg">
        {background}
      </div>
      <div className="layered-fg">
        {foreground}
      </div>
    </div>
  )
}
