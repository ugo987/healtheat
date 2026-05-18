'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { loginSchema, type LoginInput } from '@/lib/validations'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setServerError('')
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.ok) {
      router.push(callbackUrl)
    } else {
      setServerError('Email ou mot de passe incorrect.')
    }
  }

  return (
    <div>
      <h1 className="font-poppins text-3xl font-bold text-brand-black">Connexion</h1>
      <p className="mt-2 text-gray-500">Bon retour parmi nous !</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
          placeholder="Votre mot de passe"
          error={errors.password?.message}
          {...register('password')}
        />

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <Button type="submit" isLoading={isSubmitting} className="w-full justify-center mt-2">
          Se connecter
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Pas encore de compte ?{' '}
        <Link href="/register" className="font-medium text-brand-green hover:underline">
          Créer un compte gratuit
        </Link>
      </p>
    </div>
  )
}
