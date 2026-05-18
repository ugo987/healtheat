'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const navLinks = [
  { href: '/features', label: 'Fonctionnalités' },
  { href: '/pricing', label: 'Tarifs' },
  { href: '/about', label: 'À propos' },
  { href: '/blog', label: 'Blog' },
]

export default function Header() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon />
          <span className="font-poppins text-xl font-bold text-brand-black">HealthEat</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <Button href="/dashboard" size="sm">Mon espace</Button>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">Connexion</Button>
              <Button href="/register" size="sm">Commencer gratuitement</Button>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block h-0.5 w-5 bg-current transition-all" style={{ transform: menuOpen ? 'translateY(6px) rotate(45deg)' : '' }} />
          <span className="my-1.5 block h-0.5 w-5 bg-current transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block h-0.5 w-5 bg-current transition-all" style={{ transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : '' }} />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-100" />
            {session ? (
              <Button href="/dashboard" size="sm">Mon espace</Button>
            ) : (
              <>
                <Button href="/login" variant="secondary" size="sm">Connexion</Button>
                <Button href="/register" size="sm">Commencer gratuitement</Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

function LogoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="17" fill="#253836" stroke="#000" strokeWidth="1" />
      <path d="M18 8 C14 8 10 12 10 17 C10 21 12 24 15 25.5 L15 27 L21 27 L21 25.5 C24 24 26 21 26 17 C26 12 22 8 18 8Z" fill="#DFEBEB" />
      <path d="M18 10 L18 26 M14 14 L18 18 M22 14 L18 18" stroke="#253836" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="17" r="1.5" fill="#DFEBEB" opacity="0.6" />
      <circle cx="26" cy="17" r="1.5" fill="#DFEBEB" opacity="0.6" />
      <circle cx="14" cy="10" r="1" fill="#DFEBEB" opacity="0.5" />
      <circle cx="22" cy="10" r="1" fill="#DFEBEB" opacity="0.5" />
    </svg>
  )
}
