// Content for the password-gated support plans page (/support).
// Client-facing only — the internal notes from the source document are
// deliberately not included here.

export const meta = {
  brand: 'ehdcDigital',
  person: 'Erik Hudec',
  validity: 'Prices without VAT · valid 30 days',
  eyebrow: 'Ongoing support for a site that is already live',
  title: 'Two plans, one price a month',
  lede: 'No hours to count, no timesheets, no reports to read. You add what you need to a shared board, I work down it in order, and the same amount leaves your account every month.',
  email: 'info@ehdcdigital.com',
  callUrl: 'https://cal.com/ehdcdigital',
  tagline: 'Webflow sites for energy, utility and industrial companies',
}

export type Plan = {
  name: string
  price: string
  who: string
  featured?: boolean
  badge?: string
  cta: string
  inherits?: string
  plusLabel?: string
  features: Feature[]
  footnote?: string
}

// `lead` renders in the foreground weight, `text` follows in the body tone.
// `short` is the condensed label used when Care's features are recapped
// inside Care & Build, so the premium card visibly contains the cheaper one.
export type Feature = { lead?: string; text: string; short?: string }

export const plans: Plan[] = [
  {
    name: 'Care',
    price: '€120',
    who: 'For a site that works and needs to keep working.',
    cta: 'Choose Care',
    features: [
      {
        text: 'Small changes whenever you need them — text, prices, photos, PDFs, a new reference or news item. Add as many as you like to the board.',
        short: 'Small changes, as many as you like',
      },
      { text: 'Done within five working days, usually sooner.', short: 'Done within five working days' },
      { text: 'A backup taken before anything is touched.', short: 'A backup before anything is touched' },
      { text: 'If the site goes down, the alert reaches me, not you.', short: 'Downtime alerts reach me, not you' },
      { text: 'Enquiry forms tested every month, so you know they arrive.', short: 'Enquiry forms tested monthly' },
      { text: 'Domain, hosting and certificate renewals flagged a month ahead.', short: 'Renewals flagged a month ahead' },
    ],
    footnote:
      'A small change is something I can do in under half an hour. Anything larger gets tagged “Bigger thing” on the board before I start — so you see it coming, and it never turns up on an invoice.',
  },
  {
    name: 'Care & Build',
    price: '€390',
    who: 'For a site that has to keep up with the business.',
    featured: true,
    badge: 'Most clients',
    cta: 'Choose Care & Build',
    inherits: 'Everything in Care',
    plusLabel: 'Plus, every month',
    features: [
      {
        lead: 'One bigger thing every month.',
        text: 'A new service page, a landing page for a tender, a language version, a new section in the CMS, a batch of content published.',
      },
      { text: 'Anything tagged “Bigger thing” on the board is live before the end of the month.' },
      { text: 'An answer from me by the next working day.' },
      { text: 'Skip a month and it carries over, so you can put two months into something larger.' },
    ],
  },
]

export const biggerNote =
  'Anything bigger than that — a rebuild, a new site, an integration with your systems — is quoted as its own project, with a fixed price agreed before it starts. Your plan keeps running while we do it.'

export const howItWorks = [
  {
    title: 'Add what you need to the board',
    body: 'One line is enough. Anyone on your team can add to it, from a phone. Nothing gets lost in a phone call or somebody’s inbox.',
  },
  {
    title: 'I work down it in order',
    body: 'One at a time, from the top. Tick “Urgent” and it moves to the front — no approval, no extra cost, no email needed.',
  },
  {
    title: 'The board is the report',
    body: 'You can see what I am doing right now, what is waiting on you, and what is finished. No monthly summary to read.',
  },
]

export type BoardTag = 'small' | 'build' | 'urgent'
export type BoardColumnColor = 'gray' | 'blue' | 'yellow' | 'green'

export type BoardCard = {
  id: string
  title: string
  tag: BoardTag
}

export type BoardColumn = {
  id: string
  title: string
  color: BoardColumnColor
  cards: BoardCard[]
}

// Starting arrangement for the interactive board. Cards need stable ids so
// they keep their identity as they are dragged between columns.
export const initialColumns: BoardColumn[] = [
  {
    id: 'new',
    title: 'New',
    color: 'gray',
    cards: [
      { id: 'c1', title: 'Update the price list PDF on Services', tag: 'small' },
      { id: 'c2', title: 'Add three new reference projects', tag: 'small' },
      { id: 'c3', title: 'Landing page for the Bratislava tender', tag: 'build' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In progress',
    color: 'blue',
    cards: [{ id: 'c4', title: 'New certificate on the Quality page', tag: 'urgent' }],
  },
  {
    id: 'waiting',
    title: 'Waiting on you',
    color: 'yellow',
    cards: [{ id: 'c5', title: 'Team photos — need the new files', tag: 'small' }],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'green',
    cards: [
      { id: 'c6', title: 'Contact form now copies the service inbox', tag: 'small' },
      { id: 'c7', title: 'Czech version of the Services section', tag: 'build' },
    ],
  },
]

// Segments so the two tag names keep their emphasis in the rendered note.
export const boardNote: { text: string; strong?: boolean }[] = [
  { text: 'I tag each request ' },
  { text: 'Small', strong: true },
  { text: ' or ' },
  { text: 'Bigger thing', strong: true },
  {
    text: ' when I pick it up, so you always know what your plan covers before any work starts — and nothing arrives as a surprise on an invoice.',
  },
]

export const terms = [
  {
    lead: 'Three months to start,',
    rest: ' then it runs month to month. Cancel any time after that with 30 days’ notice.',
  },
  {
    lead: 'Paid automatically',
    rest: ' on the same day each month, by card or bank debit, with the invoice emailed to you the moment it goes through. Nobody has to remember anything.',
  },
  {
    lead: 'Change plan whenever.',
    rest: ' Tell me, and it applies from the next month — up or down.',
  },
  {
    lead: 'Your Webflow plan and domain stay on your own account,',
    rest: ' in your name. They are not part of the fee, and you are never locked to me.',
  },
]

export const exclusions = [
  'A new website or a rebuild',
  'Brand identity and logo design',
  'Writing long texts from a blank page',
  'Photography, video, paid advertising',
]
