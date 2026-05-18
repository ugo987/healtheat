import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ db: 'ok', url: process.env.DATABASE_URL ? 'set' : 'missing' })
  } catch (error: any) {
    return NextResponse.json({ db: 'error', message: error.message, url: process.env.DATABASE_URL ? 'set' : 'missing' })
  }
}
