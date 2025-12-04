import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReservationEmail } from '@/lib/email'

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { chambre: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(reservations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des réservations' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom, email, telephone, chambreId, dateArrivee, dateDepart } = body

    // Vérifier la disponibilité
    const conflits = await prisma.reservation.findMany({
      where: {
        chambreId,
        statut: { in: ['confirmee', 'en_cours'] },
        OR: [
          {
            dateArrivee: { lte: new Date(dateDepart) },
            dateDepart: { gte: new Date(dateArrivee) },
          },
        ],
      },
    })

    if (conflits.length > 0) {
      return NextResponse.json(
        { error: 'La chambre n\'est pas disponible pour ces dates' },
        { status: 400 }
      )
    }

    // Calculer le montant
    const chambre = await prisma.chambre.findUnique({
      where: { id: chambreId },
    })

    if (!chambre) {
      return NextResponse.json(
        { error: 'Chambre non trouvée' },
        { status: 404 }
      )
    }

    const jours = Math.ceil(
      (new Date(dateDepart).getTime() - new Date(dateArrivee).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    const montantTotal = chambre.prix * jours

    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        nom,
        email,
        telephone,
        chambreId,
        dateArrivee: new Date(dateArrivee),
        dateDepart: new Date(dateDepart),
        montantTotal,
        statut: 'confirmee',
      },
      include: { chambre: true },
    })

    // Envoyer l'email
    try {
      await sendReservationEmail(email, {
        nom,
        numero: chambre.numero,
        dateArrivee: new Date(dateArrivee).toLocaleDateString('fr-FR'),
        dateDepart: new Date(dateDepart).toLocaleDateString('fr-FR'),
        montantTotal: montantTotal.toLocaleString() + ' Ar',
      })
    } catch (emailError) {
      console.error('Erreur envoi email:', emailError)
    }

    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    console.error('Erreur création réservation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réservation' },
      { status: 500 }
    )
  }
}
