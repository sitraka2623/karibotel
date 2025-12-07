'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface Chambre {
  id: string
  numero: string
  prix: number
  description?: string
  disponible?: boolean
}

function ReserverForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [periodesReservees, setPeriodesReservees] = useState<
    Array<{ du: string; au: string }>
  >([])

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    chambreId: searchParams.get('chambre') || '',
    dateArrivee: '',
    dateDepart: '',
  })

  useEffect(() => {
    fetch('/api/chambres')
      .then((res) => res.json())
      .then((data) => setChambres(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || data.error || 'Erreur lors de la réservation')
        setPeriodesReservees(data.periodesReservees || [])
        setShowErrorModal(true)
        setLoading(false)
        return
      }

      setSuccess(true)
      setShowSuccessModal(true)
      setTimeout(() => router.push('/confirmation'), 3000)
    } catch (err: any) {
      setError('Une erreur est survenue lors de la réservation')
      setShowErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  const selectedChambre = chambres.find((c) => c.id === formData.chambreId)

  return (
    <main className="min-h-screen bg-gradient-to-b from-nature-50 to-white py-8 sm:py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src="/image/VUE.jpg"
            alt="Karibotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                Réservez votre séjour
              </h1>
              <p className="text-lg md:text-xl">
                Au cœur de la nature, à Ranomafana
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Sidebar - Informations */}
        <div className="lg:col-span-1 space-y-6">
          {/* Chambre sélectionnée */}
          {selectedChambre && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">
                Chambre sélectionnée
              </h3>
              <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                <img
                  src={`/image/CHAMBRE${(parseInt(selectedChambre.numero.slice(1)) % 7) + 1}.jpg`}
                  alt={`Chambre ${selectedChambre.numero}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold mb-2">
                Chambre {selectedChambre.numero}
              </h4>
              <p className="text-2xl font-bold text-primary">
                {selectedChambre.prix.toLocaleString()} Ar
                <span className="text-sm text-gray-500">/nuit</span>
              </p>
            </div>
          )}

          {/* Avantages */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4">
              Inclus dans votre séjour
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">
                  Accès gratuit à la piscine
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">WiFi gratuit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Petit-déjeuner inclus</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Vue panoramique</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Parking gratuit</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Besoin d'aide ?</h3>
            <p className="mb-4">
              Notre équipe est à votre disposition pour toute question
            </p>
            <div className="space-y-2">
              <a
                href="tel:+261342260667"
                className="block hover:underline font-semibold"
              >
                📞 +261 34 22 606 67
              </a>
              <a
                href="tel:+261325520699"
                className="block hover:underline font-semibold"
              >
                📞 +261 32 55 206 99
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Informations de réservation
            </h2>



            <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              required
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Chambre *
            </label>
            <select
              required
              value={formData.chambreId}
              onChange={(e) => setFormData({ ...formData, chambreId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Sélectionnez une chambre</option>
              {chambres.map((chambre) => (
                <option key={chambre.id} value={chambre.id}>
                  Chambre {chambre.numero} - {chambre.prix.toLocaleString()} Ar/nuit
                  {!chambre.disponible ? ' (Vérifier disponibilités)' : ''}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-2">
              💡 La disponibilité sera vérifiée automatiquement selon vos dates
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Date d'arrivée *
              </label>
              <input
                type="date"
                required
                value={formData.dateArrivee}
                onChange={(e) => setFormData({ ...formData, dateArrivee: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Date de départ *
              </label>
              <input
                type="date"
                required
                value={formData.dateDepart}
                onChange={(e) => setFormData({ ...formData, dateDepart: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-lg shadow-lg"
              >
                {loading ? '⏳ Réservation en cours...' : '✓ Confirmer la réservation'}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                En confirmant, vous acceptez nos conditions générales de vente
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce-in shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Réservation confirmée !
            </h3>
            <p className="text-gray-600 mb-6">
              Votre réservation a été enregistrée avec succès. Un email de confirmation vous a été envoyé.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <span>Redirection en cours...</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Erreur */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">📅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Désolé, chambre non disponible
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              {error}
            </p>

            {periodesReservees.length > 0 && (
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-800 mb-3 text-center">
                  Périodes déjà réservées :
                </h4>
                <div className="space-y-2">
                  {periodesReservees.map((periode, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 text-center border border-orange-200"
                    >
                      <p className="text-gray-700">
                        <span className="font-semibold">Du</span> {periode.du}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Au</span> {periode.au}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  💡 Veuillez choisir d'autres dates pour cette chambre
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setShowErrorModal(false)
                setPeriodesReservees([])
              }}
              className="w-full bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Choisir d'autres dates
            </button>
          </div>
        </div>
      )}

      {/* Section Pourquoi nous choisir */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Pourquoi choisir Karibotel ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🌿</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Écologique</h3>
            <p className="text-gray-600">
              Engagement fort pour le développement durable et l'environnement
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🏞️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Vue Exceptionnelle</h3>
            <p className="text-gray-600">
              Panorama unique sur le village et la rivière de Ranomafana
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Service Premium</h3>
            <p className="text-gray-600">
              Équipe dévouée pour rendre votre séjour inoubliable
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ReserverPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ReserverForm />
    </Suspense>
  )
}
