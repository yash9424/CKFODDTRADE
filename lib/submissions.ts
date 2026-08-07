import { appendFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

export type Submission = {
  type: 'quote' | 'supplier' | 'contact' | 'investor'
  reference: string
  receivedAt: string
  fields: Record<string, string>
  attachments?: { field: string; filename: string; size: number; type: string }[]
}

/**
 * Where enquiries go.
 *
 * Out of the box every submission is written to `data/submissions.jsonl` and
 * logged, so nothing is lost before a mail provider is wired up. Set either
 * env var below and it is forwarded as well:
 *
 *   FORM_WEBHOOK_URL  — POSTs the submission as JSON (Zapier, Make, n8n, CRM)
 *   RESEND_API_KEY    — emails the submission via Resend to NOTIFY_EMAIL
 *                       (defaults to ckfoodstuff@gmail.com)
 */
export async function recordSubmission(submission: Submission) {
  const results = await Promise.allSettled([
    persistToDisk(submission),
    forwardToWebhook(submission),
    sendEmail(submission),
  ])

  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('[ck-foodstuff] submission delivery step failed:', result.reason)
    }
  }
}

async function persistToDisk(submission: Submission) {
  // Serverless filesystems are read-only; treat a write failure as non-fatal
  // because the console log below is still captured by the platform.
  console.log(
    `[ck-foodstuff] ${submission.type} enquiry ${submission.reference}`,
    JSON.stringify(submission.fields),
  )

  try {
    const dir = join(process.cwd(), 'data')
    await mkdir(dir, { recursive: true })
    await appendFile(join(dir, 'submissions.jsonl'), JSON.stringify(submission) + '\n', 'utf8')
  } catch (error) {
    console.warn('[ck-foodstuff] could not persist submission to disk:', error)
  }
}

async function forwardToWebhook(submission: Submission) {
  const url = process.env.FORM_WEBHOOK_URL
  if (!url) return

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) {
    throw new Error(`webhook responded ${response.status}`)
  }
}

async function sendEmail(submission: Submission) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const to = process.env.NOTIFY_EMAIL ?? 'ckfoodstuff@gmail.com'
  const from = process.env.NOTIFY_FROM ?? 'CK Foodstuff Website <onboarding@resend.dev>'

  const rows = Object.entries(submission.fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#7C817F;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap">${escapeHtml(
          humanise(key),
        )}</td><td style="padding:6px 0;color:#2E3130;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  const attachments = submission.attachments?.length
    ? `<p style="margin-top:18px;font-size:13px;color:#565B59">Attachments: ${submission.attachments
        .map((a) => `${escapeHtml(a.filename)} (${Math.round(a.size / 1024)} KB)`)
        .join(', ')}</p>`
    : ''

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `[${submission.type.toUpperCase()}] ${submission.reference} — CK Foodstuff website`,
      html: `<div style="font-family:Inter,Arial,sans-serif">
        <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#A9851E">CK Foodstuff Trading LLC</p>
        <h2 style="margin:8px 0 4px;color:#052A1D">New ${humanise(submission.type)} submission</h2>
        <p style="margin:0 0 18px;color:#7C817F;font-size:13px">Reference ${submission.reference} · ${submission.receivedAt}</p>
        <table style="border-collapse:collapse">${rows}</table>
        ${attachments}
      </div>`,
    }),
  })

  if (!response.ok) {
    throw new Error(`resend responded ${response.status}: ${await response.text()}`)
  }
}

function humanise(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** CKQ-XXXXXX style reference the customer can quote back to us. */
export function makeReference(prefix: string) {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5)
  const noise = Math.random().toString(36).toUpperCase().slice(2, 5)
  return `${prefix}-${stamp}${noise}`
}
