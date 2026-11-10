import { CLINIC } from '../data/clinic'
import portraitUrl from '../assets/doctor-portrait.jpg'
import { CheckIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'
import { Reveal } from './Reveal'

/** DEMO: placeholder milestones for presentation. */
const MILESTONES = [
  {
    year: '2022',
    title: 'Doors open in Toronto',
    text: 'The clinic opens with one chair and consultations in Filipino and English.',
  },
  {
    year: '2024',
    title: 'Digital imaging',
    text: 'Low-dose digital X-rays replace film, making diagnosis faster and safer.',
  },
  {
    year: '2026',
    title: 'Family Saturdays',
    text: 'Saturday mornings are set aside for families, with a gentle first-visit routine for children.',
  },
] as const

const VALUES = [
  {
    title: 'A price range before any work',
    text: 'You see the range on this site and the exact quote at your consultation.',
  },
  {
    title: 'Unhurried appointments',
    text: 'Slots are long enough to explain, to answer questions, and to never rush.',
  },
  {
    title: 'Your language, your comfort',
    text: 'Consultations in Filipino or English, whichever puts you at ease.',
  },
] as const

export function About() {
  const yearsOpen = new Date().getFullYear() - CLINIC.establishedYear

  return (
    <section id="about" className="section section--tint" aria-labelledby="about-title">
      <div className="container">
        <Reveal>
          <div className="about__intro">
            <div>
              <span className="eyebrow">The clinic</span>
              <h2 id="about-title" className="h2">
                When and why <span className="italic-accent">C&amp;C</span> began
              </h2>
              <p className="lede">
                Established {CLINIC.establishedMonth} {CLINIC.establishedYear} · {yearsOpen} years in{' '}
                {CLINIC.address}
              </p>
            </div>
            <p className="story">{CLINIC.story}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ol className="htimeline" aria-label="Clinic milestones">
            {MILESTONES.map((m) => (
              <li key={m.year}>
                <div className="htimeline__year">{m.year}</div>
                <h3 className="htimeline__title">{m.title}</h3>
                <p className="htimeline__text">{m.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="about__lower">
          <Reveal delay={100}>
            <article className="dentist" aria-label={`About Dr. ${CLINIC.doctor.fullName}`}>
              <img
                className="dentist__photo"
                src={portraitUrl}
                width={640}
                height={800}
                alt={`Portrait of Dr. ${CLINIC.doctor.fullName}, ${CLINIC.doctor.title}`}
                loading="lazy"
                decoding="async"
              />
              <div>
                <div className="dentist__kicker">Your dentist</div>
                <h3 className="dentist__name">
                  Dr. {CLINIC.doctor.fullName}
                  <small>{CLINIC.doctor.title}</small>
                </h3>
                <p className="dentist__role">{CLINIC.doctor.role}</p>
                <p className="dentist__bio">{CLINIC.doctor.bio}</p>
                <div className="dentist__contact">
                  <a className="contact-row" href={CLINIC.contact.phoneHref}>
                    <span className="contact-row__icon">
                      <PhoneIcon />
                    </span>
                    <span>
                      <span className="contact-row__label">Call or text</span>
                      {CLINIC.contact.phoneDisplay}
                    </span>
                  </a>
                  <a className="contact-row" href={`mailto:${CLINIC.contact.email}`}>
                    <span className="contact-row__icon">
                      <MailIcon />
                    </span>
                    <span>
                      <span className="contact-row__label">Email</span>
                      {CLINIC.contact.email}
                    </span>
                  </a>
                  <span className="contact-row">
                    <span className="contact-row__icon">
                      <PinIcon />
                    </span>
                    <span>
                      <span className="contact-row__label">Clinic</span>
                      {CLINIC.name}, {CLINIC.address}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={160}>
            <ul className="values" aria-label="What we stand for">
              {VALUES.map((v) => (
                <li key={v.title}>
                  <span className="values__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <div>
                    <strong>{v.title}</strong>
                    <span>{v.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
