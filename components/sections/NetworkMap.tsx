import { Reveal } from '@/components/ui/Reveal'
import { lanes, landLayer, mapSize, points, type PlaceKey } from '@/data/worldMap'

/**
 * India → Dubai → GCC / international markets, drawn on real geography.
 *
 * The land, borders and graticule come from Natural Earth 1:110m data and
 * ship as a cached static SVG (`data/worldMap.ts` is generated alongside it by
 * scripts/generate-worldmap.mjs). This overlay shares that file's viewBox, so
 * the two layers align exactly. Cities sit at their true coordinates and the
 * lanes are great-circle routes, not decorative curves.
 */

type Marker = {
  key: PlaceKey
  label: string
  sub: string
  kind: 'hub' | 'origin' | 'market'
  /** Where the label sits relative to the node. */
  place: 'above' | 'below' | 'right'
}

const markers: Marker[] = [
  { key: 'dubai', label: 'Dubai', sub: 'Headquarters', kind: 'hub', place: 'above' },
  { key: 'europe', label: 'Europe', sub: 'Dairy sourcing', kind: 'market', place: 'above' },
  { key: 'gcc', label: 'GCC', sub: 'Saudi · Qatar · Kuwait · Oman', kind: 'market', place: 'below' },
  { key: 'africa', label: 'Africa', sub: 'Developing markets', kind: 'market', place: 'below' },
  { key: 'asia', label: 'Asia', sub: 'Selected markets', kind: 'market', place: 'below' },
]

/**
 * Surat and Mumbai are ~230 km apart, which is 17px at this scale — too close
 * for two labels. Both markers are drawn, sharing one label to the right.
 */
const indiaCluster = {
  nodes: ['surat', 'mumbai'] as PlaceKey[],
  label: 'Surat · Mumbai',
  sub: 'India procurement',
}

const FILL = {
  hub: '#D4AF37',
  origin: '#F3E5BE',
  market: '#6FC3A0',
} as const

export function NetworkMap() {
  const { width, height } = mapSize

  return (
    <Reveal>
      <figure className="relative overflow-hidden border border-ivory/15 bg-emerald-950">
        <div className="relative" style={{ aspectRatio: `${width} / ${height}` }}>
          {/* Land, borders and graticule — cached static layer */}
          <img
            src={landLayer}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full select-none"
            draggable={false}
          />

          {/* Trade lanes, nodes and labels — same viewBox, aligns exactly */}
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="CK Foodstuff trade network: procurement in Surat and Mumbai feeding the Dubai headquarters, which supplies the GCC, Europe, Africa and Asia."
          >
            <defs>
              <radialGradient id="nm-hub-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Lanes: a faint continuous route with a travelling dash on top */}
            <g fill="none" strokeLinecap="round">
              {lanes.map((lane) => (
                <g key={lane.id}>
                  <path
                    d={lane.d}
                    stroke={lane.kind === 'inbound' ? '#F3E5BE' : '#D4AF37'}
                    strokeOpacity="0.22"
                    strokeWidth="1.6"
                  />
                  <path
                    d={lane.d}
                    stroke={lane.kind === 'inbound' ? '#F3E5BE' : '#D4AF37'}
                    strokeOpacity="0.9"
                    strokeWidth="2"
                    strokeDasharray="3 15"
                    className="nm-flow"
                    style={{
                      // Longer routes take proportionally longer to traverse.
                      animationDuration: `${Math.max(2.4, lane.arcDegrees / 14)}s`,
                    }}
                  />
                </g>
              ))}
            </g>

            {/* India procurement cluster */}
            <g>
              {indiaCluster.nodes.map((key) => (
                <circle key={key} cx={points[key].x} cy={points[key].y} r="5" fill={FILL.origin} />
              ))}
              <line
                x1={points.mumbai.x + 8}
                y1={(points.surat.y + points.mumbai.y) / 2}
                x2={points.mumbai.x + 24}
                y2={(points.surat.y + points.mumbai.y) / 2}
                stroke="#D4AF37"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text
                x={points.mumbai.x + 30}
                y={(points.surat.y + points.mumbai.y) / 2 - 2}
                textAnchor="start"
                className="font-display"
                fill="#FBF9F4"
                fontSize="21"
                fontWeight="600"
              >
                {indiaCluster.label}
              </text>
              <text
                x={points.mumbai.x + 30}
                y={(points.surat.y + points.mumbai.y) / 2 + 16}
                textAnchor="start"
                fill="#A9DCC5"
                fontSize="11.5"
                letterSpacing="1.7"
              >
                {indiaCluster.sub.toUpperCase()}
              </text>
            </g>

            {/* Markers */}
            {markers.map((marker) => {
              const p = points[marker.key]
              const hub = marker.kind === 'hub'
              // The caption always sits under its title — for labels placed
              // above the node that means lifting the title far enough clear
              // to leave room for the caption between the two.
              const titleY =
                marker.place === 'above' ? p.y - (hub ? 50 : 42) : p.y + (hub ? 42 : 34)
              const subY = titleY + 17

              return (
                <g key={marker.key}>
                  {hub && <circle cx={p.x} cy={p.y} r="62" fill="url(#nm-hub-glow)" />}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hub ? 20 : 13}
                    fill="none"
                    stroke="#D4AF37"
                    strokeOpacity={hub ? 0.75 : 0.4}
                    strokeWidth="1.4"
                  />
                  {hub && <circle cx={p.x} cy={p.y} r="20" className="nm-pulse" fill="none" stroke="#D4AF37" strokeWidth="1.4" />}
                  <circle cx={p.x} cy={p.y} r={hub ? 8 : 5.5} fill={FILL[marker.kind]} />

                  <text
                    x={p.x}
                    y={titleY}
                    textAnchor="middle"
                    className="font-display"
                    fill="#FBF9F4"
                    fontSize={hub ? 27 : 21}
                    fontWeight="600"
                  >
                    {marker.label}
                  </text>
                  <text
                    x={p.x}
                    y={subY}
                    textAnchor="middle"
                    fill={hub ? '#EBD48F' : '#A9DCC5'}
                    fontSize="11.5"
                    letterSpacing="1.7"
                  >
                    {marker.sub.toUpperCase()}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <figcaption className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/15 px-6 py-5 text-[11px] uppercase tracking-wide2 text-ivory/55 sm:px-8">
          <LegendDot color={FILL.origin} label="India procurement" />
          <LegendDot color={FILL.hub} label="Dubai headquarters" />
          <LegendDot color={FILL.market} label="Destination markets" />
          <span className="ml-auto text-ivory/35">
            India → Dubai → GCC / International Markets
          </span>
        </figcaption>
      </figure>
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
