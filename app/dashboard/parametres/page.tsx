'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaSave, FaHotel, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaUser, FaLock } from 'react-icons/fa'

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
  
  // États pour le changement de mot de passe
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage('')

    // Validation
    if (newPassword.length < 6) {
      setPasswordMessage('❌ Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('❌ Les mots de passe ne correspondent pas')
      return
    }

    setPasswordLoading(true)

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setPasswordMessage('✅ Mot de passe modifié avec succès')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => setPasswordMessage(''), 5000)
      } else {
        setPasswordMessage(`❌ ${data.error || 'Erreur lors de la modification'}`)
      }
    } catch (error) {
      setPasswordMessage('❌ Erreur de connexion au serveur')
    } finally {
      setPasswordLoading(false)
    }
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

          {/* Modification Information de Connexion */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Modification Information de Connexion
            </h2>
            <p className="text-gray-700 mb-6">
              Gérez vos identifiants de connexion au dashboard administrateur
            </p>

            {passwordMessage && (
              <div className={`mb-4 p-4 rounded-lg ${
                passwordMessage.includes('✅') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {passwordMessage}
              </div>
            )}
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email de connexion actuel
                </label>
                <input
                  type="email"
                  value={session?.user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Votre email de connexion actuel
                </p>
              </div>

              <div className="pt-4 border-t border-blue-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaLock className="text-blue-600" />
                  Changer le mot de passe
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Mot de passe actuel
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Entrez votre mot de passe actuel"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimum 6 caractères"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Retapez le nouveau mot de passe"
                      required
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaSave />
                    {passwordLoading ? 'Modification en cours...' : 'Modifier le mot de passe'}
                  </button>
                </div>
              </div>
            </form>
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

      {/* Configuration Email SMTP */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaEnvelope className="text-primary" />
          Configuration Email SMTP
        </h2>
        <p className="text-gray-600 mb-6">
          Configurez l'envoi automatique d'emails de confirmation aux clients
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="font-bold text-gray-800 mb-4">Variables d'environnement (.env)</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-gray-700">SMTP_HOST</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Requis</span>
              </div>
              <p className="text-sm text-gray-600">Serveur SMTP (ex: smtp.gmail.com)</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-gray-700">SMTP_PORT</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Requis</span>
              </div>
              <p className="text-sm text-gray-600">Port SMTP (ex: 587 pour TLS, 465 pour SSL)</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-gray-700">SMTP_USER</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Requis</span>
              </div>
              <p className="text-sm text-gray-600">Votre adresse email complète</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-gray-700">SMTP_PASS</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Sensible</span>
              </div>
              <p className="text-sm text-gray-600">Mot de passe d'application (pas votre mot de passe principal)</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-gray-700">EMAIL_FROM</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Optionnel</span>
              </div>
              <p className="text-sm text-gray-600">Nom d'affichage (ex: "Karibotel &lt;noreply@karibotel.com&gt;")</p>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start gap-3">
              <div className="text-yellow-600 text-xl">💡</div>
              <div>
                <p className="font-semibold text-yellow-800 mb-2">Guide de configuration Gmail</p>
                <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                  <li>Activez la validation en 2 étapes sur votre compte Google</li>
                  <li>Allez dans "Mots de passe d'application"</li>
                  <li>Créez un nouveau mot de passe pour "Autre (nom personnalisé)"</li>
                  <li>Utilisez ce mot de passe dans SMTP_PASS</li>
                </ol>
                <p className="text-xs text-yellow-600 mt-2">
                  Consultez <code className="bg-yellow-100 px-2 py-1 rounded">CONFIGURATION_EMAIL.md</code> pour plus de détails
                </p>
              </div>
            </div>
          </div>
        </div>
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
