'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Chambre {
  id: string
  numero: string
  prix: number
}

function ReserverForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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
      .then((data) => setChambres(data.filter((c: Chambre & { disponible: boolean }) => c.disponible)))
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
        throw new Error(data.error || 'Erreur lors de la réservation')
      }

      setSuccess(true)
      setTimeout(() => router.push('/confirmation'), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 text-center">
          Réserver une chambre
        </h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Réservation confirmée ! Redirection...
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
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
                </option>
              ))}
            </select>
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
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Réservation en cours...' : 'Confirmer la réservation'}
          </button>
        </form>
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
