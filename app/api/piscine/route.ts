import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const piscine = await prisma.piscine.findFirst()
    return NextResponse.json(piscine)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des informations' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const piscine = await prisma.piscine.findFirst()
    
    if (piscine) {
      const updated = await prisma.piscine.update({
        where: { id: piscine.id },
        data: body,
      })
      return NextResponse.json(updated)
    } else {
      const created = await prisma.piscine.create({
        data: body,
      })
      return NextResponse.json(created, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}
