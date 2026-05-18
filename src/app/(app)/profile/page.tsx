import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ProfileClient from '@/components/profile/ProfileClient'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { name: true, email: true } })

  return (
    <ProfileClient
      user={user || { name: '', email: '' }}
      profile={profile ? JSON.parse(JSON.stringify(profile)) : null}
    />
  )
}
