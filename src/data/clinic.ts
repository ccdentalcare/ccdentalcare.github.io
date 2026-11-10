/**
 * Single source of truth for clinic information shown across the site.
 * Values marked DEMO are placeholders for presentation and should be replaced
 * with real data before launch.
 */
import type { DayHours, Weekday } from '../lib/time'

export const CLINIC = {
  name: 'C&C Dental Care',
  shortName: 'C&C',
  tagline: 'Your smile, our care.',
  motto: 'Quiet rooms, clear prices and a dentist who takes her time.',
  address: 'Toronto, Canada',
  /** IANA time zone used for "open now" and appointment slot calculations. */
  timeZone: 'America/Toronto',
  /** DEMO: placeholder founding date. */
  establishedYear: 2022,
  establishedMonth: 'October',
  /** DEMO: placeholder founding story. */
  story:
    'C&C Dental Care opened in October 2022 after Dr. Consigna noticed how many Filipino families in Toronto were flying home for dental work because they did not trust local prices or did not feel understood. The clinic was built to close that gap: a calm, unhurried practice where consultations happen in Filipino or English, every treatment is quoted as a peso-equivalent range before it starts, and routine care is taken as seriously as any cosmetic case.',
  doctor: {
    fullName: 'Christelle Faith A. Consigna',
    title: 'DMD',
    role: 'Doctor of Dental Medicine · General Dentist',
    /** DEMO: placeholder biography for presentation. */
    bio: 'Dr. Consigna is a general dentist known for gentle hands and straight answers. She favours prevention over repair, explains every option with its price range, and keeps appointments long enough that no one feels rushed out of the chair.',
  },
  contact: {
    phoneDisplay: '0955 568 2947',
    phoneHref: 'tel:+639555682947',
    /** Supplied as "c&c dentalcare@clinic.com"; written here as a valid address. */
    email: 'ccdentalcare@clinic.com',
  },
} as const

/**
 * Weekly opening hours in minutes from midnight (clinic local time).
 * `null` means closed for the whole day. 0 = Sunday … 6 = Saturday.
 */
export const WEEKLY_HOURS: Readonly<Record<Weekday, DayHours | null>> = {
  0: null,
  1: { open: 9 * 60, close: 17 * 60, breakStart: 12 * 60, breakEnd: 13 * 60 },
  2: { open: 9 * 60, close: 17 * 60, breakStart: 12 * 60, breakEnd: 13 * 60 },
  3: { open: 9 * 60, close: 17 * 60, breakStart: 12 * 60, breakEnd: 13 * 60 },
  4: { open: 11 * 60, close: 19 * 60, breakStart: 14 * 60, breakEnd: 15 * 60 },
  5: { open: 9 * 60, close: 17 * 60, breakStart: 12 * 60, breakEnd: 13 * 60 },
  6: { open: 9 * 60, close: 13 * 60 },
}

/** Human-readable summary of the break, shown next to the hours. */
export const BREAK_NOTE = 'One-hour lunch break on weekdays · late opening Thursdays'

/** Appointment slot granularity in minutes. */
export const SLOT_STEP_MINUTES = 30
/** Earliest same-day booking lead time in minutes. */
export const BOOKING_LEAD_MINUTES = 60
/** How far ahead patients may book, in days. */
export const BOOKING_HORIZON_DAYS = 60

export type ServiceCategory = 'Preventive' | 'Restorative' | 'Cosmetic' | 'Kids'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  /** Price range in Philippine pesos. DEMO values. */
  priceMin: number
  priceMax: number
  /** Appended to the price, e.g. "per tooth". */
  priceUnit?: string
  /** Appointment length in minutes; used to block slots. */
  durationMinutes: number
  description: string
  icon: ServiceIcon
  popular?: boolean
}

export type ServiceIcon =
  | 'tooth'
  | 'sparkle'
  | 'shield'
  | 'drill'
  | 'crown'
  | 'braces'
  | 'xray'
  | 'root'
  | 'extract'
  | 'implant'
  | 'denture'
  | 'child'

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  'Preventive',
  'Restorative',
  'Cosmetic',
  'Kids',
]

