import { Brush, Snowflake, Wheat } from 'lucide-react'

const items = [
  [Brush, 'Decor Handcrafted', 'Fiecare detaliu e modelat manual'],
  [Wheat, 'Ingrediente Fără Premixuri', 'Totul de la zero, în laboratorul nostru'],
  [Snowflake, 'Livrări Frigorifice în Siguranță', 'Transport la temperatură controlată'],
]

export default function TrustStrip() {
  return (
    <section className="bg-parchment/70">
      <div className="hairline" />
      <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 md:gap-8">
        {items.map(([Icon, title, text]) => (
          <li key={title} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-caramel/40 bg-white text-gold-ink shadow-md shadow-amber-900/10">
              <Icon size={22} strokeWidth={1.5} aria-hidden />
            </span>
            <span>
              <span className="block font-semibold">{title}</span>
              <span className="block text-sm text-espresso">{text}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="hairline" />
    </section>
  )
}
