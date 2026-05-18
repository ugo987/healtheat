'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/program', label: 'Mon programme', icon: '🥗' },
  { href: '/tracking', label: 'Suivi repas', icon: '📋' },
  { href: '/profile', label: 'Mon profil', icon: '👤' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="flex h-full w-64 flex-col bg-brand-black text-brand-white">
      <div className="border-b border-brand-white/10 p-6">
        <Link href="/" className="font-poppins text-xl font-bold">HealthEat</Link>
        <p className="mt-0.5 text-xs text-brand-white/50">Mangez mieux, Vivez mieux</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-green text-brand-white'
                  : 'text-brand-white/70 hover:bg-brand-white/10 hover:text-brand-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-brand-white/10 p-4">
        {session?.user && (
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-brand-white">
              {session.user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{session.user.name}</p>
              <p className="truncate text-xs text-brand-white/50">{session.user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full rounded-xl px-4 py-2.5 text-left text-sm text-brand-white/60 transition-colors hover:bg-brand-white/10 hover:text-brand-white"
        >
          🚪 Déconnexion
        </button>
      </div>
    </aside>
  )
}
