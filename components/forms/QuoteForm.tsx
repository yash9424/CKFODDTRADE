'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { rfqProducts } from '@/data/products'
import { postForm, type SubmitState } from '@/lib/forms'
import { Field, FileInput, FormSection, Honeypot, Select, TextArea, TextInput } from './Fields'
import { FormShell } from './FormShell'

const incoterms = ['EXW', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DDP', 'Not sure yet']

export function QuoteForm() {
  const searchParams = useSearchParams()
  // /request-a-quote?product=Cumin%20Seeds deep-links from the product pages.
  const presetProduct = searchParams.get('product') ?? undefined
  const intent = searchParams.get('intent') ?? 'quotation'

  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('intent', intent)

    setState({ status: 'submitting' })
    try {
      const { reference, message } = await postForm('/api/quote', formData)
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

  const validProduct = presetProduct && rfqProducts.includes(presetProduct) ? presetProduct : undefined

  return (
    <FormShell
      state={state}
      onSubmit={handleSubmit}
      onReset={() => setState({ status: 'idle' })}
      successTitle="Request received"
      submitLabel="Request Quotation"
      footnote="Fields marked * are required. Your details are used solely to prepare and discuss your quotation."
    >
      <Honeypot />

      <FormSection
        index="01"
        title="Customer Information"
        description="Who we should send the quotation to."
      >
        <Field label="Full Name" name="fullName" required>
          <TextInput name="fullName" required autoComplete="name" placeholder="Your full name" />
        </Field>
        <Field label="Company Name" name="companyName" required>
          <TextInput
            name="companyName"
            required
            autoComplete="organization"
            placeholder="Registered company name"
          />
        </Field>
        <Field label="Country" name="country" required>
          <TextInput name="country" required autoComplete="country-name" placeholder="Country" />
        </Field>
        <Field label="Email" name="email" required>
          <TextInput
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
          />
        </Field>
        <Field label="WhatsApp / Telephone" name="phone" required className="sm:col-span-2">
          <TextInput name="phone" type="tel" required placeholder="+971 00 000 0000" />
        </Field>
      </FormSection>

      <FormSection
        index="02"
        title="Product Required"
        description="Select the product. Tell us the exact grade further down if you have one."
      >
        <Field label="Product" name="product" required className="sm:col-span-2">
          <Select
            name="product"
            options={rfqProducts}
            required
            defaultValue={validProduct}
            placeholder="Select a product"
          />
        </Field>
      </FormSection>

      <FormSection
        index="03"
        title="Quantity"
        description="Give us metric tons, container count, or both."
      >
        <Field label="Metric Tons" name="quantityTons" hint="e.g. 250 MT">
          <TextInput name="quantityTons" placeholder="Metric tons" />
        </Field>
        <Field label="Number of Containers" name="quantityContainers" hint="e.g. 10 x 20ft">
          <TextInput name="quantityContainers" placeholder="Containers per shipment / month" />
        </Field>
      </FormSection>

      <FormSection index="04" title="Destination" description="Where the goods must arrive.">
        <Field label="Country" name="destinationCountry" required>
          <TextInput name="destinationCountry" required placeholder="Destination country" />
        </Field>
        <Field label="Destination Port" name="destinationPort">
          <TextInput name="destinationPort" placeholder="e.g. Jebel Ali, Dammam, Mombasa" />
        </Field>
      </FormSection>

      <FormSection
        index="05"
        title="Product Requirements"
        description="The more specification you give, the faster and sharper the quotation."
      >
        <Field label="Required Delivery Date" name="deliveryDate">
          <TextInput name="deliveryDate" type="date" />
        </Field>
        <Field label="Incoterm, if known" name="incoterm">
          <Select name="incoterm" options={incoterms} placeholder="Select an Incoterm" />
        </Field>
        <Field label="Packaging" name="packaging" className="sm:col-span-2">
          <TextInput
            name="packaging"
            placeholder="e.g. 25kg PP bags, 1MT jumbo bags, retail cartons"
          />
        </Field>
        <Field label="Grade / Specification" name="grade" className="sm:col-span-2">
          <TextInput name="grade" placeholder="e.g. Sortex clean, 1% broken, moisture max 13%" />
        </Field>
        <Field label="Additional Requirements" name="requirements" className="sm:col-span-2">
          <TextArea
            name="requirements"
            rows={5}
            placeholder="Certifications, labelling, inspection, payment terms, shipment schedule…"
          />
        </Field>
        <Field
          label="Specification Document (optional)"
          name="specification"
          className="sm:col-span-2"
          hint="PDF, DOC or image up to 8MB."
        >
          <FileInput name="specification" />
        </Field>
      </FormSection>
    </FormShell>
  )
}
