/**
 * Shown on the homepage AND emitted as FAQPage JSON-LD in the root layout.
 * Keep them in one place: Google requires the structured data to match visible content.
 */
export const BOOKING_URL = 'https://cal.com/ehdcdigital/needawebsite'

export const faqs = [
  {
    question: 'What does ehdcDigital do?',
    answer:
      'ehdcDigital designs and builds high-converting websites for startups, agencies and founders. Services cover web design (UI/UX), Webflow development, branding and automations.',
  },
  {
    question: 'Who is behind ehdcDigital?',
    answer:
      'Erik Hudec, a Prague-based web designer and Webflow Certified Partner. He has spent the last five years building Webflow sites and automations for clients worldwide, with a focus on accessibility, UX and SEO.',
  },
  {
    question: 'Why build my website in Webflow?',
    answer:
      'Webflow sites are fast, scalable and easy to edit without code. As a Webflow Certified Partner, Erik builds sites your team can update on its own, with a CMS for pages like blogs, case studies or job listings.',
  },
  {
    question: 'Can I update the website myself after launch?',
    answer:
      'Yes. Every site is handed over so you can edit text, images and CMS content yourself, no developer needed. Ongoing support plans are available if you would rather have changes handled for you.',
  },
  {
    question: 'Do you work with clients outside Slovakia and the Czech Republic?',
    answer:
      'Yes. ehdcDigital works with clients worldwide, remotely, in English, Slovak and Czech.',
  },
  {
    question: 'How do I start a project?',
    answer:
      'Book a free intro call at cal.com/ehdcdigital/needawebsite or email info@ehdcdigital.com. We talk through your goals, then you get a proposal with scope, timeline and price.',
  },
] as const
