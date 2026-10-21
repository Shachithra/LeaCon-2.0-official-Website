import { siteConfig } from '../config/site'
import type { FaqItem } from '../components/Content'

/**
 * Register questions (blueprint: `faq`).
 *
 * Only questions with an answer that is true today are built. The answers
 * describe status honestly rather than filling a gap: no date, fee, deadline,
 * venue or eligibility claim is made on this page.
 */
export function buildFaq(): FaqItem[] {
  return [
    {
      question: 'How do I register?',
      answer: siteConfig.registrationUrl
        ? 'Open the official registration button on this page. It goes straight to the organiser’s own registration — nothing on this site takes your details.'
        : 'Registration runs through one official link. It replaces the coming-soon line on this page the moment the organisers publish it.',
    },
    {
      question: 'When and where is the event?',
      answer:
        'Date and venue are confirmed by the organisers and published on the Event page. Nothing on this site is estimated, so no date or venue appears until it is fixed.',
    },
    {
      question: 'Is there a fee?',
      answer:
        'Any fee is confirmed by the organisers and published on the Event page alongside the rest of the practical information. No figure appears here until it is official.',
    },
    {
      question: 'Does this site collect my details?',
      answer:
        'No. There is no form, no account and no payment step here — this site only points you to the official registration route.',
    },
    {
      question: 'Who can I contact with a question?',
      answer: siteConfig.contactEmail
        ? `Write to ${siteConfig.contactEmail} and the organisers will answer.`
        : 'Organiser contact details are published on this page as soon as they are confirmed.',
    },
  ]
}
