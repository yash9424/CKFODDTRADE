export type Letter = {
  slug: string
  name: string
  role: string
  initials: string
  eyebrow: string
  salutation: string
  paragraphs: string[]
  /** Rendered as a stacked emphasis block after the paragraphs. */
  pillars?: string[]
  pillarsIntro?: string
  chain?: string[]
  chainIntro?: string
  closing?: string[]
  bigStatement?: string
  bigStatementIntro?: string
}

export const ceoLetter: Letter = {
  slug: 'ceo',
  name: 'Chirag Kumar Trivedi',
  role: 'Chief Executive Officer',
  initials: 'CT',
  eyebrow: 'Letter from the CEO',
  salutation: 'Welcome to CK Foodstuff Trading LLC.',
  paragraphs: [
    'Our company has been established with a clear ambition: to build a trusted international food trading platform connecting quality producers with growing markets across the UAE, GCC and internationally.',
    'From our headquarters in Dubai and our procurement operations in Surat and Mumbai, India, we are developing an integrated sourcing network focused on quality, reliability, competitive procurement and professional execution.',
    'Our growing portfolio includes Sona Masoori Rice, 1101 and 1102 Rice, cumin seeds, black pepper, cinnamon, cloves and other selected spices, together with pomegranates, grapes, carrots and other fresh fruits and vegetables.',
    'We are also developing our European sourcing network for premium milk powder.',
    'For CK Foodstuff, successful food trading is about more than buying and selling products.',
    'It requires dependable suppliers, consistent product specifications, efficient logistics, transparent communication and a clear understanding of each customer’s requirements.',
    'Our objective is therefore to establish long-term relationships with producers, distributors, wholesalers, retailers, hospitality groups, food processors and institutional buyers.',
  ],
  pillarsIntro: 'As CK Foodstuff continues to expand, our commitment remains simple:',
  pillars: [
    'Quality Products.',
    'Reliable Supply.',
    'Professional Service.',
    'Long-Term Partnerships.',
  ],
  closing: [
    'We welcome customers, suppliers and strategic partners from around the world to become part of CK Foodstuff’s growth journey.',
  ],
}

export const chairmanLetter: Letter = {
  slug: 'chairman',
  name: 'Rolando Lazar',
  role: 'Chairman & Managing Director',
  initials: 'RL',
  eyebrow: 'Letter from the Chairman & Managing Director',
  salutation: 'Dear Customers, Partners and Friends,',
  paragraphs: [
    'International food trading is built on something more valuable than any individual transaction: trust.',
    'At CK Foodstuff Trading LLC, our vision is to build an international food sourcing and distribution platform where producers, suppliers and customers can establish strong, transparent and sustainable commercial relationships.',
    'Dubai provides us with an exceptional gateway connecting Asia, the Middle East, Africa and Europe.',
    'Combined with our procurement operations in Surat and Mumbai, this provides CK Foodstuff with a strong foundation from which to develop an increasingly diversified international supply network.',
    'Our strategy focuses on essential food products with recurring international demand, including rice, spices, fresh fruits, vegetables and selected dairy products.',
    'But our ambition extends beyond individual commodities.',
  ],
  chainIntro: 'We are building an organization capable of coordinating the complete commercial journey:',
  chain: [
    'Sourcing',
    'Procurement',
    'Quality Coordination',
    'Logistics',
    'International Trade',
    'Distribution',
    'Customer Delivery',
  ],
  closing: [
    'Our growth strategy is based on scale, but scale must never come at the expense of quality, financial discipline or customer relationships.',
    'We therefore intend to grow CK Foodstuff through carefully selected suppliers, professional operations, disciplined financial controls and long-term partnerships with serious international buyers.',
    'Whether you are a producer seeking access to international markets, a distributor looking for a dependable supply partner, or an organization requiring large-volume food procurement, our team welcomes the opportunity to work with you.',
  ],
  bigStatementIntro: 'Our goal is clear:',
  bigStatement:
    'To become a trusted bridge between quality food producers and international markets.',
}

export const letters = [ceoLetter, chairmanLetter]
