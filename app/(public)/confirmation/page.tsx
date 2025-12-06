import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-primary mb-4">
          Réservation confirmée !
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Votre réservation a été enregistrée avec succès. Un email de confirmation
          vous a été envoyé.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
