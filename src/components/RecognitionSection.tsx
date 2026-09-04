import { Plus } from 'lucide-react'

const frictionPoints = ['The same questions, answered again.', 'Work living in five disconnected places.', 'A good idea held back by manual work.']

export function RecognitionSection() {
  return (
    <section className="recognition section-pad">
      <div className="section-heading reveal"><p className="kicker">The familiar friction</p><h2>Your business already works.<br /><span>But it could work better.</span></h2></div>
      <div className="recognition-list">
        {frictionPoints.map((item, index) => <div className="recognition-row reveal" key={item}><span>0{index + 1}</span><p>{item}</p><Plus size={19} /></div>)}
      </div>
    </section>
  )
}
