import { ArrowRight, Leaf, Star } from 'lucide-react'
import { HERO_RATING, HERO_REVIEWS, IMAGES } from '../data'
import Reveal from './Reveal'

function Photo({ src, alt, className, w, h, eager }) {
  return (
    <div
      className={`group absolute overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-stone-900/20 ring-1 ring-caramel/40 transition-transform duration-500 hover:rotate-0 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
      />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-12 lg:pt-16">
      <div className="glow glow-amber -right-40 -top-10 size-[46rem]" aria-hidden />
      <div className="glow glow-rose -bottom-24 -left-48 size-[38rem]" aria-hidden />

      <Reveal className="lg:col-span-7">
        <h1 className="text-balance text-5xl leading-[1.02] tracking-tight text-cocoa sm:text-6xl xl:text-7xl">
          Torturi Unice &amp; Prăjituri Artizanale Create cu <em className="pb-1 font-medium italic text-berry">Suflet</em>
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-espresso">
          Laborator propriu în nordul Capitalei &amp; Ilfov. Lucrăm exclusiv cu ciocolată belgiană veritabilă, unt cu 82% grăsime și piureuri pure de fructe.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#configurator" className="btn-gold">
            Creează Tortul Tău <ArrowRight size={20} strokeWidth={2} aria-hidden />
          </a>
          <a href="#colectii" className="btn-ghost">Vezi Meniul Complet</a>
        </div>
      </Reveal>

      <Reveal delay={150} className="lg:col-span-5">
        <div className="relative mx-auto h-[30rem] w-full max-w-md sm:h-[36rem] lg:max-w-none">
          <Photo src={IMAGES.pistachio} alt="Tort cu fistic și zmeură" w="1000" h="1250" eager className="right-0 top-0 h-[76%] w-[66%] rotate-2" />
          <Photo src={IMAGES.chocolate} alt="Tort de ciocolată cu fructe de pădure" w="800" h="800" className="left-0 top-[24%] h-[38%] w-[46%] -rotate-3" />
          <Photo src={IMAGES.macaronStack} alt="Macarons franțuzești" w="800" h="800" className="bottom-0 left-[22%] h-[30%] w-[42%] rotate-1" />

          <div className="glass animate-float absolute left-0 top-2 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold">
            <Star size={16} strokeWidth={1.5} className="fill-caramel text-caramel" aria-hidden />
            <span>{HERO_RATING} din {HERO_REVIEWS} recenzii</span>
          </div>
          <div className="glass animate-float absolute bottom-6 right-0 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold [animation-delay:-3.5s]">
            <Leaf size={16} strokeWidth={1.5} className="text-pistachio-ink" aria-hidden />
            <span>100% Ingrediente Naturale</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
