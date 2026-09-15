import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react'
import { sampleWorks } from './sampleWorks.data'

export function SampleWorksCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({})
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const total = sampleWorks.length

  // Track viewport width for responsive 3D coverflow geometry
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goToIndex = (index: number) => {
    setActiveIndex((index + total) % total)
  }

  // Automatic continuous loop (4.5s)
  useEffect(() => {
    if (isPaused || isDragging) return

    const timer = setInterval(() => {
      goToNext()
    }, 4500)

    return () => clearInterval(timer)
  }, [isPaused, isDragging, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return

      if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrev, goToNext])

  // Mouse wheel interaction (debounced)
  const wheelLockRef = useRef(false)
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) > 40) {
      if (wheelLockRef.current) return
      wheelLockRef.current = true

      if (e.deltaX > 25 || e.deltaY > 25) {
        goToNext()
      } else if (e.deltaX < -25 || e.deltaY < -25) {
        goToPrev()
      }

      setTimeout(() => {
        wheelLockRef.current = false
      }, 350)
    }
  }

  // Touch and Drag handling with pan-y protection
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const diff = currentX - startX
    // Allow slight drag response
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset < -40) {
      goToNext()
    } else if (dragOffset > 40) {
      goToPrev()
    }
    setDragOffset(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setDragOffset(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setDragOffset(e.clientX - startX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset < -50) {
      goToNext()
    } else if (dragOffset > 50) {
      goToPrev()
    }
    setDragOffset(0)
  }

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }))
  }

  // Calculate position styles for coverflow layout with responsive spacing
  const getCardStyle = (index: number) => {
    let diff = index - activeIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const isCenter = diff === 0
    const absDiff = Math.abs(diff)

    // Responsive step: 230px on mobile vs 320px on desktop
    const stepSize = isMobile ? 220 : 320
    const translateX = diff * stepSize + (isDragging ? dragOffset * 0.4 : 0)
    const translateZ = isCenter ? 0 : (isMobile ? -100 : -140) * absDiff
    const rotateY = isCenter ? 0 : diff > 0 ? (isMobile ? -12 : -16) : (isMobile ? 12 : 16)
    const scale = isCenter ? 1 : Math.max(isMobile ? 0.76 : 0.72, 1 - absDiff * (isMobile ? 0.12 : 0.14))
    const opacity = absDiff > 2 ? 0 : isCenter ? 1 : Math.max(isMobile ? 0.3 : 0.35, 1 - absDiff * 0.35)
    const zIndex = 20 - absDiff

    return {
      transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      pointerEvents: isCenter ? ('auto' as const) : absDiff <= 1 ? ('auto' as const) : ('none' as const),
      visibility: (absDiff > 2 ? 'hidden' : 'visible') as 'hidden' | 'visible',
    }
  }

  return (
    <div
      ref={containerRef}
      className="sample-works-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        handleMouseUp()
      }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      tabIndex={0}
      aria-label="Sample works showcase carousel with continuous auto-loop. Use arrow buttons or swipe to navigate."
    >
      {/* Side Arrow Navigation Buttons */}
      <button
        type="button"
        className="sample-side-arrow sample-side-prev"
        onClick={goToPrev}
        aria-label="Previous sample work"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        className="sample-side-arrow sample-side-next"
        onClick={goToNext}
        aria-label="Next sample work"
      >
        <ChevronRight size={20} />
      </button>

      {/* 3D Coverflow Stage */}
      <div className="sample-stage-3d">
        {sampleWorks.map((work, index) => {
          const isCenter = index === activeIndex
          const style = getCardStyle(index)
          const hasImageError = imageErrorMap[work.id]

          return (
            <div
              key={work.id}
              className={`sample-card ${isCenter ? 'is-active' : ''}`}
              style={style}
              onClick={() => {
                if (!isCenter) goToIndex(index)
              }}
              role="group"
              aria-label={`${work.title} - ${work.category}`}
            >
              <div className="sample-card-frame">
                {/* Browser-like window title bar */}
                <div className="sample-card-bar">
                  <div className="sample-card-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="sample-card-url">
                    {work.href ? work.href.replace(/^https?:\/\//, '') : `${work.id}.chrysa.systems`}
                  </span>
                  <span className={`sample-badge sample-badge-${work.status}`}>
                    {work.status}
                  </span>
                </div>

                {/* Card Media Preview */}
                <div className="sample-card-media">
                  {!hasImageError ? (
                    <img
                      src={work.image}
                      alt={`${work.title} UI preview`}
                      loading="lazy"
                      onError={() => handleImageError(work.id)}
                      className="sample-card-img"
                    />
                  ) : null}

                  {/* Geometric Mockup Fallback */}
                  {hasImageError && (
                    <div
                      className="sample-mockup-fallback"
                      style={{
                        background: `linear-gradient(135deg, #1b1d1c 0%, #252826 100%)`,
                        borderBottom: `2px solid ${work.accentColor || '#e84d37'}`,
                      }}
                    >
                      <div className="mockup-decor-grid">
                        <div className="mockup-line" />
                        <div className="mockup-line" />
                        <div className="mockup-line" />
                      </div>
                      <div className="mockup-center-icon">
                        <Sparkles size={28} color={work.accentColor || '#e84d37'} />
                        <span className="mockup-tag">{work.category}</span>
                        <h4 className="mockup-title">{work.title}</h4>
                      </div>
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="sample-card-overlay" />
                </div>

                {/* Card Bottom Meta */}
                <div className="sample-card-content">
                  <div className="sample-card-top-row">
                    <span className="sample-card-category">{work.category}</span>
                    {work.stats && <span className="sample-card-stat">{work.stats}</span>}
                  </div>
                  <h3 className="sample-card-heading">{work.title}</h3>
                  <p className="sample-card-desc">{work.description}</p>

                  <div className="sample-card-footer">
                    {work.href ? (
                      <a
                        href={work.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sample-live-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Launch Interface <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="sample-concept-label">System Architecture Sample</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Controls Bar */}
      <div className="sample-nav-bar">
        <div className="sample-nav-counter">
          <span className="sample-nav-current">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="sample-nav-sep">/</span>
          <span className="sample-nav-total">{String(total).padStart(2, '0')}</span>
        </div>

        {/* Indicator dots */}
        <div className="sample-nav-dots">
          {sampleWorks.map((work, idx) => (
            <button
              key={work.id}
              className={`sample-dot ${idx === activeIndex ? 'is-active' : ''}`}
              onClick={() => goToIndex(idx)}
              aria-label={`Jump to ${work.title}`}
            />
          ))}
        </div>

        {/* Prev / Next Action buttons */}
        <div className="sample-nav-actions">
          <button
            type="button"
            className="sample-nav-btn"
            onClick={goToPrev}
            aria-label="Previous sample work"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            className="sample-nav-btn"
            onClick={goToNext}
            aria-label="Next sample work"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
