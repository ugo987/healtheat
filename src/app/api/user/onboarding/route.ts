import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { onboardingSchema } from '@/lib/validations'
import { calculateTDEE } from '@/lib/nutrition-rules'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const data = onboardingSchema.parse(body)

    const mockProfile = {
      weight: data.weight,
      height: data.height,
      age: data.age,
      gender: data.gender,
      activityLevel: data.activityLevel as any,
      goal: data.goal as any,
      dietType: data.dietType as any,
      allergies: data.allergies,
      targetCalories: null,
    }
    const targetCalories = calculateTDEE(mockProfile as any)

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        ...data,
        targetCalories,
        onboardingDone: true,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        ...data,
        targetCalories,
        onboardingDone: true,
      },
    })

    return NextResponse.json(profile, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
