export type FieldSpec = {
  name: string
  label: string
  required?: boolean
  email?: boolean
  max?: number
}

export type Validated =
  | { ok: true; fields: Record<string, string> }
  | { ok: false; error: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Reads the expected fields off a FormData, trims them, and enforces the
 * required/email/length rules. Anything not in `spec` is ignored so a crafted
 * post cannot smuggle extra keys into the notification.
 */
export function validateForm(formData: FormData, spec: FieldSpec[]): Validated {
  // Honeypot: a filled hidden field means a bot. Fail quietly as a success on
  // the caller's side is handled there; here we just report it.
  if ((formData.get('company_website_hp') as string | null)?.trim()) {
    return { ok: false, error: 'spam' }
  }

  const fields: Record<string, string> = {}

  for (const field of spec) {
    const raw = formData.get(field.name)
    const value = typeof raw === 'string' ? raw.trim() : ''

    if (field.required && !value) {
      return { ok: false, error: `${field.label} is required.` }
    }
    if (value && field.email && !EMAIL.test(value)) {
      return { ok: false, error: `Please enter a valid email address.` }
    }
    if (value.length > (field.max ?? 2000)) {
      return { ok: false, error: `${field.label} is too long.` }
    }

    if (value) fields[field.name] = value
  }

  return { ok: true, fields }
}

/** Collects uploaded files as metadata (size-capped) for the notification. */
export function collectFiles(formData: FormData, names: string[], maxBytes = 8 * 1024 * 1024) {
  const attachments: { field: string; filename: string; size: number; type: string }[] = []

  for (const name of names) {
    for (const entry of formData.getAll(name)) {
      if (typeof entry === 'string' || !entry) continue
      const file = entry as File
      if (!file.name || file.size === 0) continue
      if (file.size > maxBytes) {
        return { error: `${file.name} exceeds the ${Math.round(maxBytes / 1024 / 1024)}MB limit.` }
      }
      attachments.push({ field: name, filename: file.name, size: file.size, type: file.type })
    }
  }

  return { attachments }
}
