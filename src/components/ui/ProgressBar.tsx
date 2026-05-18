interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercent?: boolean
  color?: 'green' | 'blue' | 'orange'
}

const colors = {
  green: 'bg-brand-green',
  blue: 'bg-blue-500',
  orange: 'bg-orange-400',
}

export default function ProgressBar({ value, max = 100, label, showPercent = false, color = 'green' }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="mb-1 flex justify-between text-sm">
          {label && <span className="text-gray-600">{label}</span>}
          {showPercent && <span className="font-medium text-brand-green">{percent}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
