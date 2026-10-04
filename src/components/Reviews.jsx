import { Star } from 'lucide-react'
import { GOOGLE_RATING, GOOGLE_REVIEWS, REVIEWS } from '../data'
import Reveal from './Reveal'

function Stars() {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={18} strokeWidth={1.5} className="fill-caramel text-caramel" />
      ))}
    </span>
  )
}

export default function Reviews() {
  const [main, ...rest] = REVIEWS
  return (
    <section id="recenzii" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[16ch] text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl">Ce spun clienții noștri</h2>
        <div className="card flex items-center gap-4 px-6 py-4">
          <span className="font-serif text-5xl leading-none">{GOOGLE_RATING}</span>
          <div>
            <Stars />
            <p className="mt-1 text-sm text-espresso">{GOOGLE_REVIEWS} recenzii pe Google Maps</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        <Reveal className="card relative flex flex-col justify-center p-8 sm:p-12 lg:col-span-7">
          <span className="absolute right-8 top-2 font-serif text-9xl leading-none text-caramel/25" aria-hidden>”</span>
          <Stars />
          <figure className="mt-6">
            <blockquote className="font-serif text-3xl leading-snug sm:text-4xl">„{main.quote}”</blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold">{main.name}</span>
              <span className="text-espresso"> - {main.role}</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="grid gap-6 lg:col-span-5">
          {rest.map((r, i) => (
            <Reveal key={r.name} delay={(i + 1) * 120} className="card p-6 sm:p-8">
              <Stars />
              <figure className="mt-4">
                <blockquote className="leading-relaxed">„{r.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-espresso"> - {r.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
