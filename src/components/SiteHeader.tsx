import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type SiteHeaderProps = { onNavigate?: () => void }

export function SiteHeader({ onNavigate }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 72) {
        setHidden(false)
      } else if (!menuOpen && Math.abs(currentScrollY - lastScrollY.current) > 6) {
        setHidden(currentScrollY > lastScrollY.current)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])
  const closeMenu = () => {
    setMenuOpen(false)
    onNavigate?.()
  }

  return (
    <header className={`site-nav ${menuOpen ? 'is-open' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Chrysa home">CHRYSA<span>.</span></a>
      <nav className="desktop-links" aria-label="Primary navigation">
        <a href="#work">Work</a><a href="#capabilities">Capabilities</a><a href="#approach">Approach</a><a href="#about">About</a>
      </nav>
      <a className="nav-cta" href="#contact">Start a conversation <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
        <a href="#work" onClick={closeMenu}>Work</a><a href="#capabilities" onClick={closeMenu}>Capabilities</a><a href="#approach" onClick={closeMenu}>Approach</a><a href="#about" onClick={closeMenu}>About</a>
        <a className="mobile-menu-cta" href="#contact" onClick={closeMenu}>Start a conversation <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  )
}
