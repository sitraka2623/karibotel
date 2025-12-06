import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.reservation.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Réservation supprimée' })
  } catch (error) {
    console.error('Erreur suppression:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { statut } = body

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { statut },
    })

    return NextResponse.json(reservation)
  } catch (error) {
    console.error('Erreur mise à jour:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
