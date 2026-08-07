'use client'

import { useState } from 'react'
import { postForm, type SubmitState } from '@/lib/forms'
import { Field, FormSection, Honeypot, Select, TextArea, TextInput } from './Fields'
import { FormShell } from './FormShell'

const subjects = [
  'Purchase enquiry / quotation',
  'Supply partnership',
  'New product introduction',
  'Logistics & shipping',
  'Investor relations',
  'General enquiry',
]

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setState({ status: 'submitting' })
    try {
      const { reference, message } = await postForm('/api/contact', formData)
      setState({ status: 'success', reference, message })
      form.reset()
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Submission failed.',
      })
    }
  }

  return (
    <FormShell
      state={state}
      onSubmit={handleSubmit}
      onReset={() => setState({ status: 'idle' })}
      successTitle="Message sent"
      submitLabel="Send Message"
      footnote="Need a price? The full RFQ form gets you a faster, more accurate quotation."
    >
      <Honeypot />

      <FormSection index="01" title="Your Details" description="So we can reply to the right person.">
        <Field label="Full Name" name="fullName" required>
          <TextInput name="fullName" required autoComplete="name" />
        </Field>
        <Field label="Company Name" name="companyName">
          <TextInput name="companyName" autoComplete="organization" />
        </Field>
        <Field label="Email" name="email" required>
          <TextInput name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="WhatsApp / Telephone" name="phone">
          <TextInput name="phone" type="tel" />
        </Field>
        <Field label="Country" name="country" className="sm:col-span-2">
          <TextInput name="country" autoComplete="country-name" />
        </Field>
      </FormSection>

      <FormSection index="02" title="Your Message" description="Tell us how we can help.">
        <Field label="Subject" name="subject" required className="sm:col-span-2">
          <Select name="subject" options={subjects} required placeholder="Select a subject" />
        </Field>
        <Field label="Message" name="message" required className="sm:col-span-2">
          <TextArea name="message" rows={6} required placeholder="How can we help?" />
        </Field>
      </FormSection>
    </FormShell>
  )
}
