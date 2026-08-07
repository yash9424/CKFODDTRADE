'use client'

import { useState } from 'react'
import { postForm, type SubmitState } from '@/lib/forms'
import { Field, FormSection, Honeypot, Select, TextArea, TextInput } from './Fields'
import { FormShell } from './FormShell'

const investorTypes = [
  'Private investor',
  'Family office',
  'Institutional investor',
  'Trade / strategic partner',
  'Financial institution',
  'Other',
]

export function InvestorForm() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setState({ status: 'submitting' })
    try {
      const { reference, message } = await postForm('/api/investor', formData)
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
      successTitle="Investor enquiry received"
      submitLabel="Request Investor Information"
      footnote="Detailed investment terms are not published on this website. They are shared through a formal investor review and due-diligence process."
    >
      <Honeypot />

      <FormSection index="01" title="Your Details" description="Project Emerald enquiries are handled directly by our board.">
        <Field label="Full Name" name="fullName" required>
          <TextInput name="fullName" required autoComplete="name" />
        </Field>
        <Field label="Organisation" name="organisation">
          <TextInput name="organisation" autoComplete="organization" />
        </Field>
        <Field label="Country" name="country" required>
          <TextInput name="country" required autoComplete="country-name" />
        </Field>
        <Field label="Investor Type" name="investorType">
          <Select name="investorType" options={investorTypes} placeholder="Select a category" />
        </Field>
        <Field label="Email" name="email" required>
          <TextInput name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="WhatsApp / Telephone" name="phone">
          <TextInput name="phone" type="tel" />
        </Field>
        <Field label="Message" name="message" className="sm:col-span-2">
          <TextArea
            name="message"
            rows={5}
            placeholder="Areas of interest, investment horizon, questions for the board…"
          />
        </Field>
      </FormSection>
    </FormShell>
  )
}
