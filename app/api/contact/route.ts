import { NextResponse } from 'next/server'
import { makeReference, recordSubmission } from '@/lib/submissions'
import { validateForm, type FieldSpec } from '@/lib/validate'

export const runtime = 'nodejs'

const spec: FieldSpec[] = [
  { name: 'fullName', label: 'Full name', required: true, max: 120 },
  { name: 'companyName', label: 'Company name', max: 160 },
  { name: 'country', label: 'Country', max: 80 },
  { name: 'email', label: 'Email', required: true, email: true, max: 160 },
  { name: 'phone', label: 'WhatsApp / telephone', max: 60 },
  { name: 'subject', label: 'Subject', required: true, max: 120 },
  { name: 'message', label: 'Message', required: true, max: 4000 },
]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = validateForm(formData, spec)

    if (!result.ok) {
      if (result.error === 'spam') {
        return NextResponse.json({ ok: true, reference: 'CKC-000000', message: 'Thank you.' })
      }
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 })
    }

    const reference = makeReference('CKC')
    await recordSubmission({
      type: 'contact',
      reference,
      receivedAt: new Date().toISOString(),
      fields: result.fields,
    })

    return NextResponse.json({
      ok: true,
      reference,
      message:
        'Thank you for contacting CK Foodstuff Trading LLC. A member of our team will respond to your message shortly.',
    })
  } catch (error) {
    console.error('[ck-foodstuff] contact route failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please email ckfoodstuff@gmail.com.' },
      { status: 500 },
    )
  }
}
