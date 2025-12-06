'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaClock, FaCheckCircle } from 'react-icons/fa'

interface Piscine {
  horaires: string
  reglement: string
  description: string
}

export default function PiscinePage() {
  const [piscine, setPiscine] = useState<Piscine | null>(null)

  useEffect(() => {
    fetch('/api/piscine')
      .then((res) => res.json())
      .then((data) => setPiscine(data))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Image de la piscine */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
          <Image 
            src="/image/PISCINE.jpg" 
            alt="Piscine Karibotel" 
            fill
            className="object-cover"
          />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Notre Piscine</h1>
          <p className="text-xl text-gray-600">
            Profitez de notre piscine, incluse avec votre réservation
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <FaClock /> Horaires
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {piscine?.horaires || 'Ouvert tous les jours de 8h à 20h'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {piscine?.description ||
              'Notre piscine chauffée vous accueille dans un cadre verdoyant et apaisant.'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <FaCheckCircle /> Règlement
          </h2>
          <div className="text-gray-700 whitespace-pre-line">
            {piscine?.reglement || 'Règlement disponible prochainement'}
          </div>
        </div>
      </div>
    </main>
  )
}
