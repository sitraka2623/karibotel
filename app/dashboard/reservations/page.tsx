'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  FaEye, 
  FaTrash, 
  FaFilter, 
  FaUser, 
  FaBed, 
  FaCalendarAlt, 
  FaUsers, 
  FaMoneyBillWave,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaSearch
} from 'react-icons/fa'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

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

  const handleDelete = (id: string) => {
    setReservationToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!reservationToDelete) return

    try {
      const res = await fetch(`/api/reservations/${reservationToDelete}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        loadReservations()
        setShowDeleteModal(false)
        setReservationToDelete(null)
        setShowModal(false)
        setSelectedReservation(null)
        setSuccessMessage('Réservation supprimée avec succès')
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 3000)
      }
    } catch (error) {
      console.error('Erreur:', error)
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
        setSuccessMessage('Statut mis à jour avec succès')
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 3000)
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const filteredReservations = reservations.filter((r) => {
    const matchesFilter = filter === 'all' || r.statut === filter
    const matchesSearch = searchTerm === '' || 
      r.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.chambre.numero.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'confirmee':
        return <FaCheckCircle className="text-green-500" />
      case 'en_cours':
        return <FaHourglassHalf className="text-orange-500" />
      case 'terminee':
        return <FaCheckCircle className="text-gray-500" />
      case 'annulee':
        return <FaTimesCircle className="text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'confirmee':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'en_cours':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'terminee':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'annulee':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const calculateNights = (dateArrivee: string, dateDepart: string) => {
    const arrival = new Date(dateArrivee)
    const departure = new Date(dateDepart)
    const diffTime = Math.abs(departure.getTime() - arrival.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

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
      {/* Header avec recherche */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestion des Réservations</h1>
            <p className="text-gray-600">{filteredReservations.length} réservation(s) trouvée(s)</p>
          </div>
          
          {/* Barre de recherche */}
          <div className="relative w-full lg:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou chambre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <FaFilter className="text-primary text-xl" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes ({reservations.length})
          </button>
          <button
            onClick={() => setFilter('confirmee')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'confirmee'
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Confirmées ({reservations.filter(r => r.statut === 'confirmee').length})
          </button>
          <button
            onClick={() => setFilter('en_cours')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'en_cours'
                ? 'bg-orange-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En cours ({reservations.filter(r => r.statut === 'en_cours').length})
          </button>
          <button
            onClick={() => setFilter('terminee')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'terminee'
                ? 'bg-gray-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Terminées ({reservations.filter(r => r.statut === 'terminee').length})
          </button>
        </div>
      </div>

      {/* Liste des réservations en cartes */}
      {filteredReservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">
            <FaCalendarAlt className="mx-auto" />
          </div>
          <p className="text-xl text-gray-600">Aucune réservation trouvée</p>
          <p className="text-gray-500 mt-2">Essayez de modifier vos filtres de recherche</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredReservations.map((reservation) => {
            const nights = calculateNights(reservation.dateArrivee, reservation.dateDepart)
            
            return (
              <div
                key={reservation.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-primary"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Colonne gauche - Info client */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <FaUser className="text-primary text-xl" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{reservation.nom}</h3>
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(reservation.statut)}`}>
                                {getStatusIcon(reservation.statut)}
                                {reservation.statut === 'confirmee' && 'Confirmée'}
                                {reservation.statut === 'en_cours' && 'En cours'}
                                {reservation.statut === 'terminee' && 'Terminée'}
                                {reservation.statut === 'annulee' && 'Annulée'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 ml-15">
                            <div className="flex items-center gap-2 text-gray-600">
                              <FaEnvelope className="text-primary" />
                              <span>{reservation.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <FaPhone className="text-primary" />
                              <span>{reservation.telephone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Détails de la réservation */}
                      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FaBed className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Chambre</p>
                            <p className="font-bold text-lg text-primary">{reservation.chambre.numero}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FaUsers className="text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Personnes</p>
                            <p className="font-bold text-lg">{reservation.nombrePersonnes}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Arrivée</p>
                            <p className="font-bold">{new Date(reservation.dateArrivee).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Départ</p>
                            <p className="font-bold">{new Date(reservation.dateDepart).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 pt-2">
                        <FaClock className="text-gray-400" />
                        <span>{nights} nuit{nights > 1 ? 's' : ''}</span>
                        <span className="mx-2">•</span>
                        <span>Réservé le {new Date(reservation.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    {/* Colonne droite - Montant et actions */}
                    <div className="lg:w-64 flex flex-col justify-between gap-4">
                      <div className="bg-gradient-to-br from-primary to-green-600 rounded-xl p-6 text-white text-center">
                        <p className="text-sm opacity-90 mb-2">Montant Total</p>
                        <p className="text-4xl font-bold">{(reservation.montantTotal / 1000).toFixed(0)}K</p>
                        <p className="text-sm opacity-90">Ariary</p>
                      </div>

                      <div className="space-y-3">
                        <select
                          value={reservation.statut}
                          onChange={(e) => handleUpdateStatus(reservation.id, e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold cursor-pointer hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                          <option value="confirmee">✓ Confirmée</option>
                          <option value="en_cours">⏳ En cours</option>
                          <option value="terminee">✓ Terminée</option>
                          <option value="annulee">✗ Annulée</option>
                        </select>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedReservation(reservation)
                              setShowModal(true)
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                          >
                            <FaEye />
                            Détails
                          </button>
                          <button
                            onClick={() => handleDelete(reservation.id)}
                            className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal détails amélioré */}
      {showModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header du modal */}
            <div className="bg-gradient-to-r from-primary to-green-600 text-white p-8 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Détails de la Réservation</h2>
                  <p className="text-white/90">ID: {selectedReservation.id.substring(0, 8)}...</p>
                </div>
                <div className={`px-6 py-3 rounded-full text-lg font-bold border-2 ${
                  selectedReservation.statut === 'confirmee' ? 'bg-green-500 border-green-300' :
                  selectedReservation.statut === 'en_cours' ? 'bg-orange-500 border-orange-300' :
                  selectedReservation.statut === 'terminee' ? 'bg-gray-500 border-gray-300' :
                  'bg-red-500 border-red-300'
                }`}>
                  {selectedReservation.statut === 'confirmee' && '✓ Confirmée'}
                  {selectedReservation.statut === 'en_cours' && '⏳ En cours'}
                  {selectedReservation.statut === 'terminee' && '✓ Terminée'}
                  {selectedReservation.statut === 'annulee' && '✗ Annulée'}
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Informations client */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-primary" />
                  Informations Client
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Nom complet</p>
                    <p className="text-lg font-bold text-gray-800">{selectedReservation.nom}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FaEnvelope className="text-primary" />
                      Email
                    </p>
                    <p className="text-lg font-semibold text-gray-800 break-all">{selectedReservation.email}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <FaPhone className="text-primary" />
                      Téléphone
                    </p>
                    <p className="text-lg font-semibold text-gray-800">{selectedReservation.telephone}</p>
                  </div>
                </div>
              </div>

              {/* Détails du séjour */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBed className="text-primary" />
                  Détails du Séjour
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {selectedReservation.chambre.numero}
                      </div>
                      <div>
                        <p className="text-sm text-blue-700 mb-1">Chambre</p>
                        <p className="text-2xl font-bold text-blue-900">N° {selectedReservation.chambre.numero}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                        <FaUsers className="text-white text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-700 mb-1">Nombre de personnes</p>
                        <p className="text-2xl font-bold text-purple-900">{selectedReservation.nombrePersonnes} personne{selectedReservation.nombrePersonnes > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  Période de Séjour
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <p className="text-sm text-green-700 mb-2">Date d'arrivée</p>
                    <p className="text-2xl font-bold text-green-900">
                      {new Date(selectedReservation.dateArrivee).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                    <p className="text-sm text-orange-700 mb-2">Date de départ</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {new Date(selectedReservation.dateDepart).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/30">
                    <p className="text-sm text-primary mb-2">Durée du séjour</p>
                    <p className="text-4xl font-bold text-primary">
                      {calculateNights(selectedReservation.dateArrivee, selectedReservation.dateDepart)}
                    </p>
                    <p className="text-sm text-primary/70">nuit{calculateNights(selectedReservation.dateArrivee, selectedReservation.dateDepart) > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              {/* Montant */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaMoneyBillWave className="text-primary" />
                  Informations Financières
                </h3>
                <div className="bg-gradient-to-br from-primary to-green-600 rounded-xl p-8 text-white text-center">
                  <p className="text-lg opacity-90 mb-2">Montant Total</p>
                  <p className="text-6xl font-bold mb-2">{selectedReservation.montantTotal.toLocaleString()}</p>
                  <p className="text-2xl opacity-90">Ariary Malagasy</p>
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <p className="text-sm opacity-75">
                      Soit {(selectedReservation.montantTotal / calculateNights(selectedReservation.dateArrivee, selectedReservation.dateDepart)).toLocaleString()} Ar / nuit
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations système */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaClock className="text-gray-600" />
                  Informations Système
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Date de création</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(selectedReservation.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">ID de réservation</p>
                    <p className="font-mono font-semibold text-gray-800 text-xs">{selectedReservation.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer du modal */}
            <div className="bg-gray-50 p-6 rounded-b-2xl flex gap-4">
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedReservation(null)
                }}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-lg"
              >
                Fermer
              </button>
              <button
                onClick={() => handleDelete(selectedReservation.id)}
                className="px-8 bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors text-lg flex items-center gap-2"
              >
                <FaTrash />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation Suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-4xl text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setReservationToDelete(null)
                }}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Succès !
            </h3>
            <p className="text-gray-600">
              {successMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
