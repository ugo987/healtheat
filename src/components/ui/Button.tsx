'use client'

import Link from 'next/link'
import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  href?: string
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-brand-green text-brand-white hover:bg-brand-green-dark active:scale-95',
  secondary: 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-white',
  ghost: 'text-brand-green hover:bg-brand-green/10',
  white: 'bg-brand-white text-brand-green hover:bg-white',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, href, className = '', children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-poppins font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} {...props}>
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Chargement...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
