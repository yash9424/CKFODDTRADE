import { services } from '@/data/company'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export function ServicesGrid({
  light = false,
  anchors = false,
}: {
  light?: boolean
  /** Give each card an id so the header submenu can deep-link into it. */
  anchors?: boolean
}) {
  const card = light
    ? 'border-ivory/10 bg-emerald-950/50 hover:bg-emerald-900/60'
    : 'border-emerald-950/10 bg-white hover:shadow-cardHover'
  const title = light ? 'text-ivory' : 'text-emerald-950'
  const body = light ? 'text-ivory/60' : 'text-charcoal-light'
  const index = light ? 'text-ivory/20' : 'text-emerald-950/10'

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal
          key={service.id}
          id={anchors ? service.id : undefined}
          delay={i * 70}
          className={`group relative flex flex-col border p-8 transition-all duration-500 sm:p-9 ${card}`}
        >
          <span className="absolute left-0 top-0 h-0.5 w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />

          <div className="flex items-start justify-between">
            <span className="grid h-14 w-14 place-items-center border border-gold-500/35 text-gold-500 transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <Icon name={service.icon as IconName} className="h-6 w-6" />
            </span>
            <span className={`font-display text-[2.6rem] font-semibold leading-none ${index}`}>
              {service.index}
            </span>
          </div>

          <h3 className={`mt-8 font-display text-[22px] font-semibold leading-snug ${title}`}>
            {service.title}
          </h3>
          <p className={`mt-4 text-[14.5px] leading-[1.7] ${body}`}>{service.description}</p>
        </Reveal>
      ))}
    </div>
  )
}
