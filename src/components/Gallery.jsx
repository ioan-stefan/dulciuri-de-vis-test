import { Camera, Heart } from 'lucide-react'
import { GALLERY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data'
import Reveal from './Reveal'

// overlays show on hover where hover exists, and stay visible on touch screens
const overlay =
  'absolute inset-0 flex items-end bg-gradient-to-t from-cocoa/85 via-cocoa/20 to-transparent p-4 opacity-100 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100'

export default function Gallery() {
  return (
    <section id="galerie" className="relative isolate scroll-mt-20 py-24">
      <div className="glow glow-amber left-1/2 top-44 h-[24rem] w-[60rem] max-w-[140vw] -translate-x-1/2" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-[16ch] text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">Din Laboratorul Nostru</h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-espresso">
            Câteva cadre din atelier: creme, decor și prăjituri în lucru.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-3 pb-2 sm:gap-5 md:grid-cols-4 md:pb-10">
          {GALLERY.map((g, i) => (
            <Reveal as="li" key={g.alt} delay={i * 90} className={i % 2 ? 'md:mt-10' : ''}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${g.alt}, ${g.likes.toLocaleString('ro-RO')} de aprecieri, deschide Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-3xl shadow-xl shadow-stone-900/10 ring-1 ring-caramel/30"
              >
                <img
                  src={g.img}
                  alt={g.alt}
                  width="700"
                  height="700"
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                />
                <span className={overlay}>
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Heart size={18} strokeWidth={1.5} className="fill-white" aria-hidden />
                    {g.likes.toLocaleString('ro-RO')}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-6 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-6! text-center text-base! whitespace-normal! sm:px-8! sm:text-lg! sm:whitespace-nowrap!"
          >
            <Camera size={20} strokeWidth={2} className="shrink-0" aria-hidden />
            <span>Urmărește-ne pe Instagram {INSTAGRAM_HANDLE}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
