import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { MessageCircle, Plus } from 'lucide-react'
import { FAQ, WA_NUMBER } from '../data'
import Reveal from './Reveal'

export default function Faq() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(0)

  return (
    <section id="intrebari" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <h2 className="max-w-[12ch] text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">Întrebări frecvente</h2>
        <p className="mt-5 max-w-[34ch] leading-relaxed text-espresso">
          Nu găsești răspunsul aici? Scrie-ne și îți răspundem pe loc.
        </p>
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-sm mt-7"
        >
          <MessageCircle size={16} strokeWidth={2} aria-hidden /> Scrie pe WhatsApp
        </a>
      </Reveal>

      <Reveal delay={120} className="lg:col-span-8">
        <div className="card divide-y divide-amber-900/10 overflow-hidden">
          {FAQ.map((f, i) => {
            const on = open === i
            return (
              <div key={f.q}>
                <h3 className="font-sans text-base font-normal">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-parchment/50 sm:px-8 sm:py-6"
                  >
                    <span className="font-serif text-2xl leading-snug sm:text-[1.7rem]">{f.q}</span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        on ? 'rotate-45 border-caramel bg-caramel text-cocoa' : 'border-amber-900/20 text-gold-ink'
                      }`}
                      aria-hidden
                    >
                      <Plus size={18} strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <m.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] px-6 pb-6 leading-relaxed text-espresso sm:px-8 sm:pb-7">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
