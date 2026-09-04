import { MoveRight } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="about section-pad"><div className="about-principles reveal"><p className="kicker">The Chrysa way</p><h2>Make complexity<br /><span>useful.</span></h2><p>We look for the relationship between the parts, then build the system that lets them work together.</p><div className="principle-list"><div><span>01</span><b>See the whole business</b></div><div><span>02</span><b>Make the next step clearer</b></div><div><span>03</span><b>Leave it more capable</b></div></div></div><div className="about-copy reveal"><p className="kicker">The people behind the system</p><h2>Technology is built by people who pay attention.</h2><p>Chrysa is led by Shaikh Mohd Arsan, Founder and Systems Architect, with a systems-first approach across full-stack engineering, AI/ML and product thinking.</p><p className="about-cofounder"><strong>Imran</strong><span>Co-Founder</span></p><a className="text-link" href="#contact">Meet us in a conversation <MoveRight size={18} /></a></div></section>
  )
}
