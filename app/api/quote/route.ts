import { NextResponse } from 'next/server'
import { makeReference, recordSubmission } from '@/lib/submissions'
import { collectFiles, validateForm, type FieldSpec } from '@/lib/validate'

export const runtime = 'nodejs'

const spec: FieldSpec[] = [
  { name: 'fullName', label: 'Full name', required: true, max: 120 },
  { name: 'companyName', label: 'Company name', required: true, max: 160 },
  { name: 'country', label: 'Country', required: true, max: 80 },
  { name: 'email', label: 'Email', required: true, email: true, max: 160 },
  { name: 'phone', label: 'WhatsApp / telephone', required: true, max: 60 },
  { name: 'product', label: 'Product required', required: true, max: 80 },
  { name: 'quantityTons', label: 'Quantity (metric tons)', max: 60 },
  { name: 'quantityContainers', label: 'Number of containers', max: 60 },
  { name: 'destinationCountry', label: 'Destination country', required: true, max: 80 },
  { name: 'destinationPort', label: 'Destination port', max: 120 },
  { name: 'deliveryDate', label: 'Required delivery date', max: 40 },
  { name: 'packaging', label: 'Packaging', max: 200 },
  { name: 'grade', label: 'Grade / specification', max: 300 },
  { name: 'incoterm', label: 'Incoterm', max: 40 },
  { name: 'requirements', label: 'Additional requirements', max: 3000 },
  { name: 'intent', label: 'Enquiry type', max: 40 },
]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = validateForm(formData, spec)

    if (!result.ok) {
      // Silently accept honeypot hits so bots get no signal.
      if (result.error === 'spam') {
        return NextResponse.json({ ok: true, reference: 'CKQ-000000', message: 'Thank you.' })
      }
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 })
    }

    // At least one quantity figure is needed to price anything.
    if (!result.fields.quantityTons && !result.fields.quantityContainers) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a quantity in metric tons or number of containers.' },
        { status: 400 },
      )
    }

    const files = collectFiles(formData, ['specification'])
    if ('error' in files && files.error) {
      return NextResponse.json({ ok: false, error: files.error }, { status: 400 })
    }

    const reference = makeReference('CKQ')
    await recordSubmission({
      type: 'quote',
      reference,
      receivedAt: new Date().toISOString(),
      fields: result.fields,
      attachments: files.attachments,
    })

    return NextResponse.json({
      ok: true,
      reference,
      message:
        'Thank you for your inquiry. Our commercial team will review your requirements and contact you regarding availability, specifications and commercial terms.',
    })
  } catch (error) {
    console.error('[ck-foodstuff] quote route failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please email ckfoodstuff@gmail.com.' },
      { status: 500 },
    )
  }
}
