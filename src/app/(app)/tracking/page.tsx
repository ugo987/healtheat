import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import TrackingClient from '@/components/tracking/TrackingClient'

export default async function TrackingPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })

  return <TrackingClient targetCalories={profile?.targetCalories || 2000} />
}
