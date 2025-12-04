'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaChartLine, FaBed, FaCalendar } from 'react-icons/fa'

interface Reservation {
  id: string
  nom: string
  email: string
  telephone: string
  dateArrivee: string
  dateDepart: string
  statut: string
  montantTotal: number
  chambre: {
    numero: string
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [stats, setStats] = useState({
    total: 0,
    enCours: 0,
    aVenir: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/reservations')
        .then((res) => res.json())
        .then((data) => {
          setReservations(data)
          setStats({
            total: data.length,
            enCours: data.filter((r: Reservation) => r.statut === 'en_cours').length,
            aVenir: data.filter((r: Reservation) => r.statut === 'confirmee').length,
          })
        })
    }
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Chargement...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Accès Refusé</h1>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder à cette page.</p>
          <Link
            href="/login"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">

        {/* Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Total réservations</p>
                <p className="text-4xl font-bold text-primary">{stats.total}</p>
              </div>
              <FaChartLine className="text-5xl text-primary opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">En cours</p>
                <p className="text-4xl font-bold text-orange-500">{stats.enCours}</p>
              </div>
              <FaBed className="text-5xl text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">À venir</p>
                <p className="text-4xl font-bold text-green-500">{stats.aVenir}</p>
              </div>
              <FaCalendar className="text-5xl text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Link
            href="/dashboard/chambres"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Gérer les Chambres
                </h3>
                <p className="text-gray-600">
                  Modifier, ajouter ou supprimer des chambres
                </p>
              </div>
              <FaBed className="text-5xl text-primary opacity-20" />
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Paramètres
                </h3>
                <p className="text-gray-600">
                  Configuration de l'hôtel
                </p>
              </div>
              <FaChartLine className="text-5xl text-primary opacity-20" />
            </div>
          </div>
        </div>

        {/* Réservations */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
            Réservations récentes
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Chambre</th>
                  <th className="text-left py-3 px-4">Arrivée</th>
                  <th className="text-left py-3 px-4">Départ</th>
                  <th className="text-left py-3 px-4">Statut</th>
                  <th className="text-left py-3 px-4">Montant</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold">{reservation.nom}</p>
                        <p className="text-sm text-gray-600">{reservation.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{reservation.chambre.numero}</td>
                    <td className="py-3 px-4">
                      {new Date(reservation.dateArrivee).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(reservation.dateDepart).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          reservation.statut === 'confirmee'
                            ? 'bg-green-100 text-green-800'
                            : reservation.statut === 'en_cours'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {reservation.statut}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {reservation.montantTotal.toLocaleString()} Ar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}
