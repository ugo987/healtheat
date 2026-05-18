interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <div
      className={`bg-white rounded-2xl shadow-md ${paddings[padding]} ${
        hover ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
