import { IMAGES } from '../data'
import Reveal from './Reveal'

const principles = [
  ['Ciocolată belgiană', 'Veritabilă, nu glazură de cofetărie.'],
  ['Unt cu 82% grăsime', 'Pentru creme fine și blaturi fragede.'],
  ['Piureuri pure de fructe', 'Fără arome sau coloranți adăugați.'],
]

export default function Story() {
  return (
    <section id="poveste" className="scroll-mt-20 bg-parchment/70 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="group overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-stone-900/15">
            <img
              src={IMAGES.story}
              alt="Tort tăiat, cu straturi colorate"
              width="900"
              height="1000"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
            />
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7 lg:pl-8">
          <h2 className="max-w-[16ch] text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">Povestea Noastră</h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-espresso">
            Dulciuri de Vis este un laborator de cofetărie din nordul Capitalei, în Ilfov. Fiecare tort și fiecare prăjitură se fac de la zero, fără premixuri, iar decorul este lucrat manual pentru fiecare client.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {principles.map(([t, d]) => (
              <li key={t} className="border-t border-caramel/50 pt-4">
                <p className="font-serif text-2xl leading-tight">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-espresso">{d}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
