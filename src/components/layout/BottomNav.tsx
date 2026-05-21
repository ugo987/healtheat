'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Utensils, ClipboardList, User } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Accueil', icon: LayoutDashboard },
  { href: '/program', label: 'Programme', icon: Utensils },
  { href: '/tracking', label: 'Suivi', icon: ClipboardList },
  { href: '/profile', label: 'Profil', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(item => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                isActive ? 'text-brand-green' : 'text-gray-400'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
