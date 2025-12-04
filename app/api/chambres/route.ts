import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const chambres = await prisma.chambre.findMany({
      orderBy: { numero: 'asc' },
      include: {
        reservations: {
          where: {
            statut: { in: ['confirmee', 'en_cours'] },
            dateDepart: { gte: new Date() },
          },
        },
      },
    })

    // Calculer la vraie disponibilité basée sur les réservations
    const chambresAvecDisponibilite = chambres.map((chambre: any) => ({
      ...chambre,
      disponible: chambre.reservations.length === 0,
      reservations: undefined, // Ne pas exposer les réservations aux clients
    }))

    return NextResponse.json(chambresAvecDisponibilite)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des chambres' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const chambre = await prisma.chambre.create({
      data: body,
    })
    return NextResponse.json(chambre, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création de la chambre' },
      { status: 500 }
    )
  }
}
