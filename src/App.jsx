import { LazyMotion, domAnimation } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import TrustStrip from './components/TrustStrip'
import CakeBuilder from './components/CakeBuilder'
import Collections from './components/Collections'
import Story from './components/Story'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="overflow-x-clip bg-gradient-to-b from-[#FAF7F2] via-[#F4EEE5] to-[#FAF7F2]">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <TrustStrip />
          <CakeBuilder />
          <Collections />
          <Story />
          <Gallery />
          <Reviews />
          <Faq />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  )
}
