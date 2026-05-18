import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateNutritionPlan } from '@/lib/ai-nutrition'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
  if (!profile) return NextResponse.json({ error: 'Profil non trouvé. Veuillez compléter l\'onboarding.' }, { status: 404 })

  const planData = await generateNutritionPlan(profile)

  const weekStart = new Date()
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)

  const plan = await prisma.nutritionPlan.upsert({
    where: { userId_weekStartDate: { userId: session.user.id, weekStartDate: weekStart } },
    update: { planData: planData as any, generatedByAI: true, aiModel: 'claude-sonnet-4-6' },
    create: {
      userId: session.user.id,
      weekStartDate: weekStart,
      planData: planData as any,
      generatedByAI: true,
      aiModel: 'claude-sonnet-4-6',
    },
  })

  return NextResponse.json(plan)
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const weekStart = new Date()
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)

  const plan = await prisma.nutritionPlan.findUnique({
    where: { userId_weekStartDate: { userId: session.user.id, weekStartDate: weekStart } },
  })

  return NextResponse.json(plan)
}
