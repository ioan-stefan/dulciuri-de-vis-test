import { MARQUEE } from '../data'

function Half({ dup }) {
  return (
    <ul className={`marquee-half ${dup ? 'marquee-dup' : ''}`} aria-hidden={dup || undefined}>
      {MARQUEE.map((text) => (
        <li
          key={text}
          className="flex items-center whitespace-nowrap font-serif text-xl uppercase tracking-[0.16em] text-canvas sm:text-2xl"
        >
          <span className="mx-8 text-caramel" aria-hidden>✦</span>
          {text}
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <section aria-label="Ingredientele noastre" className="bg-cocoa">
      <div className="hairline" />
      <div className="marquee-mask overflow-hidden py-5">
        <div className="marquee-track">
          <Half />
          <Half dup />
        </div>
      </div>
      <div className="hairline" />
    </section>
  )
}
