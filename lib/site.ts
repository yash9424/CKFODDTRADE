export const site = {
  name: 'CK Foodstuff Trading LLC',
  shortName: 'CK Foodstuff',
  tagline: 'Global Sourcing. Reliable Supply. Trusted Partnerships.',
  description:
    'CK Foodstuff Trading LLC is a Dubai-headquartered international food trading, sourcing, import, export and distribution company supplying rice, spices, fresh fruits, vegetables and dairy to the UAE, GCC and international markets.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ckfoodstuff.com',
  phone: '+971 56 620 2044',
  phoneHref: '+971566202044',
  whatsapp: '971566202044',
  email: 'ckfoodstuff@gmail.com',
  address: {
    line1: 'Office B01',
    line2: 'Al Abbas 2 Building',
    line3: 'Bank Street, Bur Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
  },
} as const

export const addressLines = [
  site.address.line1,
  site.address.line2,
  site.address.line3,
  site.address.city,
  site.address.country,
]

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      `Hello CK Foodstuff Trading LLC, I would like to discuss a food sourcing requirement.`,
  )
  return `https://wa.me/${site.whatsapp}?text=${text}`
}
