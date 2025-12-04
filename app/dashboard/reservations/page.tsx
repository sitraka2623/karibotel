'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaEye, FaTrash, FaCheck, FaTimes, FaFilter } from 'react-icons/fa'

interface Reservation {
  id: string
  nom: string
  email: string
  telephone: string
  dateArrivee: string
  dateDepart: string
  statut: string
  montantTotal: number
  nombrePersonnes: number
  chambre: {
    numero: string
  }
  createdAt: string
}

export default function ReservationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      loadReservations()
    }
  }, [status])

  const loadReservations = async () => {
    try {
      const res = await fetch('/api/reservations')
      const data = await res.json()
      setReservations(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return

    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        loadReservations()
        alert('Réservation supprimée avec succès')
      }
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut: newStatus }),
      })

      if (res.ok) {
        loadReservations()
        alert('Statut mis à jour avec succès')
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour')
    }
  }

  const filteredReservations = reservations.filter((r) => {
    if (filter === 'all') return true
    return r.statut === filter
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Chargement...</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <FaFilter className="text-primary text-xl" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes ({reservations.length})
          </button>
          <button
            onClick={() => setFilter('confirmee')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'confirmee'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Confirmées ({reservations.filter(r => r.statut === 'confirmee').length})
          </button>
          <button
            onClick={() => setFilter('en_cours')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'en_cours'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En cours ({reservations.filter(r => r.statut === 'en_cours').length})
          </button>
          <button
            onClick={() => setFilter('terminee')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'terminee'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Terminées ({reservations.filter(r => r.statut === 'terminee').length})
          </button>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Client</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Chambre</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Dates</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Personnes</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Montant</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-800">{reservation.nom}</p>
                      <p className="text-sm text-gray-600">{reservation.email}</p>
                      <p className="text-sm text-gray-600">{reservation.telephone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-primary">
                      {reservation.chambre.numero}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <p className="text-gray-700">
                        <span className="font-semibold">Du:</span>{' '}
                        {new Date(reservation.dateArrivee).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Au:</span>{' '}
                        {new Date(reservation.dateDepart).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold">{reservation.nombrePersonnes}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-primary">
                      {reservation.montantTotal.toLocaleString()} Ar
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={reservation.statut}
                      onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${
                        reservation.statut === 'confirmee'
                          ? 'bg-green-100 text-green-800'
                          : reservation.statut === 'en_cours'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="confirmee">Confirmée</option>
                      <option value="en_cours">En cours</option>
                      <option value="terminee">Terminée</option>
                      <option value="annulee">Annulée</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedReservation(reservation)
                          setShowModal(true)
                        }}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        title="Voir détails"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDelete(reservation.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReservations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucune réservation trouvée
          </div>
        )}
      </div>

      {/* Modal détails */}
      {showModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Détails de la réservation
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-semibold">Client</p>
                  <p className="text-lg">{selectedReservation.nom}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Chambre</p>
                  <p className="text-lg">{selectedReservation.chambre.numero}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-semibold">Email</p>
                  <p className="text-lg">{selectedReservation.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Téléphone</p>
                  <p className="text-lg">{selectedReservation.telephone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-semibold">Date d'arrivée</p>
                  <p className="text-lg">
                    {new Date(selectedReservation.dateArrivee).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Date de départ</p>
                  <p className="text-lg">
                    {new Date(selectedReservation.dateDepart).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-semibold">Nombre de personnes</p>
                  <p className="text-lg">{selectedReservation.nombrePersonnes}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Montant total</p>
                  <p className="text-2xl font-bold text-primary">
                    {selectedReservation.montantTotal.toLocaleString()} Ar
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 font-semibold">Statut</p>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-2 ${
                    selectedReservation.statut === 'confirmee'
                      ? 'bg-green-100 text-green-800'
                      : selectedReservation.statut === 'en_cours'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {selectedReservation.statut}
                </span>
              </div>

              <div>
                <p className="text-gray-600 font-semibold">Date de création</p>
                <p className="text-lg">
                  {new Date(selectedReservation.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowModal(false)
                setSelectedReservation(null)
              }}
              className="w-full mt-6 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
