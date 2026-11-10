import { useEffect, useState } from 'react'
import {
  formatPriceRange,
  SERVICE_CATEGORIES,
  SERVICES,
  type Service,
  type ServiceCategory,
} from '../data/clinic'
import { ArrowRightIcon } from './Icons'
import { Reveal } from './Reveal'

interface ServicesProps {
  onBook: (service: Service) => void
}

const groupId = (cat: ServiceCategory) => `price-${cat.toLowerCase()}`

export function Services({ onBook }: ServicesProps) {
  const [active, setActive] = useState<ServiceCategory>('Preventive')

  // Highlight the index entry for the group nearest the top of the viewport.
  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35
      let current: ServiceCategory = SERVICE_CATEGORIES[0]!
      for (const cat of SERVICE_CATEGORIES) {
        const el = document.getElementById(groupId(cat))
        if (!el) continue
        if (el.getBoundingClientRect().top + window.scrollY <= marker) current = cat
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jump = (cat: ServiceCategory) => {
    const el = document.getElementById(groupId(cat))
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <div className="section__head section__head--center">
            <span className="eyebrow">Price list</span>
            <h2 id="services-title" className="h2">
              General dentistry, <span className="italic-accent">priced in advance</span>
            </h2>
            <p className="lede">
              Every service carries a peso price range. Your exact quote is confirmed at your
              consultation, before anything begins.
            </p>
          </div>
        </Reveal>

        <div className="pricelist">
          <nav className="index" aria-label="Price list categories">
            {SERVICE_CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${groupId(cat)}`}
                className="index__link"
                aria-current={active === cat ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  jump(cat)
                }}
              >
                {cat}
              </a>
            ))}
            <p className="index__note">Senior citizen and PWD discounts apply as provided by law.</p>
          </nav>

          <div>
            {SERVICE_CATEGORIES.map((cat, gi) => {
              const items = SERVICES.filter((s) => s.category === cat)
              return (
                <Reveal key={cat} delay={gi * 50} className="pl-group">
                  <div id={groupId(cat)} className="pl-group__head">
                    <h3 className="pl-group__name">{cat}</h3>
                    <span className="pl-group__count">
                      {items.length} {items.length === 1 ? 'service' : 'services'}
                    </span>
                  </div>
                  <ul className="pl-items">
                    {items.map((service, i) => (
                      <li key={service.id}>
                        <article className="service" style={{ animationDelay: `${i * 40}ms` }}>
                          <div>
                            <h4 className="service__name">
                              {service.name}
                              {service.popular ? <span className="service__badge">Popular</span> : null}
                            </h4>
                            <p className="service__desc">{service.description}</p>
                          </div>
                          <div className="price">
                            <span className="price__value">{formatPriceRange(service)}</span>
                            {service.priceUnit ? <span className="price__unit">{service.priceUnit}</span> : null}
                            <span className="price__dur">≈ {service.durationMinutes} min</span>
                          </div>
                          <button
                            type="button"
                            className="btn btn--ghost btn--sm"
                            onClick={() => onBook(service)}
                            aria-label={`Book ${service.name}`}
                          >
                            Book
                            <ArrowRightIcon className="btn__icon" />
                          </button>
                        </article>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>
        </div>

        <p className="services__note">
          Ranges are in Philippine pesos (₱) and cover typical cases; complex cases are quoted
          individually.
        </p>
      </div>
    </section>
  )
}
