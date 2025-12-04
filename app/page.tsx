'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaHotel, FaSwimmingPool, FaLeaf, FaPhone, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
            Bienvenue à Karibotel
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up">
            Votre havre de paix à Ranomafana, Fianarantsoa
          </p>
          <Link
            href="/reserver"
            className="inline-block bg-white text-primary hover:bg-nature-50 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all shadow-lg hover:shadow-xl animate-bounce-slow"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-primary">
            Nos Services
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <FaHotel className="text-6xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Chambres Confortables</h3>
              <p className="text-gray-600">
                14 chambres modernes et spacieuses, équipées pour votre confort
              </p>
              <Link
                href="/chambres"
                className="inline-block mt-4 text-primary hover:text-primary-dark font-semibold"
              >
                Voir les chambres →
              </Link>
            </div>

            <div className="text-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <FaSwimmingPool className="text-6xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Piscine</h3>
              <p className="text-gray-600">
                Profitez de notre piscine, incluse avec votre réservation
              </p>
              <Link
                href="/piscine"
                className="inline-block mt-4 text-primary hover:text-primary-dark font-semibold"
              >
                En savoir plus →
              </Link>
            </div>

            <div className="text-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <FaLeaf className="text-6xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Cadre Naturel</h3>
              <p className="text-gray-600">
                Un environnement paisible pour vous ressourcer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-r from-nature-700 to-nature-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Prêt à réserver ?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
            Réservez dès maintenant et profitez de notre hospitalité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/reserver"
              className="bg-white text-primary hover:bg-nature-50 px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              Réserver une chambre
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              <FaPhone className="inline mr-2" />
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
