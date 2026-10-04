import { useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BadgeCheck, Check, MessageCircle, RotateCcw, Users } from 'lucide-react'
import { EVENTS, FLAVORS, IMAGES, SIZES, WA_NUMBER } from '../data'
import Reveal from './Reveal'

const TABS = ['Ocazie', 'Aromă & Compoziție', 'Număr Invitați & Greutate']
const GOLD = ['#c88a42', '#e6b566', '#f3d9a4', '#b27532', '#fff3d6']
const EASE = [0.16, 1, 0.3, 1]

// framer owns `transform`, so these cards only transition properties it does not touch
const cardBase =
  'group relative w-full overflow-hidden rounded-3xl text-left transition-[translate,scale,box-shadow] duration-300 active:scale-[0.98]'
const cardState = (on) =>
  on ? 'card ring-2 ring-caramel shadow-amber-900/15' : 'card hover:-translate-y-1 hover:shadow-stone-900/10'

function Tick({ on }) {
  return (
    <span
      aria-hidden
      className={`absolute right-4 top-4 z-10 grid size-7 place-items-center rounded-full bg-caramel text-white shadow-md transition-all duration-300 ${
        on ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}
    >
      <Check size={16} strokeWidth={3} />
    </span>
  )
}

// three stacked bars read as cake tiers; the widest sits at the bottom
function Tiers({ count }) {
  return (
    <span className="flex w-12 flex-col items-center gap-[3px]" aria-hidden>
      {[2, 1, 0].map((fromBottom) => (
        <m.span
          key={fromBottom}
          className="h-[6px] rounded-full bg-caramel"
          style={{ width: ['100%', '72%', '46%'][fromBottom] }}
          animate={{ opacity: fromBottom < count ? 1 : 0.18 }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </span>
  )
}

function Preview({ ev, fl, sz, reduce }) {
  const src = fl?.preview ?? ev?.img ?? IMAGES.pistachio
  const tiers = ev?.tiered ? Math.max(2, sz?.tiers ?? 1) : (sz?.tiers ?? 1)
  const label = ev?.tiered ? `Tort etajat, ${tiers} etaje` : tiers === 1 ? 'Un singur etaj' : `${tiers} etaje`
  const fade = reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }
  const badge = fl ? fl.short : 'Alege o aromă'

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-900/10">
      <div className="relative aspect-[16/9] bg-parchment">
        <AnimatePresence initial={false}>
          <m.img
            key={src}
            src={src}
            alt={fl ? `Previzualizare: ${fl.name}` : ev ? `Previzualizare: tort pentru ${ev.name}` : 'Previzualizare tort'}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/50 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={badge}
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="glass rounded-full px-3 py-1 text-xs font-bold text-cocoa"
            >
              {badge}
            </m.span>
          </AnimatePresence>
          {fl?.badge && (
            <span className="rounded-full bg-berry px-3 py-1 text-xs font-bold text-white shadow-md">{fl.badge}</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 bg-parchment/60 px-4 py-3">
        <p className="text-xs text-espresso">Scara tortului</p>
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={label}
              initial={{ opacity: 0, y: reduce ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="text-sm font-semibold"
            >
              {label}
            </m.span>
          </AnimatePresence>
          <Tiers count={tiers} />
        </div>
      </div>
    </div>
  )
}

export default function CakeBuilder() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [event, setEvent] = useState(null)
  const [flavor, setFlavor] = useState(null)
  const [size, setSize] = useState(null)
  const busy = useRef(false)

  const ev = EVENTS[event]
  const fl = FLAVORS[flavor]
  const sz = SIZES[size]
  const picked = [ev, fl, sz]
  const done = picked.every(Boolean)
  const missing = ['ocazia', 'aroma', 'mărimea'].filter((_, i) => !picked[i])

  const msg = done
    ? `Bună ziua! Doresc o estimare pentru un tort Dulciuri de Vis: Ocazie: ${ev.name}, Aromă: ${fl.name}, Mărime: ${sz.label} (~${sz.kg} kg). Putem stabili decorul?`
    : ''
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

  const go = (next) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }
  const reset = () => {
    setEvent(null)
    setFlavor(null)
    setSize(null)
    setDir(-1)
    setStep(0)
  }

  // golden burst from the button, then open WhatsApp (straight away if motion is reduced)
  const order = async (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    if (busy.current) return
    busy.current = true
    try {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const r = e.currentTarget.getBoundingClientRect()
        const origin = { x: (r.left + r.width / 2) / window.innerWidth, y: r.top / window.innerHeight }
        const { default: confetti } = await import('canvas-confetti')
        const shot = { origin, colors: GOLD, zIndex: 100, gravity: 0.9, ticks: 150, disableForReducedMotion: true }
        confetti({ ...shot, particleCount: 60, spread: 75, startVelocity: 32, scalar: 0.9 })
        confetti({ ...shot, particleCount: 18, spread: 100, startVelocity: 22, scalar: 1.2, shapes: ['star'] })
        await new Promise((res) => setTimeout(res, 650))
      }
      const w = window.open(waHref, '_blank')
      if (w) w.opener = null
      else window.location.assign(waHref)
    } finally {
      busy.current = false
    }
  }

  const rows = [
    ['Ocazie', ev?.name],
    ['Aromă', fl?.name],
    ['Mărime', sz && `${sz.label} (~${sz.kg} kg)`],
  ]

  const sx = reduce ? 0 : 28
  const slide = {
    enter: (d) => ({ opacity: 0, x: d * sx }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d * -sx }),
  }
  const pop = (i) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.05, ease: EASE },
  })

  return (
    <section id="configurator" className="relative isolate mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="glow glow-amber -left-44 top-48 size-[28rem] sm:size-[42rem]" aria-hidden />
      <div className="glow glow-rose -right-36 top-20 size-[22rem] sm:size-[38rem]" aria-hidden />

      <Reveal>
        <h2 className="max-w-[20ch] text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">Creează tortul tău, pas cu pas</h2>
        <p className="mt-5 max-w-[56ch] leading-relaxed text-espresso">
          Alege ocazia, aroma și mărimea și vezi imediat o estimare. Decorul îl stabilim împreună, pe WhatsApp.
        </p>
      </Reveal>

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div role="tablist" aria-label="Configurator tort" className="relative grid grid-cols-3 border-b border-amber-900/15">
            {TABS.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`tab-${i}`}
                aria-selected={step === i}
                aria-controls="panel"
                onClick={() => go(i)}
                className={`flex items-center justify-center gap-2 px-1 pb-4 pt-1 text-center text-xs font-semibold leading-tight transition-colors sm:text-sm ${
                  step === i ? 'text-cocoa' : 'text-espresso hover:text-cocoa'
                }`}
              >
                {picked[i] && <BadgeCheck size={16} strokeWidth={2} className="shrink-0 text-gold-ink" aria-hidden />}
                {t}
              </button>
            ))}
            <span
              aria-hidden
              className="absolute -bottom-px left-0 h-0.5 w-1/3 bg-caramel transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ transform: `translateX(${step * 100}%)` }}
            />
          </div>

          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <m.div
              key={step}
              id="panel"
              role="tabpanel"
              aria-labelledby={`tab-${step}`}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
              className="mt-8"
            >
              {step === 0 && (
                <div role="radiogroup" aria-label="Ocazie" className="grid grid-cols-2 gap-4">
                  {EVENTS.map((e, i) => (
                    <m.button
                      key={e.name}
                      type="button"
                      role="radio"
                      aria-checked={event === i}
                      onClick={() => setEvent(i)}
                      {...pop(i)}
                      className={`${cardBase} aspect-[4/5] ${cardState(event === i)}`}
                    >
                      <img
                        src={e.img}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/30 to-cocoa/5" />
                      <Tick on={event === i} />
                      <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                        <span className="block font-serif text-3xl leading-none sm:text-4xl">{e.name}</span>
                        <span className="mt-2 block text-xs font-medium text-white/90 sm:text-sm">{e.tag}</span>
                      </span>
                    </m.button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div role="radiogroup" aria-label="Aromă" className="grid gap-4 sm:grid-cols-2">
                  {FLAVORS.map((f, i) => (
                    <m.button
                      key={f.name}
                      type="button"
                      role="radio"
                      aria-checked={flavor === i}
                      onClick={() => setFlavor(i)}
                      {...pop(i)}
                      className={`${cardBase} p-6 ${cardState(flavor === i)}`}
                    >
                      <Tick on={flavor === i} />
                      {f.badge && (
                        <span className="mb-3 inline-block rounded-full bg-berry/10 px-3 py-1 text-xs font-bold text-berry">{f.badge}</span>
                      )}
                      <span className="block pr-8 font-serif text-2xl leading-tight">{f.name}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-espresso">{f.profile}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {f.parts.map((p) => (
                          <span key={p} className="rounded-full bg-pistachio px-3 py-1 text-xs font-semibold text-pistachio-ink">{p}</span>
                        ))}
                      </span>
                    </m.button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div role="radiogroup" aria-label="Mărime" className="grid gap-4 sm:grid-cols-3">
                  {SIZES.map((s, i) => (
                    <m.button
                      key={s.label}
                      type="button"
                      role="radio"
                      aria-checked={size === i}
                      onClick={() => setSize(i)}
                      {...pop(i)}
                      className={`${cardBase} p-6 ${cardState(size === i)}`}
                    >
                      <Tick on={size === i} />
                      <span className="flex gap-1 text-caramel" aria-hidden>
                        {[1, 2, 3].map((n) => (
                          <Users key={n} size={22} strokeWidth={1.5} className={n <= s.level ? '' : 'opacity-25'} />
                        ))}
                      </span>
                      <span className="mt-5 block font-semibold">{s.label}</span>
                      <span className="block font-serif text-4xl text-cocoa">~{s.kg} kg</span>
                      <span className="mt-3 block border-t border-dashed border-amber-900/20 pt-3 text-sm text-espresso">
                        Estimare
                        <span className="mt-0.5 block font-bold text-berry">{s.range}</span>
                      </span>
                    </m.button>
                  ))}
                </div>
              )}
            </m.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold text-espresso transition-colors hover:text-berry disabled:invisible"
            >
              <ArrowLeft size={16} strokeWidth={2} aria-hidden /> Înapoi
            </button>
            {step < 2 ? (
              <button
                type="button"
                onClick={() => go(step + 1)}
                disabled={!picked[step]}
                className="inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-canvas transition-all hover:bg-berry active:scale-95 disabled:cursor-not-allowed disabled:bg-cocoa/25"
              >
                Continuă <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </button>
            ) : (
              <a
                href="#rezumat"
                className="inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-canvas transition-all hover:bg-berry active:scale-95 lg:hidden"
              >
                Vezi rezumatul <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={120} className="sticky-fit lg:col-span-5">
          <div id="rezumat" className="card scroll-mt-24 p-3">
            <div className="rounded-[1.25rem] border border-dashed border-amber-900/30 p-5 sm:p-6">
              <Preview ev={ev} fl={fl} sz={sz} reduce={reduce} />

              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-caramel text-white shadow-md shadow-amber-900/20">
                  <BadgeCheck size={24} strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="text-2xl leading-none sm:text-3xl">Rezumat Comandă Artizanală</h3>
              </div>

              <dl className="mt-6 space-y-3" aria-live="polite">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-3 text-sm">
                    <dt className="shrink-0 text-espresso">{k}</dt>
                    <span className="min-w-4 flex-1 border-b border-dotted border-cocoa/30" aria-hidden />
                    <dd className={`text-right ${v ? 'font-semibold' : 'text-espresso/70'}`}>{v || 'De ales'}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t-2 border-double border-amber-900/25 pt-4">
                <p className="text-sm text-espresso">Estimare orientativă</p>
                <m.p
                  key={sz ? sz.range : 'none'}
                  initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                  className="mt-1 font-serif text-4xl leading-none text-berry"
                >
                  {sz ? sz.range : '- RON'}
                </m.p>
                <p className="mt-2 text-xs text-espresso">Prețul final depinde de decor și de detaliile comenzii.</p>
              </div>

              <a
                href={done ? waHref : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!done}
                onClick={done ? order : undefined}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white shadow-md transition-all ${
                  done ? 'bg-emerald-700 shadow-emerald-900/20 hover:bg-emerald-800 active:scale-95' : 'pointer-events-none bg-cocoa/30'
                }`}
              >
                <MessageCircle size={20} strokeWidth={1.75} aria-hidden /> Comandă pe WhatsApp
              </a>
              {!done && <p className="mt-3 text-center text-sm text-espresso">Alege încă: {missing.join(', ')}.</p>}

              {(ev || fl || sz) && (
                <button
                  type="button"
                  onClick={reset}
                  className="mx-auto mt-3 flex items-center gap-2 text-sm font-medium text-espresso transition-colors hover:text-berry"
                >
                  <RotateCcw size={15} strokeWidth={1.75} aria-hidden /> Începe din nou
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
