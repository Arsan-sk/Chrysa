import { ArrowUpRight } from 'lucide-react'
import { capabilities } from './siteData'

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="capabilities section-pad"><div className="section-heading reveal"><p className="kicker">What we make possible</p><h2>We build what helps.<br /><span>Then make it better.</span></h2><p className="section-lede">From a clearer customer experience to the system behind it, the work follows the problem rather than the technology.</p></div><div className="capability-list">{capabilities.map(([number, title, copy, scope]) => <article className="capability-row reveal" key={title}><span className="capability-number">{number}</span><div><h3>{title}</h3><span className="capability-scope">{scope}</span></div><p>{copy}</p><ArrowUpRight size={20} /></article>)}</div></section>
  )
}
