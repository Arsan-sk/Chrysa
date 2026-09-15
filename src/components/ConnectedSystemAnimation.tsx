import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Database, GitFork, Layout, Radio, Sparkles, Layers, Activity } from 'lucide-react'

export interface SystemModule {
  id: string
  code: string
  title: string
  detail: string
  Icon: React.ElementType
  scattered: { x: number; y: number; rotate: number; scale: number }
  assembled: { x: number; y: number; rotate: number; scale: number }
  assembledSvg: { x: number; y: number }
}

export const modules: SystemModule[] = [
  {
    id: 'data',
    code: '01',
    title: 'Data Core',
    detail: 'Unified single source',
    Icon: Database,
    scattered: { x: -175, y: -150, rotate: -15, scale: 0.85 },
    assembled: { x: -140, y: -110, rotate: 0, scale: 1 },
    assembledSvg: { x: 160, y: 140 },
  },
  {
    id: 'logic',
    code: '02',
    title: 'Logic Engine',
    detail: 'Autonomous rules & flow',
    Icon: GitFork,
    scattered: { x: 175, y: -150, rotate: 18, scale: 0.85 },
    assembled: { x: 140, y: -110, rotate: 0, scale: 1 },
    assembledSvg: { x: 440, y: 140 },
  },
  {
    id: 'interface',
    code: '03',
    title: 'Interfaces',
    detail: 'Clean real-time UI',
    Icon: Layout,
    scattered: { x: 220, y: 10, rotate: 12, scale: 0.85 },
    assembled: { x: 180, y: 10, rotate: 0, scale: 1 },
    assembledSvg: { x: 480, y: 260 },
  },
  {
    id: 'signals',
    code: '04',
    title: 'Signals & API',
    detail: 'Webhooks & pipelines',
    Icon: Radio,
    scattered: { x: 165, y: 165, rotate: -12, scale: 0.85 },
    assembled: { x: 130, y: 125, rotate: 0, scale: 1 },
    assembledSvg: { x: 430, y: 375 },
  },
  {
    id: 'intelligence',
    code: '05',
    title: 'Intelligence',
    detail: 'Semantic AI & metrics',
    Icon: Sparkles,
    scattered: { x: -165, y: 165, rotate: 14, scale: 0.85 },
    assembled: { x: -130, y: 125, rotate: 0, scale: 1 },
    assembledSvg: { x: 170, y: 375 },
  },
  {
    id: 'operations',
    code: '06',
    title: 'Operations',
    detail: 'Automated actions',
    Icon: Layers,
    scattered: { x: -220, y: 10, rotate: -10, scale: 0.85 },
    assembled: { x: -180, y: 10, rotate: 0, scale: 1 },
    assembledSvg: { x: 120, y: 260 },
  },
]

