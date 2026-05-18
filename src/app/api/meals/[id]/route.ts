import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const log = await prisma.mealLog.findUnique({ where: { id } })
  if (!log || log.userId !== session.user.id) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  }

  await prisma.mealLog.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
