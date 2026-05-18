'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { registerSchema, type RegisterInput } from '@/lib/validations'

export default function RegisterForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setServerError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const json = await res.json()
      setServerError(json.error || 'Erreur lors de l\'inscription')
      return
    }

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.ok) {
      router.push('/onboarding')
    } else {
      setServerError('Compte créé mais connexion échouée. Veuillez vous connecter.')
    }
  }

  return (
    <div>
      <h1 className="font-poppins text-3xl font-bold text-brand-black">Créer un compte</h1>
      <p className="mt-2 text-gray-500">Commencez votre voyage nutritionnel dès aujourd'hui.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input
          label="Nom complet"
          type="text"
          placeholder="Marie Dupont"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Adresse email"
          type="email"
          placeholder="marie@exemple.fr"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="Au moins 8 caractères"
          error={errors.password?.message}
          {...register('password')}
        />

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <Button type="submit" isLoading={isSubmitting} className="w-full justify-center mt-2">
          Créer mon compte gratuitement
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Déjà un compte ?{' '}
        <Link href="/login" className="font-medium text-brand-green hover:underline">
          Se connecter
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-gray-400">
        En créant un compte, vous acceptez nos{' '}
        <Link href="/terms" className="underline">CGU</Link> et notre{' '}
        <Link href="/privacy" className="underline">politique de confidentialité</Link>.
      </p>
    </div>
  )
}
