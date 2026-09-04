import { useState } from 'react'
import { Plus } from 'lucide-react'

const questions = [
  ['What kind of businesses do you work with?', 'We work with owners, founders, organizations and growing teams who want a clearer digital experience or a more capable way of working.'],
  ['Do you improve existing systems or start from scratch?', 'Both. We can improve what already exists, connect disconnected tools, or build a new system when that is the clearest path.'],
  ['Can you integrate AI into an existing business?', 'Yes, when it has a practical job to do. We focus on useful AI experiences and workflows rather than adding AI for its own sake.'],
  ['Do you maintain systems after launch?', 'Yes. Refinement, analytics, hosting, infrastructure and ongoing care can remain part of the relationship.'],
  ["What if I don't know what technology I need?", 'That is a good place to start. Tell us what feels slow, unclear or difficult, and we will help define the right next question.'],
  ['How does a project begin?', 'With a conversation about your business, the friction you are seeing and what a better version could make possible.'],
]

export function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  return (
    <section className="faq section-pad"><div className="faq-heading reveal"><p className="kicker">A few useful answers</p><h2>Start with what<br /><span>you know.</span></h2></div><div className="faq-list">{questions.map(([question, answer], index) => { const isOpen = openQuestion === index; return <div className={`faq-item reveal ${isOpen ? 'is-open' : ''}`} key={question}><button className="faq-question" onClick={() => setOpenQuestion(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}><span>{question}</span><Plus size={19} /></button><div id={`faq-answer-${index}`} className="faq-answer" role="region"><p>{answer}</p></div></div> })}</div></section>
  )
}
