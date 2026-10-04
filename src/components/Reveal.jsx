import { useEffect, useRef } from 'react'

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (el.classList.add('is-visible'), io.disconnect()),
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
