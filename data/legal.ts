export type LegalDoc = {
  slug: string
  title: string
  description: string
  updated: string
  intro: string
  sections: { heading: string; body: string[] }[]
}

const company = 'CK Foodstuff Trading LLC'
const updated = '1 January 2026'

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      'How CK Foodstuff Trading LLC collects, uses and protects the information you provide through this website.',
    updated,
    intro: `This Privacy Policy explains how ${company} ("CK Foodstuff", "we", "us") handles personal and business information submitted through this website.`,
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'We collect the information you choose to give us through our enquiry forms. This typically includes your name, company name, country, email address, telephone or WhatsApp number, and the commercial details of your enquiry such as product, quantity, packaging, destination port and delivery requirements.',
          'Suppliers registering with us may additionally submit production capacity, export experience, certifications, indicative pricing and supporting documents such as a company profile or product catalogue.',
          'We also collect standard technical information that your browser sends when you visit a website, such as your IP address, browser type and the pages you view.',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'We use the information you provide to respond to your enquiry, prepare quotations, evaluate sourcing relationships, coordinate shipments and maintain our commercial relationship with you.',
          'We may use your contact details to follow up on an enquiry or to share information about products and services that are relevant to your stated requirements. You may ask us to stop at any time.',
          'We do not sell your personal information.',
        ],
      },
      {
        heading: 'Sharing',
        body: [
          'We may share the commercial details of an enquiry with suppliers, logistics providers, inspection agencies and other parties strictly where this is necessary to source, quote or fulfil your requirement.',
          'We may share information where we are required to do so by law or by a competent regulatory authority.',
        ],
      },
      {
        heading: 'Retention and security',
        body: [
          'We retain enquiry records for as long as necessary to serve the commercial relationship and to meet our legal and accounting obligations.',
          'We take reasonable technical and organisational measures to protect the information you provide. No transmission over the internet can be guaranteed to be completely secure.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You may request access to the personal information we hold about you, ask us to correct it, or ask us to delete it where we are not required to retain it.',
          'To make a request, contact us at ckfoodstuff@gmail.com or on +971 56 620 2044.',
        ],
      },
    ],
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    description:
      'The terms governing use of the CK Foodstuff Trading LLC website and the basis on which information is published.',
    updated,
    intro: `These terms govern your use of this website, operated by ${company}. By using the site you accept them.`,
    sections: [
      {
        heading: 'Website content',
        body: [
          'The content of this website is provided for general information about our trading, sourcing and distribution activities. It does not constitute an offer, a quotation, or a commitment to supply any product at any price or volume.',
          'Product availability, specifications, packaging, grades, origins and prices are confirmed only in writing through a specific quotation or contract issued by CK Foodstuff.',
        ],
      },
      {
        heading: 'Forward-looking statements',
        body: [
          'Container volumes, growth targets and expansion plans published on this website represent management’s planned trading opportunities and objectives. They are not guarantees of future trading volumes, revenues or performance, and they may change.',
        ],
      },
      {
        heading: 'Contracts of sale',
        body: [
          'Any sale, purchase or supply arrangement is governed exclusively by the contract, proforma invoice or written agreement signed between CK Foodstuff and the counterparty, including the agreed Incoterm, specification, inspection basis and payment terms.',
          'Nothing on this website varies or overrides the terms of such an agreement.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The CK Foodstuff name, logo, text, graphics and layout of this website are the property of CK Foodstuff Trading LLC and may not be reproduced without permission.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'To the fullest extent permitted by law, CK Foodstuff is not liable for any loss arising from reliance on information published on this website.',
          'This website may link to third-party sites. We are not responsible for their content.',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'These terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai, and the courts of Dubai have jurisdiction.',
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    description:
      'How cookies and similar technologies are used on the CK Foodstuff Trading LLC website.',
    updated,
    intro:
      'This policy explains how cookies and similar technologies are used on this website and how you can control them.',
    sections: [
      {
        heading: 'What cookies are',
        body: [
          'Cookies are small text files placed on your device by a website. They are widely used to make websites work, to remember your preferences, and to provide information to site owners about how a site is used.',
        ],
      },
      {
        heading: 'How we use them',
        body: [
          'This website uses strictly necessary cookies required for the site to function and for security.',
          'Where analytics or marketing technologies are enabled, they are used to understand which pages and products attract interest so that we can improve the site. These are not required for the site to work.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'You can accept, block or delete cookies through your browser settings. Blocking strictly necessary cookies may affect how parts of the site behave.',
        ],
      },
      {
        heading: 'Questions',
        body: ['For any question about this policy, contact ckfoodstuff@gmail.com.'],
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    description:
      'Important notices regarding trading information, planned volumes and investment content published by CK Foodstuff Trading LLC.',
    updated,
    intro:
      'Please read the following notices carefully. They apply to all information published on this website.',
    sections: [
      {
        heading: 'Planned volumes are not guarantees',
        body: [
          'All container figures published on this website — including initial planned volumes of 120–140 containers per month, per-product opportunities, and growth targets of 200, 250 and 500 containers per month — represent management’s planned trading opportunities and growth objectives.',
          'They should not be interpreted as guaranteed future volumes, confirmed orders, or assured financial performance.',
        ],
      },
      {
        heading: 'Products under development',
        body: [
          'Certain categories described on this website, including European milk powder sourcing and the extended spice, fruit and vegetable ranges, are under development or are subject to season, customer demand and confirmed sourcing availability.',
          'Their inclusion on this website does not imply immediate availability.',
        ],
      },
      {
        heading: 'No investment offer',
        body: [
          'Information published about Project Emerald is provided for general corporate information only. It is not an offer of securities, an invitation to invest, or financial advice, and no returns of any kind are promised or implied.',
          'Detailed investment terms remain within private investor documentation and are provided only through an appropriate investor review and due-diligence process.',
        ],
      },
      {
        heading: 'Imagery',
        body: [
          'Photography and graphics on this website are illustrative of the categories we trade. They do not depict a specific consignment, grade, packaging format or third-party brand.',
        ],
      },
      {
        heading: 'Accuracy',
        body: [
          'We take care to keep this website accurate and current, but content may change without notice. Confirmed commercial information is issued only in a written quotation or contract.',
        ],
      },
    ],
  },
]

export function getLegalDoc(slug: string) {
  return legalDocs.find((doc) => doc.slug === slug)
}
