import { useMemo } from 'react'
import { BREAK_NOTE, CLINIC, WEEKLY_HOURS } from '../data/clinic'
import portraitUrl from '../assets/doctor-portrait.jpg'
import { useNow } from '../hooks/useNow'
import {
  formatHoursRange,
  formatMinutes,
  getOpenStatus,
  getZonedParts,
  minutesOfDay,
  MONTH_NAMES,
  WEEKDAY_NAMES,
  WEEKDAY_SHORT,
  type Weekday,
} from '../lib/time'
import { scrollToSection } from '../lib/scroll'
import { ArrowRightIcon, CalendarIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'
import { Reveal } from './Reveal'

const DAY_ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0]

export function Hero() {
  const now = useNow(15_000)
  const parts = useMemo(() => getZonedParts(now, CLINIC.timeZone), [now])
  const status = useMemo(() => getOpenStatus(parts, WEEKLY_HOURS), [parts])
  const clock = formatMinutes(minutesOfDay(parts))
  const dateLabel = `${WEEKDAY_NAMES[parts.weekday]}, ${MONTH_NAMES[parts.month - 1]} ${parts.day}`

  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="hero__swoosh hero__swoosh--2" aria-hidden="true" />
      <div className="hero__swoosh" aria-hidden="true" />

      <div className="container">
        <div className="hero__grid">
          <Reveal>
            <div className="hero__photo">
              <img
                src={portraitUrl}
                width={640}
                height={800}
                alt={`Portrait of Dr. ${CLINIC.doctor.fullName}, ${CLINIC.doctor.title}`}
                decoding="async"
              />
            </div>
          </Reveal>

          <div className="hero__copy">
            <Reveal delay={60}>
              <div className={`status status--${status.state}`} role="status" aria-live="polite">
                <span className="status__dot" aria-hidden="true" />
                <span>{status.headline}</span>
                <span className="status__detail">· {status.detail}</span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h1 id="home-title" className="hero__name" style={{ marginTop: 22 }}>
                Dr. {CLINIC.doctor.fullName}
                <small>
                  {CLINIC.doctor.title} · General Dentist · {CLINIC.address}
                </small>
              </h1>
              <div className="rule" aria-hidden="true">
                ✦
              </div>
              <p className="hero__tag">{CLINIC.tagline}</p>
            </Reveal>

            <Reveal delay={200}>
              <p className="lede">
                {CLINIC.name} is a general dentistry practice in {CLINIC.address}. {CLINIC.motto}{' '}
                Every treatment is quoted as a peso price range before it begins.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="hero__actions">
                <button type="button" className="btn btn--gold" onClick={() => scrollToSection('appointment')}>
                  Book an appointment
                  <ArrowRightIcon className="btn__icon" />
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => scrollToSection('services')}>
                  View price list
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={120}>
        <div className="glance" aria-label="At a glance">
          <div className="container">
            <div className="glance__grid">
              <div className="glance__cell">
                <span className="glance__icon" aria-hidden="true">
                  <ClockIcon />
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span className="glance__label">Clinic hours</span>
                  <ul className="hours-mini" aria-label="Weekly hours">
                    {DAY_ORDER.map((day) => {
                      const hours = WEEKLY_HOURS[day]
                      const isToday = day === parts.weekday
                      return (
                        <li key={day} className={isToday ? 'is-today' : ''}>
                          <span>
                            {WEEKDAY_SHORT[day]}
                            {isToday ? ' · today' : ''}
                          </span>
                          <span className={hours ? '' : 'closed'}>{formatHoursRange(hours)}</span>
                        </li>
                      )
                    })}
                  </ul>
                  <span className="glance__sub">{BREAK_NOTE}</span>
                </div>
              </div>

              <div className="glance__cell">
                <span className="glance__icon" aria-hidden="true">
                  <CalendarIcon />
                </span>
                <div>
                  <span className="glance__label">Right now</span>
                  <span className="glance__value">{status.headline}</span>
                  <span className="glance__sub">{status.detail}</span>
                  <span className="glance__sub">
                    {clock} · {dateLabel} · Toronto time
                  </span>
                </div>
              </div>

              <a className="glance__cell" href={CLINIC.contact.phoneHref}>
                <span className="glance__icon" aria-hidden="true">
                  <PhoneIcon />
                </span>
                <div>
                  <span className="glance__label">Call or text</span>
                  <span className="glance__value">{CLINIC.contact.phoneDisplay}</span>
                  <span className="glance__sub">Replies during clinic hours</span>
                </div>
              </a>

              <a className="glance__cell" href={`mailto:${CLINIC.contact.email}`}>
                <span className="glance__icon" aria-hidden="true">
                  <MailIcon />
                </span>
                <div style={{ minWidth: 0 }}>
                  <span className="glance__label">Email &amp; address</span>
                  <span className="glance__value">{CLINIC.contact.email}</span>
                  <span className="glance__sub">
                    <PinIcon style={{ display: 'inline', width: 12, height: 12, verticalAlign: -1, marginRight: 4 }} />
                    {CLINIC.address}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