export function ConnectedSystemAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const mm = gsap.matchMedia(container)

    mm.add(
      {
        isDesktop: '(min-width: 801px)',
        isMobile: '(max-width: 800px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isMobile, reduceMotion } = context.conditions as {
          isDesktop: boolean
          isMobile: boolean
          reduceMotion: boolean
        }

        if (reduceMotion) {
          if (!isMobile) {
            modules.forEach((mod) => {
              const el = container.querySelector(`.connected-mod-${mod.id}`)
              if (el) {
                gsap.set(el, {
                  x: mod.assembled.x,
                  y: mod.assembled.y,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                })
              }
            })
            gsap.set('.connected-line-path', { strokeDashoffset: 0, opacity: 0.95 })
          } else {
            gsap.set('.mobile-module-card', { opacity: 1, y: 0 })
          }
          gsap.set('.connected-core-status', { opacity: 1, y: 0 })
          return
        }

        // Desktop initial setup
        if (!isMobile) {
          modules.forEach((mod) => {
            const el = container.querySelector(`.connected-mod-${mod.id}`)
            if (el) {
              gsap.set(el, {
                x: mod.scattered.x,
                y: mod.scattered.y,
                rotate: mod.scattered.rotate,
                scale: mod.scattered.scale,
                opacity: 0.45,
              })
            }
          })
          gsap.set('.connected-line-path', { strokeDashoffset: 260, opacity: 0 })
          gsap.set('.connected-core-status', { opacity: 0, y: 4 })
        } else {
          // Mobile initial setup: initial dimmed state
          gsap.set('.mobile-module-card', { opacity: 0.45, y: 12 })
          gsap.set('.connected-core-status', { opacity: 0, y: 4 })
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={containerRef} className="connected-system-canvas" aria-label="Interactive Connected System Constellation">
      {/* ── Desktop 2D Constellation ── */}
      <div className="connected-desktop-constellation">
        {/* Background SVG Grid & Connection Lines */}
        <svg
          className="connected-system-svg"
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGrad" x1="300" y1="250" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e84d37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e84d37" stopOpacity="0.25" />
            </linearGradient>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e84d37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e84d37" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient radial glow behind core */}
          <circle cx="300" cy="250" r="160" fill="url(#coreGlow)" />

          {/* Structural orbit guidelines */}
          <circle cx="300" cy="250" r="110" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 4" />
          <circle cx="300" cy="250" r="180" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 6" />

          {/* Dynamic connection lines from Center (300, 250) to each module */}
          {modules.map((mod) => (
            <g key={`line-group-${mod.id}`}>
              <line
                x1="300"
                y1="250"
                x2={mod.assembledSvg.x}
                y2={mod.assembledSvg.y}
                className="connected-line-path"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="260"
                strokeDashoffset="260"
              />
              <circle
                cx={mod.assembledSvg.x}
                cy={mod.assembledSvg.y}
                r="3"
                fill="#e84d37"
                opacity="0.85"
              />
            </g>
          ))}
        </svg>

        {/* Central Chrysa Core */}
        <div className="connected-core">
          <div className="connected-core-mark">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="connected-core-meta">
            <span className="connected-core-title">CHRYSA CORE</span>
            <span className="connected-core-status">SYSTEM CONVERGED</span>
          </div>
          <div className="connected-core-orbit" />
        </div>

        {/* 6 Modular Cards */}
        <div className="connected-modules-stage">
          {modules.map((mod) => {
            const Icon = mod.Icon
            return (
              <div
                key={mod.id}
                className={`connected-module-card connected-mod-${mod.id}`}
              >
                <div className="connected-module-header">
                  <span className="connected-module-code">{mod.code}</span>
                  <span className="connected-module-icon">
                    <Icon size={14} />
                  </span>
                </div>
                <div className="connected-module-body">
                  <span className="connected-module-title">{mod.title}</span>
                  <span className="connected-module-detail">{mod.detail}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Mobile Redesigned System View ── */}
      <div className="connected-mobile-system">
        {/* Central Core Header */}
        <div className="connected-mobile-core-card">
          <div className="connected-mobile-core-emblem">
            <div className="connected-core-mark">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="connected-mobile-orbit-ring" />
          </div>
          <div className="connected-mobile-core-info">
            <div className="connected-mobile-core-top">
              <span className="connected-mobile-brand">CHRYSA CORE</span>
              <span className="connected-mobile-live-badge">
                <span className="pulse-dot" /> LIVE CONVERGED
              </span>
            </div>
            <p className="connected-mobile-core-desc">
              All 6 organizational modules operating in unified synchrony.
            </p>
          </div>
        </div>

        {/* Connection pipeline banner */}
        <div className="connected-mobile-conduit-bar">
          <Activity size={12} className="conduit-pulse-icon" />
          <span>REAL-TIME DATA PIPELINES ACTIVE</span>
        </div>

        {/* 6 Connected Modules Grid */}
        <div className="connected-mobile-grid">
          {modules.map((mod) => {
            const Icon = mod.Icon
            return (
              <div
                key={mod.id}
                className={`mobile-module-card mobile-mod-${mod.id}`}
              >
                <div className="mobile-module-top">
                  <span className="mobile-module-code">{mod.code}</span>
                  <span className="mobile-module-icon">
                    <Icon size={15} />
                  </span>
                </div>
                <h4 className="mobile-module-title">{mod.title}</h4>
                <p className="mobile-module-detail">{mod.detail}</p>
                <div className="mobile-module-status">
                  <span className="status-dot" /> ACTIVE
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

