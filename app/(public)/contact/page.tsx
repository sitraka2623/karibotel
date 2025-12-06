import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 text-center">
          Contactez-nous
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaPhone className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Téléphone</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <a href="tel:+261342260667" className="hover:text-primary transition-colors">
                  +261 34 22 606 67
                </a>
              </p>
              <p className="text-gray-600">
                <a href="tel:+261325520699" className="hover:text-primary transition-colors">
                  +261 32 55 206 99
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaEnvelope className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:contact@karibotel.mg" className="hover:text-primary transition-colors">
                contact@karibotel.mg
              </a>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Adresse</h3>
            <p className="text-gray-600">Ranomafana, Fianarantsoa, Madagascar</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Envoyez-nous un message
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nom
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
