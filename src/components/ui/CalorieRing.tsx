'use client'

interface Props {
  calories: number
  target: number
  size?: number
}

export default function CalorieRing({ calories, target, size = 180 }: Props) {
  const percent = target > 0 ? (calories / target) * 100 : 0
  const cx = size / 2
  const cy = size / 2
  const radius = (size / 2) - 7
  const strokeWidth = Math.round(size / 13)
  const color = percent > 100 ? '#f97316' : '#253836'

  if (percent <= 0) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
      </svg>
    )
  }

  if (percent >= 100) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} />
      </svg>
    )
  }

  const angle = (percent / 100) * 360
  const rad = ((angle - 90) * Math.PI) / 180
  const x = cx + radius * Math.cos(rad)
  const y = cy + radius * Math.sin(rad)
  const largeArc = angle >= 180 ? 1 : 0
  const d = `M ${cx} ${cy - radius} A ${radius} ${radius} 0 ${largeArc} 1 ${x.toFixed(3)} ${y.toFixed(3)}`

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}
