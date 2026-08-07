'use client'

import type { ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'
import { ButtonLink } from '@/components/ui/Button'
import type { SubmitState } from '@/lib/forms'
import { whatsappLink } from '@/lib/site'

/**
 * Wraps a form with its submitting/success/error states so every form on the
 * site confirms in the same way.
 */
export function FormShell({
  state,
  successTitle,
  onReset,
  submitLabel,
  children,
  footnote,
  onSubmit,
}: {
  state: SubmitState
  successTitle: string
  onReset: () => void
  submitLabel: string
  children: ReactNode
  footnote?: ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  if (state.status === 'success') {
    return (
      <div className="border border-emerald-950/10 bg-white p-10 text-center sm:p-16">
        <span className="mx-auto grid h-16 w-16 place-items-center border border-gold-500 bg-gold-500 text-emerald-950">
          <Icon name="check" className="h-8 w-8" strokeWidth={2} />
        </span>
        <h3 className="mt-8 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-semibold text-emerald-950">
          {successTitle}
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.75] text-charcoal-light">
          {state.message}
        </p>
        {state.reference && (
          <p className="mt-7 inline-block border border-emerald-950/10 bg-ivory-200 px-5 py-3 text-[12px] uppercase tracking-wide2 text-emerald-900">
            Reference <span className="font-semibold text-gold-700">{state.reference}</span>
          </p>
        )}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={whatsappLink()} variant="emerald" size="md" arrow={false}>
            WhatsApp Our Team
          </ButtonLink>
          <button
            type="button"
            onClick={onReset}
            className="border border-emerald-950/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-wide2 text-emerald-950 transition-colors hover:bg-emerald-950 hover:text-ivory"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="relative">
      <div className="space-y-10">{children}</div>

      {state.status === 'error' && (
        <p
          role="alert"
          className="mt-8 border-l-2 border-red-600 bg-red-50 px-5 py-4 text-[14px] text-red-800"
        >
          {state.message}
        </p>
      )}

      <div className="mt-10 flex flex-col gap-5 border-t border-emerald-950/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        {footnote && (
          <p className="max-w-md text-[12.5px] leading-relaxed text-charcoal-muted">{footnote}</p>
        )}
        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className="group inline-flex shrink-0 items-center justify-center gap-3 bg-gold-500 px-10 py-4 text-[13px] font-semibold uppercase tracking-wide2 text-emerald-950 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70"
        >
          {state.status === 'submitting' ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              >
                <path d="M1 8h13M9 3l5 5-5 5" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
