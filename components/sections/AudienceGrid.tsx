import { audiences } from '@/data/company'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export function AudienceGrid() {
  return (
    <div className="grid gap-px overflow-hidden border border-emerald-950/10 bg-emerald-950/10 sm:grid-cols-2 lg:grid-cols-4">
      {audiences.map((audience, i) => (
        <Reveal
          key={audience.title}
          delay={i * 60}
          className="group relative bg-ivory-100 p-8 transition-colors duration-500 hover:bg-white"
        >
          <span className="grid h-12 w-12 place-items-center text-gold-600 transition-transform duration-500 group-hover:-translate-y-1">
            <Icon name={audience.icon as IconName} className="h-7 w-7" strokeWidth={1.3} />
          </span>
          <h3 className="mt-6 font-display text-[19px] font-semibold leading-snug text-emerald-950">
            {audience.title}
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-light">
            {audience.description}
          </p>
          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100" />
        </Reveal>
      ))}
    </div>
  )
}
