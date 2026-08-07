'use client'

import { useState } from 'react'
import { postForm, type SubmitState } from '@/lib/forms'
import { Field, FileInput, FormSection, Honeypot, Select, TextArea, TextInput } from './Fields'
import { FormShell } from './FormShell'

const experience = [
  'No export experience yet',
  'Less than 2 years',
  '2–5 years',
  '5–10 years',
  'More than 10 years',
]

export function SupplierForm() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setState({ status: 'submitting' })
    try {
      const { reference, message } = await postForm('/api/supplier', formData)
      setState({ status: 'success', reference, message })
      form.reset()
      window.scrollTo({ top: Math.max(0, window.scrollY - 200), behavior: 'smooth' })
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
      successTitle="Supplier registration received"
      submitLabel="Become a CK Supplier"
      footnote="Fields marked * are required. Documents are reviewed by our procurement team and treated as commercially confidential."
    >
      <Honeypot />

      <FormSection index="01" title="Company" description="Tell us who you are and where you produce.">
        <Field label="Company Name" name="companyName" required>
          <TextInput name="companyName" required autoComplete="organization" />
        </Field>
        <Field label="Country" name="country" required>
          <TextInput name="country" required autoComplete="country-name" />
        </Field>
        <Field label="Company Website" name="website" className="sm:col-span-2">
          <TextInput name="website" type="url" placeholder="https://" />
        </Field>
      </FormSection>

      <FormSection
        index="02"
        title="Production & Capability"
        description="What you produce, at what scale, to which standards."
      >
        <Field label="Products" name="products" required className="sm:col-span-2">
          <TextArea
            name="products"
            rows={3}
            required
            placeholder="e.g. Sona Masoori rice, cumin seeds, turmeric — with grades where relevant"
          />
        </Field>
        <Field label="Monthly Production Capacity" name="capacity" required>
          <TextInput name="capacity" required placeholder="e.g. 2,000 MT / month" />
        </Field>
        <Field label="Export Experience" name="exportExperience">
          <Select name="exportExperience" options={experience} placeholder="Select experience" />
        </Field>
        <Field label="Existing Export Markets" name="exportMarkets" className="sm:col-span-2">
          <TextInput name="exportMarkets" placeholder="e.g. UAE, Saudi Arabia, UK, Kenya" />
        </Field>
        <Field label="Certifications" name="certifications" className="sm:col-span-2">
          <TextInput
            name="certifications"
            placeholder="e.g. ISO 22000, HACCP, FSSAI, Organic, Halal, BRC"
          />
        </Field>
        <Field label="Available Packaging" name="packaging">
          <TextInput name="packaging" placeholder="e.g. 25kg PP, 50kg jute, 1MT jumbo" />
        </Field>
        <Field label="Indicative Pricing" name="pricing" hint="Include the Incoterm and basis.">
          <TextInput name="pricing" placeholder="e.g. USD 520/MT FOB Mundra" />
        </Field>
      </FormSection>

      <FormSection index="03" title="Contact" description="Who our procurement team should speak to.">
        <Field label="Contact Person" name="contactPerson" required>
          <TextInput name="contactPerson" required autoComplete="name" />
        </Field>
        <Field label="WhatsApp" name="whatsapp" required>
          <TextInput name="whatsapp" type="tel" required placeholder="+91 00000 00000" />
        </Field>
        <Field label="Email" name="email" required className="sm:col-span-2">
          <TextInput name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Additional Notes" name="notes" className="sm:col-span-2">
          <TextArea
            name="notes"
            rows={4}
            placeholder="Anything else we should know about your operation."
          />
        </Field>
      </FormSection>

      <FormSection
        index="04"
        title="Documents"
        description="Upload up to 8MB per file — PDF, DOC or image."
      >
        <Field label="Company Profile" name="companyProfile">
          <FileInput name="companyProfile" />
        </Field>
        <Field label="Product Catalogue" name="productCatalogue">
          <FileInput name="productCatalogue" />
        </Field>
        <Field label="Certifications" name="certificates" className="sm:col-span-2">
          <FileInput name="certificates" multiple />
        </Field>
      </FormSection>
    </FormShell>
  )
}
