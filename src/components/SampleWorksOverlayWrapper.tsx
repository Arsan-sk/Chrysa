import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SampleWorksOverlayProps = {
  sampleWorks: ReactNode
  work: ReactNode
}

export function SampleWorksOverlayWrapper({ sampleWorks, work }: SampleWorksOverlayProps) {
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
        const { isMobile } = context.conditions as { isDesktop: boolean; isMobile: boolean }

        const slideEl = container.querySelector<HTMLElement>('.swo-slide')
        if (!slideEl) return

        if (isMobile) {
          // On mobile: natural sequential layout — no pinning, no transforms
          gsap.set(slideEl, { clearProps: 'all' })
          return
        }

        // Desktop: Pin the container while WorkSection slides up and covers SampleWorks
        gsap.set(slideEl, { yPercent: 100 })

        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(slideEl, { yPercent: 100 - self.progress * 100 })
          },
        })
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={containerRef} className="swo-container">
      {/* Sample Works — pinned background layer */}
      <div className="swo-bg">
        {sampleWorks}
      </div>
      {/* Work Section — slides up over Sample Works */}
      <div className="swo-slide">
        {work}
      </div>
    </div>
  )
}
