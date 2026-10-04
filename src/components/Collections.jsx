import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, MessageCircle } from 'lucide-react'
import { CANDY, CEREMONY, FINE, WA_NUMBER } from '../data'
import Reveal from './Reveal'

const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
const EASE = [0.16, 1, 0.3, 1]

function Inquiry({ text }) {
  return (
    <a href={wa(text)} target="_blank" rel="noopener noreferrer" className="btn-gold-sm">
      <MessageCircle size={16} strokeWidth={2} aria-hidden /> Cere ofertă
    </a>
  )
}

// image card: hover zoom, bottom gradient plus edge vignette so text always sits on dark
function Shell({ img, alt, className = '', dim, children }) {
  return (
    <article className={`card group relative isolate flex min-h-[38rem] flex-col justify-between overflow-hidden ${className}`}>
      <img
        src={img}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa/95 via-cocoa/60 to-cocoa/15" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(26_18_15/0.5)_100%)]" />
      {dim}
      {children}
    </article>
  )
}

function Ceremony() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  return (
    <Shell
      img={CEREMONY.img}
      alt={CEREMONY.alt}
      className="md:col-span-2"
      dim={
        <m.div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cocoa/55"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        />
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3 p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {['Bestseller', 'Premium'].map((t) => (
            <span key={t} className="glass rounded-full px-3 py-1 text-xs font-bold text-cocoa">{t}</span>
          ))}
        </div>
        <span className="glass animate-float rounded-full px-4 py-2 text-sm font-bold text-cocoa">{CEREMONY.price}</span>
      </div>

      <div className="p-6 text-white sm:p-8">
        <h3 className="max-w-[14ch] text-4xl leading-[1.05] sm:text-5xl">{CEREMONY.title}</h3>
        <p className="mt-3 max-w-[44ch] leading-relaxed text-white/90">{CEREMONY.text}</p>

        <AnimatePresence initial={false}>
          {open && (
            <m.ul
              id="ceremony-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <li className="mt-5 border-t border-white/25" aria-hidden />
              {CEREMONY.details.map((d) => (
                <li key={d} className="flex gap-3 border-b border-white/15 py-3 text-sm text-white/90">
                  <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-caramel" aria-hidden /> {d}
                </li>
              ))}
            </m.ul>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Inquiry text={`Bună ziua! Aș dori o ofertă pentru: ${CEREMONY.title}.`} />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="ceremony-details"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-caramel hover:text-caramel active:scale-95"
          >
            {open ? 'Ascunde detaliile' : 'Vezi detalii'}
            <ChevronDown size={16} strokeWidth={2} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
          </button>
        </div>
      </div>
    </Shell>
  )
}

function Fine() {
  return (
    <Shell img={FINE.img} alt={FINE.alt}>
      <div className="flex gap-2 p-6 sm:p-8">
        <span className="glass rounded-full px-3 py-1 text-xs font-bold text-cocoa">Zilnic</span>
      </div>
      <div className="p-6 text-white sm:p-8">
        <h3 className="text-3xl leading-[1.05]">{FINE.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/90">{FINE.text}</p>
        <ul className="mt-5">
          {FINE.items.map((i) => (
            <li key={i} className="border-t border-white/20 py-2.5 text-sm font-medium text-white">{i}</li>
          ))}
        </ul>
        <div className="mt-4">
          <Inquiry text={`Bună ziua! Aș dori o ofertă pentru: ${FINE.title}.`} />
        </div>
      </div>
    </Shell>
  )
}

function Candy() {
  const [on, setOn] = useState(() => new Set(CANDY.items))
  const toggle = (i) =>
    setOn((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  const chosen = CANDY.items.filter((i) => on.has(i))
  const text = `Bună ziua! Aș dori o ofertă pentru: ${CANDY.title}${
    chosen.length ? `, cu ${chosen.join(', ').toLowerCase()}` : ''
  }.`

  return (
    <Shell img={CANDY.img} alt={CANDY.alt}>
      <div className="flex gap-2 p-6 sm:p-8">
        <span className="glass rounded-full px-3 py-1 text-xs font-bold text-cocoa">Evenimente</span>
      </div>
      <div className="p-6 text-white sm:p-8">
        <h3 className="text-3xl leading-[1.05]">{CANDY.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/90">{CANDY.text}</p>

        <div role="group" aria-label="Ce include candy bar-ul" className="mt-5 rounded-2xl border border-white/20 bg-cocoa/55 p-1.5 backdrop-blur-sm">
          {CANDY.items.map((i) => {
            const checked = on.has(i)
            return (
              <button
                key={i}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-white/10"
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                    checked ? 'border-caramel bg-caramel text-cocoa' : 'border-white/60'
                  }`}
                  aria-hidden
                >
                  {checked && <Check size={14} strokeWidth={3} />}
                </span>
                <span className={checked ? '' : 'text-white/70'}>{i}</span>
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-xs text-white/85" aria-live="polite">
          {chosen.length} din {CANDY.items.length} incluse
        </p>
        <div className="mt-4">
          <Inquiry text={text} />
        </div>
      </div>
    </Shell>
  )
}

export default function Collections() {
  return (
    <section id="colectii" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[18ch] text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">Colecțiile noastre de semnătură</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Ceremony />
          <Fine />
          <Candy />
        </div>
      </div>
    </section>
  )
}
