import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PHONE, PHONE_HREF, WA_NUMBER } from '../data'

const YEAR = new Date().getFullYear()
const HOURS = [
  ['Marți - Duminică', '09:00 - 19:00'],
  ['Luni', 'Închis'],
]

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-cocoa text-canvas">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-serif text-4xl">Dulciuri de Vis</p>
          <p className="mt-1 text-xs font-medium tracking-wide text-caramel">✦ Atelier de Cofetărie</p>

          <p className="mt-8 flex items-start gap-3 text-canvas/85">
            <MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-caramel" aria-hidden />
            <span>
              Str. Principală, Balotești, Ilfov
              <span className="block text-sm text-canvas/75">Zonă deservită: Ilfov &amp; București</span>
            </span>
          </p>

          <h2 className="mt-10 flex items-center gap-3 font-sans text-base font-semibold text-canvas">
            <Clock size={18} strokeWidth={1.5} className="text-caramel" aria-hidden /> Program
          </h2>
          <dl className="mt-3 max-w-xs divide-y divide-canvas/15">
            {HOURS.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4 py-3">
                <dt>{d}</dt>
                <dd className="font-semibold">{h}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={PHONE_HREF} className="btn-gold-sm !px-6 !py-3.5 !text-base">
              <Phone size={18} strokeWidth={1.75} aria-hidden /> Sună acum
              <span className="sr-only">{PHONE}</span>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-canvas/40 px-6 py-3.5 font-semibold transition-all hover:border-caramel hover:text-caramel active:scale-95"
            >
              <MessageCircle size={18} strokeWidth={1.75} aria-hidden /> Scrie pe WhatsApp
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-2xl shadow-black/30 lg:col-span-7">
          <iframe
            title="Dulciuri de Vis pe hartă, Balotești, Ilfov"
            src="https://www.google.com/maps?q=Balote%C8%99ti%2C%20Ilfov&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0 lg:h-full lg:min-h-[26rem]"
          />
        </div>
      </div>
      <p className="border-t border-canvas/15 px-4 py-6 text-center text-sm text-canvas/75">
        &copy; {YEAR} Dulciuri de Vis. Toate drepturile rezervate.
      </p>
    </footer>
  )
}
