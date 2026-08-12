import type { MetadataRoute } from 'next'
import { productCategories } from '@/data/products'
import { legalDocs } from '@/data/legal'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: { path: string; priority: number; frequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, frequency: 'weekly' },
    { path: '/products', priority: 0.9, frequency: 'weekly' },
    { path: '/request-a-quote', priority: 0.9, frequency: 'monthly' },
    { path: '/services', priority: 0.8, frequency: 'monthly' },
    { path: '/about', priority: 0.8, frequency: 'monthly' },
    { path: '/supply-chain', priority: 0.7, frequency: 'monthly' },
    { path: '/become-a-supplier', priority: 0.7, frequency: 'monthly' },
    { path: '/investors', priority: 0.6, frequency: 'monthly' },
    { path: '/reports', priority: 0.7, frequency: 'monthly' },
    { path: '/contact', priority: 0.8, frequency: 'monthly' },
  ]

  return [
    ...core.map((entry) => ({
      url: `${site.url}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.frequency,
      priority: entry.priority,
    })),
    ...productCategories.map((category) => ({
      url: `${site.url}/products/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...legalDocs.map((doc) => ({
      url: `${site.url}/legal/${doc.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
