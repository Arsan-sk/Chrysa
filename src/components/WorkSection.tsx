import { ArrowUpRight } from 'lucide-react'
import { projects } from './siteData'

export function WorkSection() {
  return (
    <section id="work" className="work dark-section section-pad"><div className="work-header reveal"><p className="kicker light">Proof, not promises</p><h2>Things we've made<br /><span>possible.</span></h2><p>Selected systems and experiences, built as concepts, products and real-world platforms.</p></div><div className="project-stack">{projects.map((project, index) => <article className={`project-panel ${project.tone}`} key={project.name}><div className="project-visual"><div className="visual-window"><div className="window-bar"><i /><i /><i /></div><div className="visual-lines"><span /><span /><span /><span /></div><div className="visual-orb" /></div><span className="project-index">0{index + 1}</span></div><div className="project-info"><p>{project.kind}</p><h3>{project.name}</h3><span>{project.note}</span><a href="#contact" aria-label={`Discuss ${project.name}`}>Explore case <ArrowUpRight size={16} /></a></div></article>)}</div></section>
  )
}
