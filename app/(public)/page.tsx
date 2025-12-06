'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaHotel, FaSwimmingPool, FaLeaf, FaPhone, FaChevronLeft, FaChevronRight, FaMountain, FaTree, FaHiking, FaWater, FaUsers, FaRecycle, FaUtensils, FaVideo } from 'react-icons/fa'

export default function Home() {
  const images = [
    '/image/NATURE.jpg',
    '/image/VUE.jpg',
    '/image/PISCINE.jpg',
    '/image/CHAMBRE1.jpg',
    '/image/CHAMBRE2.jpg',
    '/image/CHAMBRE3.jpg',
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000) // Change toutes les 5 secondes

    return () => clearInterval(interval)
  }, [images.length])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <main>
      {/* Hero Section avec Carrousel */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
        {/* Images du carrousel */}
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image 
              src={img} 
              alt={`Karibotel ${index + 1}`} 
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Boutons de navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label="Image précédente"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label="Image suivante"
        >
          <FaChevronRight className="text-xl" />
        </button>

        {/* Indicateurs */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Image ${index + 1}`}
            />
          ))}
        </div>

        {/* Contenu */}
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-down">
            Bienvenue au Karibotel Ranomafana
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up">
            Votre destination idyllique nichée à flanc de colline à l'entrée de la ville de Ranomafana
          </p>
          <Link
            href="/reserver"
            className="inline-block bg-white text-primary hover:bg-nature-50 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-lg hover:shadow-xl animate-bounce-slow"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>

      {/* Présentation Karibotel */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-nature-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
                Votre Destination Idyllique
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nichée à flanc de colline à l'entrée de la ville de Ranomafana, le Karibotel vous offre une expérience unique alliant confort, nature et développement durable.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMountain className="text-2xl text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Vue panoramique sur le village et la rivière</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaRecycle className="text-2xl text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Engagement en faveur du développement durable</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaHotel className="text-2xl text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">13 bungalows confortables et écologiques</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaUtensils className="text-2xl text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Restaurant et bar lounge avec des produits locaux et durables</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaSwimmingPool className="text-2xl text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Piscine de 14m sur 6m</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaVideo className="text-2xl text-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Équipements audiovisuels pour vos réunions et événements</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/image/VUE.jpg" 
                alt="Vue panoramique Karibotel" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Réserve de Ranomafana */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
              Découvrez la Réserve de Ranomafana
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Un sanctuaire naturel classé au patrimoine mondial de l'UNESCO, avec plus de 41 000 hectares de forêt tropicale humide, abritant une biodiversité incroyable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 rounded-xl bg-nature-50 hover:shadow-xl transition-all">
              <FaHiking className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Randonnées Guidées</h3>
              <p className="text-gray-600">
                Découvrez la faune unique de Madagascar avec nos guides experts
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-nature-50 hover:shadow-xl transition-all">
              <FaTree className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Centre Valbio</h3>
              <p className="text-gray-600">
                Visite du centre de recherche scientifique de renommée mondiale
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-nature-50 hover:shadow-xl transition-all">
              <FaWater className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Sources Chaudes</h3>
              <p className="text-gray-600">
                Détendez-vous dans les bains thermaux naturels
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-nature-50 hover:shadow-xl transition-all">
              <FaUsers className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Culture Malgache</h3>
              <p className="text-gray-600">
                Immersion dans les traditions et la culture locale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Touristiques */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-nature-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
            Nos Guides Touristiques Partenaires
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Profitez de la connaissance approfondie de nos guides locaux pour découvrir les merveilles de la réserve de Ranomafana, tout en soutenant l'économie locale et la conservation de la biodiversité.
          </p>
          <div className="bg-primary/10 rounded-2xl p-8 border-2 border-primary/20">
            <p className="text-xl font-semibold text-primary mb-4">
              Vivez l'expérience de vacances éco-responsables sans compromis sur le confort au KARIBOTEL Ranomafana
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-r from-nature-700 to-nature-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Nous avons hâte de vous accueillir !</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
            Pour plus d'information, contactez notre gérant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 mb-8">
            <div className="flex items-center gap-2 text-lg">
              <FaPhone className="text-2xl" />
              <a href="tel:+261342260667" className="hover:underline font-semibold">
                +261 34 22 606 67
              </a>
            </div>
            <span className="hidden sm:inline text-2xl">•</span>
            <div className="flex items-center gap-2 text-lg">
              <FaPhone className="text-2xl" />
              <a href="tel:+261325520699" className="hover:underline font-semibold">
                +261 32 55 206 99
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/reserver"
              className="bg-white text-primary hover:bg-nature-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            >
              Réserver une chambre
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
