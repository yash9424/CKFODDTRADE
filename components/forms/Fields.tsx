'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const control =
  'w-full border border-emerald-950/15 bg-white px-4 py-3.5 text-[15px] text-charcoal transition-colors duration-200 placeholder:text-charcoal-muted/70 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 disabled:opacity-60'

export function Field({
  label,
  name,
  required,
  hint,
  className,
  children,
}: {
  label: string
  name: string
  required?: boolean
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label
        htmlFor={name}
        className="mb-2 text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950"
      >
        {label}
        {required && <span className="ml-1 text-gold-700">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[12px] text-charcoal-muted">{hint}</p>}
    </div>
  )
}

export function TextInput({
  name,
  type = 'text',
  required,
  placeholder,
  defaultValue,
  autoComplete,
}: {
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  autoComplete?: string
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      className={control}
    />
  )
}

export function TextArea({
  name,
  rows = 4,
  required,
  placeholder,
}: {
  name: string
  rows?: number
  required?: boolean
  placeholder?: string
}) {
  return (
    <textarea
      id={name}
      name={name}
      rows={rows}
      required={required}
      placeholder={placeholder}
      className={cn(control, 'resize-y')}
    />
  )
}

export function Select({
  name,
  options,
  required,
  placeholder = 'Please select',
  defaultValue,
}: {
  name: string
  options: string[]
  required?: boolean
  placeholder?: string
  defaultValue?: string
}) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className={cn(control, 'appearance-none pr-11')}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-900"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m7 10 5 5 5-5" />
      </svg>
    </div>
  )
}

export function FileInput({
  name,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  multiple,
}: {
  name: string
  accept?: string
  multiple?: boolean
}) {
  return (
    <input
      id={name}
      name={name}
      type="file"
      accept={accept}
      multiple={multiple}
      className="w-full cursor-pointer border border-dashed border-emerald-950/20 bg-ivory-100 px-4 py-3 text-[13px] text-charcoal-light file:mr-4 file:cursor-pointer file:border-0 file:bg-emerald-900 file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-wide2 file:text-ivory hover:border-gold-500"
    />
  )
}

/** Section divider inside a long form. */
export function FormSection({
  index,
  title,
  description,
  children,
}: {
  index: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <fieldset className="border-t border-emerald-950/10 pt-10 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="flex items-baseline gap-3">
            <span className="font-display text-[13px] font-semibold text-gold-600">{index}</span>
            <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-emerald-950">
              {title}
            </span>
          </p>
          {description && (
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-charcoal-muted">
              {description}
            </p>
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">{children}</div>
      </div>
    </fieldset>
  )
}

/** Honeypot — bots fill it, humans never see it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="company_website_hp">Leave this field empty</label>
      <input id="company_website_hp" name="company_website_hp" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
