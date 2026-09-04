import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="final-cta dark-section section-pad"><p className="kicker light reveal">The next version starts here</p><h2 className="reveal">Let's build<br /><em>what's next.</em></h2><form className="contact-form reveal" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label>Name<input name="name" required autoComplete="name" /></label><label>What are you trying to improve, build or change?<textarea name="message" required rows={3} /></label><label>What best describes the next step?<select name="intent" defaultValue="not-sure"><option value="new">Build something new</option><option value="existing">Improve an existing experience</option><option value="automation">Automate a process</option><option value="ai">Introduce AI</option><option value="growth">Improve customer acquisition</option><option value="internal">Build an internal system</option><option value="not-sure">I'm not sure yet</option></select></label><button className="large-link" type="submit">{submitted ? 'Message ready to send' : 'Start the conversation'} <ArrowUpRight size={23} /></button>{submitted && <p className="form-status" role="status">Thanks. Your note is ready for the next step.</p>}</form></section>
  )
}
