import { ArrowUpRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="site-footer dark-section">
      <div className="footer-main section-pad">
        <div><p className="kicker light">A connected practice</p><p className="footer-note">Digital systems for the next version of your business.</p></div>
        <a className="footer-contact" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
      </div>
      <div className="footer-line"><span>CHRYSA.</span><span>Today → Becoming</span><span>© 2026</span></div>
    </footer>
  )
}
