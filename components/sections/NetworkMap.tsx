import { Reveal } from '@/components/ui/Reveal'

type Node = {
  id: string
  label: string
  sub: string
  x: number
  y: number
  kind: 'origin' | 'hub' | 'market'
}

/**
 * India → Dubai → GCC / international markets. A schematic (not a survey map):
 * abstracted landmasses keep the focus on the trade lanes rather than borders.
 */
const nodes: Node[] = [
  { id: 'surat', label: 'Surat', sub: 'Procurement', x: 690, y: 300, kind: 'origin' },
  { id: 'mumbai', label: 'Mumbai', sub: 'Export & Logistics', x: 700, y: 350, kind: 'origin' },
  { id: 'dubai', label: 'Dubai', sub: 'Headquarters', x: 500, y: 265, kind: 'hub' },
  { id: 'gcc', label: 'GCC', sub: 'Saudi · Qatar · Kuwait · Oman', x: 430, y: 330, kind: 'market' },
  { id: 'europe', label: 'Europe', sub: 'Dairy Sourcing', x: 250, y: 120, kind: 'market' },
  { id: 'africa', label: 'Africa', sub: 'Developing Markets', x: 300, y: 420, kind: 'market' },
  { id: 'asia', label: 'Asia', sub: 'Selected Markets', x: 830, y: 400, kind: 'market' },
]

const lanes: [string, string][] = [
  ['surat', 'dubai'],
  ['mumbai', 'dubai'],
  ['dubai', 'gcc'],
  ['dubai', 'europe'],
  ['dubai', 'africa'],
  ['dubai', 'asia'],
]

function byId(id: string) {
  return nodes.find((n) => n.id === id)!
}

export function NetworkMap() {
  return (
    <Reveal className="relative">
      <div className="grain relative overflow-hidden border border-ivory/10 bg-emerald-950/60">
        <svg
          viewBox="0 0 960 520"
          className="h-auto w-full"
          role="img"
          aria-label="CK Foodstuff trade network: Surat and Mumbai procurement feeding the Dubai headquarters, which supplies the GCC, Europe, Africa and Asia."
        >
          <defs>
            <linearGradient id="lane" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="hubGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* graticule */}
          <g stroke="#A9DCC5" strokeOpacity="0.07" strokeWidth="1">
            {Array.from({ length: 13 }, (_, i) => (
              <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="520" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 80} x2="960" y2={i * 80} />
            ))}
          </g>

          {/* abstracted landmasses */}
          <g fill="#12855A" fillOpacity="0.16">
            <path d="M120 90 q90-40 190-14 t150 34 q40 40-10 76 t-160 30 q-120-8-170-52 t0-74Z" />
            <path d="M250 330 q80-46 150-10 t70 92 q-6 74-76 92 t-128-46 q-38-70-16-128Z" />
            <path d="M470 210 q90-52 190-16 t140 78 q22 62-58 92 t-190 4 q-96-40-102-98 t20-60Z" />
            <path d="M760 300 q100-30 150 26 t20 122 q-70 44-150 6 t-60-116 q6-30 40-38Z" />
          </g>

          {/* trade lanes */}
          {lanes.map(([from, to]) => {
            const a = byId(from)
            const b = byId(to)
            const mx = (a.x + b.x) / 2
            const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.22 - 20
            return (
              <path
                key={`${from}-${to}`}
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                fill="none"
                stroke="url(#lane)"
                strokeWidth="2"
                strokeDasharray="3 12"
                strokeLinecap="round"
              />
            )
          })}

          {/* nodes */}
          {nodes.map((node) => {
            const isHub = node.kind === 'hub'
            const isOrigin = node.kind === 'origin'
            return (
              <g key={node.id}>
                {isHub && <circle cx={node.x} cy={node.y} r="70" fill="url(#hubGlow)" />}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHub ? 26 : 17}
                  fill="none"
                  stroke="#D4AF37"
                  strokeOpacity={isHub ? 0.7 : 0.35}
                  strokeWidth="1.5"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHub ? 9 : isOrigin ? 6 : 5}
                  fill={isHub ? '#D4AF37' : isOrigin ? '#F3E5BE' : '#6FC3A0'}
                />
                <text
                  x={node.x}
                  y={node.y - (isHub ? 40 : 30)}
                  textAnchor="middle"
                  className="font-display"
                  fill="#FBF9F4"
                  fontSize={isHub ? 22 : 17}
                  fontWeight="600"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + (isHub ? 52 : 40)}
                  textAnchor="middle"
                  fill="#A9DCC5"
                  fontSize="11"
                  letterSpacing="1.6"
                >
                  {node.sub.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/10 px-6 py-5 text-[11px] uppercase tracking-wide2 text-ivory/55 sm:px-8">
          <LegendDot color="#F3E5BE" label="India procurement" />
          <LegendDot color="#D4AF37" label="Dubai headquarters" />
          <LegendDot color="#6FC3A0" label="Destination markets" />
          <span className="ml-auto text-ivory/35">India → Dubai → GCC / International Markets</span>
        </div>
      </div>
    </Reveal>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
}
