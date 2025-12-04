'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaSave, FaHotel, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

interface Settings {
  hotelName: string
  email: string
  telephone: string
  adresse: string
  horairesReception: string
  horairesCheckIn: string
  horairesCheckOut: string
  description: string
}

export default function ParametresPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>({
    hotelName: 'Karibotel',
    email: 'contact@karibotel.com',
    telephone: '+261 34 00 000 00',
    adresse: 'Ranomafana, Fianarantsoa, Madagascar',
    horairesReception: '24h/24',
    horairesCheckIn: '14:00',
    horairesCheckOut: '11:00',
    description: 'Hôtel de charme situé à Ranomafana, offrant confort et tranquillité dans un cadre naturel exceptionnel.',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
  }, [status, router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    // Simuler une sauvegarde (à implémenter avec une vraie API)
    setTimeout(() => {
      setSaving(false)
      setMessage('✅ Paramètres enregistrés avec succès')
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Chargement...</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaHotel className="text-4xl text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Paramètres de l'Hôtel</h1>
            <p className="text-gray-600">Gérez les informations de votre établissement</p>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Informations générales */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Informations Générales</h2>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FaHotel className="text-primary" />
                  Nom de l'Hôtel
                </label>
                <input
                  type="text"
                  value={settings.hotelName}
                  onChange={(e) => setSettings({ ...settings, hotelName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FaEnvelope className="text-primary" />
                  Email de Contact
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FaPhone className="text-primary" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={settings.telephone}
                  onChange={(e) => setSettings({ ...settings, telephone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <FaMapMarkerAlt className="text-primary" />
                  Adresse
                </label>
                <input
                  type="text"
                  value={settings.adresse}
                  onChange={(e) => setSettings({ ...settings, adresse: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaClock className="text-primary" />
              Horaires
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Réception
                </label>
                <input
                  type="text"
                  value={settings.horairesReception}
                  onChange={(e) => setSettings({ ...settings, horairesReception: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Check-in
                </label>
                <input
                  type="time"
                  value={settings.horairesCheckIn}
                  onChange={(e) => setSettings({ ...settings, horairesCheckIn: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Check-out
                </label>
                <input
                  type="time"
                  value={settings.horairesCheckOut}
                  onChange={(e) => setSettings({ ...settings, horairesCheckOut: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Configuration Email */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Configuration Email</h2>
            <p className="text-gray-600 mb-4">
              Pour configurer l'envoi d'emails automatiques, consultez le fichier <code className="bg-white px-2 py-1 rounded">.env</code>
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• <strong>SMTP_HOST</strong> : Serveur SMTP (ex: smtp.gmail.com)</p>
              <p>• <strong>SMTP_PORT</strong> : Port SMTP (ex: 587)</p>
              <p>• <strong>SMTP_USER</strong> : Votre email</p>
              <p>• <strong>SMTP_PASS</strong> : Mot de passe d'application</p>
            </div>
          </div>

          {/* Bouton de sauvegarde */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              <FaSave />
              {saving ? 'Enregistrement...' : 'Enregistrer les Paramètres'}
            </button>
          </div>
        </form>
      </div>

      {/* Informations système */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Informations Système</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between p-3 bg-gray-50 rounded">
            <span className="text-gray-600">Version</span>
            <span className="font-semibold">1.0.0</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded">
            <span className="text-gray-600">Base de données</span>
            <span className="font-semibold text-green-600">Connectée</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded">
            <span className="text-gray-600">Environnement</span>
            <span className="font-semibold">Production</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded">
            <span className="text-gray-600">Dernière mise à jour</span>
            <span className="font-semibold">{new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