/** DEMO: general-dentistry services with indicative peso price ranges. */
export const SERVICES: readonly Service[] = [
  {
    id: 'consultation',
    name: 'Consultation & Oral Exam',
    category: 'Preventive',
    priceMin: 700,
    priceMax: 1000,
    durationMinutes: 30,
    description: 'A thorough look at teeth, gums and bite, then a plan with a price range before anything begins.',
    icon: 'tooth',
  },
  {
    id: 'cleaning',
    name: 'Oral Prophylaxis (Cleaning)',
    category: 'Preventive',
    priceMin: 1400,
    priceMax: 2000,
    durationMinutes: 45,
    description: 'Ultrasonic scaling and polishing that lifts plaque, tartar and everyday stains.',
    icon: 'sparkle',
    popular: true,
  },
  {
    id: 'fluoride',
    name: 'Fluoride Treatment',
    category: 'Preventive',
    priceMin: 900,
    priceMax: 1200,
    durationMinutes: 20,
    description: 'A protective varnish that hardens enamel and helps keep cavities away between visits.',
    icon: 'shield',
  },
  {
    id: 'sealants',
    name: 'Pit & Fissure Sealants',
    category: 'Preventive',
    priceMin: 1000,
    priceMax: 1400,
    priceUnit: 'per tooth',
    durationMinutes: 30,
    description: 'A thin coating over the grooves of back teeth, where decay most often begins.',
    icon: 'shield',
  },
  {
    id: 'xray',
    name: 'Digital X-ray',
    category: 'Preventive',
    priceMin: 700,
    priceMax: 1000,
    durationMinutes: 20,
    description: 'Low-dose imaging that shows what sits between and beneath the teeth.',
    icon: 'xray',
  },
  {
    id: 'filling',
    name: 'Tooth-coloured Filling',
    category: 'Restorative',
    priceMin: 2000,
    priceMax: 3800,
    priceUnit: 'per tooth',
    durationMinutes: 60,
    description: 'Composite fillings matched to your tooth shade. The range follows the size of the cavity.',
    icon: 'drill',
    popular: true,
  },
  {
    id: 'extraction',
    name: 'Simple Tooth Extraction',
    category: 'Restorative',
    priceMin: 2000,
    priceMax: 4500,
    priceUnit: 'per tooth',
    durationMinutes: 45,
    description: 'Careful removal of a damaged or loose tooth under local anaesthesia, with written aftercare.',
    icon: 'extract',
  },
  {
    id: 'root-canal',
    name: 'Root Canal Therapy',
    category: 'Restorative',
    priceMin: 10000,
    priceMax: 18000,
    priceUnit: 'per tooth',
    durationMinutes: 90,
    description: 'Relieves pain and saves an infected tooth. Front teeth sit low in the range, molars higher.',
    icon: 'root',
  },
  {
    id: 'crown',
    name: 'Dental Crown',
    category: 'Restorative',
    priceMin: 15000,
    priceMax: 24000,
    priceUnit: 'per tooth',
    durationMinutes: 90,
    description: 'A custom cap that restores a weakened tooth. The range reflects the material you choose.',
    icon: 'crown',
  },
  {
    id: 'dentures',
    name: 'Partial & Complete Dentures',
    category: 'Restorative',
    priceMin: 20000,
    priceMax: 45000,
    durationMinutes: 60,
    description: 'Comfortable, natural-looking replacements for missing teeth, fitted over a few short visits.',
    icon: 'denture',
  },
  {
    id: 'night-guard',
    name: 'Custom Night Guard',
    category: 'Restorative',
    priceMin: 5000,
    priceMax: 8000,
    durationMinutes: 30,
    description: 'A made-to-measure guard that protects against grinding and eases jaw tension overnight.',
    icon: 'shield',
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    priceMin: 15000,
    priceMax: 22000,
    durationMinutes: 90,
    description: 'In-clinic professional whitening for a visibly brighter smile in one visit.',
    icon: 'sparkle',
    popular: true,
  },
  {
    id: 'kids-checkup',
    name: 'Kids Check-up & Cleaning',
    category: 'Kids',
    priceMin: 1000,
    priceMax: 1500,
    durationMinutes: 40,
    description: 'A friendly first visit: gentle cleaning, a look at growing teeth and a prize for bravery.',
    icon: 'child',
  },
]

export function findService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

export function formatPeso(amount: number): string {
  return pesoFormatter.format(amount)
}

/** "₱1,000 – ₱1,500" or a single figure when min and max match. */
export function formatPriceRange(service: Pick<Service, 'priceMin' | 'priceMax'>): string {
  if (service.priceMin === service.priceMax) return formatPeso(service.priceMin)
  return `${formatPeso(service.priceMin)} – ${formatPeso(service.priceMax)}`
}
