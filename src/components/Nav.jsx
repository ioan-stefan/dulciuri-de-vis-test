import { Phone } from 'lucide-react'
import { PHONE_HREF } from '../data'

const links = [
  ['Configurator', '#configurator'],
  ['Colecții', '#colectii'],
  ['Povestea Noastră', '#poveste'],
  ['Recenzii', '#recenzii'],
  ['Contact', '#contact'],
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#" className="leading-none">
          <span className="block font-serif text-[1.65rem] font-semibold tracking-tight">Dulciuri de Vis</span>
          <span className="mt-1 block text-[11px] font-medium tracking-wide text-gold-ink">✦ Atelier de Cofetărie</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Principal">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative whitespace-nowrap text-espresso transition-colors hover:text-cocoa after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-caramel after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={PHONE_HREF}
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-cocoa px-5 py-2.5 text-sm font-semibold text-canvas transition-all hover:bg-berry active:scale-95"
        >
          <Phone size={16} strokeWidth={1.75} aria-hidden /> Comandă Rapidă
        </a>
      </div>
      <div className="hairline" />
    </header>
  )
}
