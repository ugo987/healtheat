import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ProgramClient from '@/components/program/ProgramClient'

export default async function ProgramPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
  if (!profile?.onboardingDone) redirect('/onboarding')

  const weekStart = new Date()
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)

  const plan = await prisma.nutritionPlan.findUnique({
    where: { userId_weekStartDate: { userId: session.user.id, weekStartDate: weekStart } },
  })

  return <ProgramClient plan={plan ? JSON.parse(JSON.stringify(plan)) : null} />
}
