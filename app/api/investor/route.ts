import { NextResponse } from 'next/server'
import { makeReference, recordSubmission } from '@/lib/submissions'
import { validateForm, type FieldSpec } from '@/lib/validate'

export const runtime = 'nodejs'

const spec: FieldSpec[] = [
  { name: 'fullName', label: 'Full name', required: true, max: 120 },
  { name: 'organisation', label: 'Organisation', max: 160 },
  { name: 'country', label: 'Country', required: true, max: 80 },
  { name: 'email', label: 'Email', required: true, email: true, max: 160 },
  { name: 'phone', label: 'WhatsApp / telephone', max: 60 },
  { name: 'investorType', label: 'Investor type', max: 80 },
  { name: 'message', label: 'Message', max: 3000 },
]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = validateForm(formData, spec)

    if (!result.ok) {
      if (result.error === 'spam') {
        return NextResponse.json({ ok: true, reference: 'CKI-000000', message: 'Thank you.' })
      }
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 })
    }

    const reference = makeReference('CKI')
    await recordSubmission({
      type: 'investor',
      reference,
      receivedAt: new Date().toISOString(),
      fields: result.fields,
    })

    return NextResponse.json({
      ok: true,
      reference,
      message:
        'Thank you for your interest in Project Emerald. Detailed investment information is provided through our investor review and due-diligence process; a member of our team will be in contact.',
    })
  } catch (error) {
    console.error('[ck-foodstuff] investor route failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please email ckfoodstuff@gmail.com.' },
      { status: 500 },
    )
  }
}
