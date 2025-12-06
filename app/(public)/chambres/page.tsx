'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaCalendar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface Chambre {
  id: string
  numero: string
  description: string
  prix: number
  disponible: boolean
  photo?: string
}

interface Reservation {
  dateArrivee: string
  dateDepart: string
  statut: string
}

export default function ChambresPage() {
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChambre, setSelectedChambre] = useState<Chambre | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loadingReservations, setLoadingReservations] = useState(false)

  useEffect(() => {
    loadChambres()
  }, [])

  const loadChambres = async () => {
    try {
      const res = await fetch('/api/chambres')
      const data = await res.json()
      setChambres(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewPlanning = async (chambre: Chambre) => {
    setSelectedChambre(chambre)
    setShowModal(true)
    setLoadingReservations(true)

    try {
      const res = await fetch('/api/reservations')
      const data = await res.json()

      // Filtrer les réservations confirmées ou en cours pour cette chambre
      const chambreReservations = data
        .filter(
          (r: Reservation & { chambreId: string }) =>
            r.chambreId === chambre.id &&
            (r.statut === 'confirmee' || r.statut === 'en_cours')
        )
        .map((r: Reservation) => ({
          dateArrivee: r.dateArrivee,
          dateDepart: r.dateDepart,
          statut: r.statut,
        }))

      setReservations(chambreReservations)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoadingReservations(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Chargement...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 text-center">
          Nos Chambres
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chambres.map((chambre) => (
            <div
              key={chambre.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={
                    chambre.photo ||
                    `/image/CHAMBRE${(parseInt(chambre.numero.slice(1)) % 7) + 1}.jpg`
                  }
                  alt={`Chambre ${chambre.numero}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Chambre {chambre.numero}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                      chambre.disponible
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {chambre.disponible ? (
                      <>
                        <FaCheckCircle /> Disponible
                      </>
                    ) : (
                      <>
                        <FaTimesCircle /> Réservée
                      </>
                    )}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{chambre.description}</p>

                <div className="text-2xl font-bold text-primary mb-4">
                  {chambre.prix.toLocaleString()} Ar
                  <span className="text-sm text-gray-500">/nuit</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewPlanning(chambre)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCalendar /> Voir disponibilités
                  </button>
                  <Link
                    href={`/reserver?chambre=${chambre.id}`}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-center"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Planning */}
        {showModal && selectedChambre && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">
                  Disponibilités - Chambre {selectedChambre.numero}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedChambre(null)
                    setReservations([])
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {loadingReservations ? (
                <div className="text-center py-8">
                  <div className="text-xl text-gray-600">Chargement...</div>
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                  <p className="text-xl text-gray-800 font-semibold mb-2">
                    Chambre disponible !
                  </p>
                  <p className="text-gray-600">
                    Cette chambre n'a aucune réservation confirmée pour le
                    moment.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-4">
                    Cette chambre est réservée aux dates suivantes :
                  </p>
                  <div className="space-y-3">
                    {reservations.map((reservation, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 bg-orange-50"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <FaTimesCircle className="text-orange-500" />
                          <span className="font-semibold text-gray-800">
                            Période réservée
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Du</p>
                            <p className="font-semibold text-gray-800">
                              {formatDate(reservation.dateArrivee)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Au</p>
                            <p className="font-semibold text-gray-800">
                              {formatDate(reservation.dateDepart)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedChambre(null)
                    setReservations([])
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Fermer
                </button>
                <Link
                  href={`/reserver?chambre=${selectedChambre.id}`}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center"
                >
                  Réserver cette chambre
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
