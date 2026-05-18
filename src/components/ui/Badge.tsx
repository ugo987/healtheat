type BadgeVariant = 'green' | 'blue' | 'orange' | 'gray' | 'red'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const styles: Record<BadgeVariant, string> = {
  green: 'bg-brand-green/10 text-brand-green',
  blue: 'bg-blue-100 text-blue-700',
  orange: 'bg-orange-100 text-orange-700',
  gray: 'bg-gray-100 text-gray-600',
  red: 'bg-red-100 text-red-600',
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
