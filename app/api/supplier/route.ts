import { NextResponse } from 'next/server'
import { makeReference, recordSubmission } from '@/lib/submissions'
import { collectFiles, validateForm, type FieldSpec } from '@/lib/validate'

export const runtime = 'nodejs'

const spec: FieldSpec[] = [
  { name: 'companyName', label: 'Company name', required: true, max: 160 },
  { name: 'country', label: 'Country', required: true, max: 80 },
  { name: 'website', label: 'Company website', max: 200 },
  { name: 'products', label: 'Products', required: true, max: 600 },
  { name: 'capacity', label: 'Monthly production capacity', required: true, max: 200 },
  { name: 'exportExperience', label: 'Export experience', max: 300 },
  { name: 'exportMarkets', label: 'Existing export markets', max: 400 },
  { name: 'certifications', label: 'Certifications', max: 400 },
  { name: 'packaging', label: 'Available packaging', max: 400 },
  { name: 'pricing', label: 'Indicative pricing', max: 400 },
  { name: 'contactPerson', label: 'Contact person', required: true, max: 120 },
  { name: 'whatsapp', label: 'WhatsApp', required: true, max: 60 },
  { name: 'email', label: 'Email', required: true, email: true, max: 160 },
  { name: 'notes', label: 'Additional notes', max: 3000 },
]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = validateForm(formData, spec)

    if (!result.ok) {
      if (result.error === 'spam') {
        return NextResponse.json({ ok: true, reference: 'CKS-000000', message: 'Thank you.' })
      }
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 })
    }

    const files = collectFiles(formData, ['companyProfile', 'productCatalogue', 'certificates'])
    if ('error' in files && files.error) {
      return NextResponse.json({ ok: false, error: files.error }, { status: 400 })
    }

    const reference = makeReference('CKS')
    await recordSubmission({
      type: 'supplier',
      reference,
      receivedAt: new Date().toISOString(),
      fields: result.fields,
      attachments: files.attachments,
    })

    return NextResponse.json({
      ok: true,
      reference,
      message:
        'Thank you for registering. Our procurement team will review your company profile and contact you regarding potential sourcing opportunities.',
    })
  } catch (error) {
    console.error('[ck-foodstuff] supplier route failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please email ckfoodstuff@gmail.com.' },
      { status: 500 },
    )
  }
}
