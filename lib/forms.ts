/** Shared client-side submit plumbing for every form on the site. */

export type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; reference: string; message: string }
  | { status: 'error'; message: string }

export async function postForm(endpoint: string, formData: FormData) {
  const response = await fetch(endpoint, { method: 'POST', body: formData })

  let payload: { ok?: boolean; reference?: string; message?: string; error?: string } = {}
  try {
    payload = await response.json()
  } catch {
    // A non-JSON body means something upstream failed; fall through to the
    // generic message below rather than throwing a parse error at the user.
  }

  if (!response.ok || !payload.ok) {
    throw new Error(
      payload.error ??
        'We could not submit your request. Please try again, or contact us directly at ckfoodstuff@gmail.com.',
    )
  }

  return {
    reference: payload.reference ?? '',
    message: payload.message ?? 'Thank you for your inquiry.',
  }
}
