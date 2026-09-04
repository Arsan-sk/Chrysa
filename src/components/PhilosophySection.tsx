import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function PhilosophySection() {
  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 })
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 })
  const markX = useTransform(pointerX, [-1, 1], [-16, 16])
  const markY = useTransform(pointerY, [-1, 1], [-12, 12])

  return (
    <section className="philosophy dark-section section-pad" onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1); pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1) }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}><div className="philosophy-header"><p className="kicker light reveal">Why Chrysa</p><span className="philosophy-index">11 / 12</span></div><div className="philosophy-layout"><div className="philosophy-copy reveal"><h2>Your business does not need to become something else.</h2><p>It needs the right systems, experiences and technology to become what it is capable of becoming.</p></div><motion.div className="philosophy-visual reveal" style={{ x: markX, y: markY }}><div className="philosophy-orbit orbit-a" /><div className="philosophy-orbit orbit-b" /><motion.div className="philosophy-core" animate={{ rotate: [0, 90, 180] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}><span /><span /><span /><span /></motion.div><div className="philosophy-route"><span>Today</span><i>→</i><span>Becoming</span></div></motion.div></div></section>
  )
}
