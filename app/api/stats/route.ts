import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Récupérer toutes les réservations
    const reservations = await prisma.reservation.findMany({
      include: {
        chambre: true,
      },
    })

    // Récupérer toutes les chambres
    const chambres = await prisma.chambre.findMany()

    // Calculer les stats
    const totalReservations = reservations.length
    const reservationsConfirmees = reservations.filter(r => r.statut === 'confirmee').length
    const reservationsEnCours = reservations.filter(r => r.statut === 'en_cours').length
    const reservationsTerminees = reservations.filter(r => r.statut === 'terminee').length

    // Revenu total
    const revenuTotal = reservations.reduce((sum, r) => sum + r.montantTotal, 0)

    // Revenu du mois actuel
    const now = new Date()
    const debutMois = new Date(now.getFullYear(), now.getMonth(), 1)
    const revenuMoisActuel = reservations
      .filter(r => new Date(r.createdAt) >= debutMois)
      .reduce((sum, r) => sum + r.montantTotal, 0)

    // Chambres occupées (réservations en cours)
    const chambresOccupeesIds = new Set(
      reservations
        .filter(r => r.statut === 'en_cours')
        .map(r => r.chambreId)
    )
    const chambresOccupees = chambresOccupeesIds.size
    const chambresDisponibles = chambres.length - chambresOccupees
    const tauxOccupation = Math.round((chambresOccupees / chambres.length) * 100)

    // Top chambres
    const chambreCount: { [key: string]: number } = {}
    reservations.forEach(r => {
      const numero = r.chambre.numero
      chambreCount[numero] = (chambreCount[numero] || 0) + 1
    })
    const topChambres = Object.entries(chambreCount)
      .map(([numero, count]) => ({ numero, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Réservations par mois (6 derniers mois)
    const moisNoms = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    const reservationsParMois = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const moisSuivant = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      const count = reservations.filter(r => {
        const createdAt = new Date(r.createdAt)
        return createdAt >= date && createdAt < moisSuivant
      }).length
      reservationsParMois.push({
        mois: moisNoms[date.getMonth()],
        count,
      })
    }

    return NextResponse.json({
      totalReservations,
      reservationsConfirmees,
      reservationsEnCours,
      reservationsTerminees,
      revenuTotal,
      revenuMoisActuel,
      tauxOccupation,
      chambresDisponibles,
      chambresOccupees,
      totalChambres: chambres.length,
      reservationsParMois,
      topChambres,
    })
  } catch (error) {
    console.error('Erreur stats:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
