import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
  if (!profile?.onboardingDone) redirect('/onboarding')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayLogs = await prisma.mealLog.findMany({
    where: { userId: session.user.id, date: today },
    orderBy: { createdAt: 'asc' },
  })

  const totalCalories = todayLogs.reduce((s, l) => s + l.totalCalories, 0)
  const totalProtein = todayLogs.reduce((s, l) => s + (l.totalProtein || 0), 0)
  const totalCarbs = todayLogs.reduce((s, l) => s + (l.totalCarbs || 0), 0)
  const totalFat = todayLogs.reduce((s, l) => s + (l.totalFat || 0), 0)

  return (
    <DashboardClient
      userName={session.user.name || 'vous'}
      profile={JSON.parse(JSON.stringify(profile))}
      todayLogs={JSON.parse(JSON.stringify(todayLogs))}
      macros={{ calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fat: totalFat, targetCalories: profile.targetCalories || 2000 }}
    />
  )
}
