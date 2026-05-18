import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <p className="text-6xl font-poppins font-bold text-brand-green">404</p>
      <h1 className="mt-4 font-poppins text-2xl font-bold text-brand-black">Page introuvable</h1>
      <p className="mt-2 text-gray-500">Cette page n'existe pas ou a été déplacée.</p>
      <div className="mt-6 flex gap-3">
        <Button href="/">Retour à l'accueil</Button>
        <Button href="/dashboard" variant="secondary">Mon espace</Button>
      </div>
    </div>
  )
}
