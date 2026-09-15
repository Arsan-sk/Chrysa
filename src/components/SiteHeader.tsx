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

  // Escape key listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className={`site-nav ${menuOpen ? 'is-open' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Chrysa home">
        CHRYSA<span>.</span>
      </a>
      <nav className="desktop-links" aria-label="Primary navigation">
        <a href="#possibility">Transformation</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#sample-works">Products</a>
        <a href="#work">Case Studies</a>
        <a href="#approach">Approach</a>
        <a href="#about">About</a>
      </nav>
      <a className="nav-cta" href="#contact">
        Start a conversation <ArrowUpRight size={15} />
      </a>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
        <a href="#possibility" onClick={closeMenu}>Transformation</a>
        <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
        <a href="#sample-works" onClick={closeMenu}>Products</a>
        <a href="#work" onClick={closeMenu}>Case Studies</a>
        <a href="#approach" onClick={closeMenu}>Approach</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a className="mobile-menu-cta" href="#contact" onClick={closeMenu}>
          Start a conversation <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  )
}
