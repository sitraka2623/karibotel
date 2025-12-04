'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaCheckCircle, FaClock } from 'react-icons/fa'

interface Chambre {
  id: string
  numero: string
  description: string
  prix: number
  disponible: boolean
  photo?: string
}

export default function ChambresPage() {
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/chambres')
      .then((res) => res.json())
      .then((data) => {
        setChambres(data)
        setLoading(false)
      })
  }, [])

  const getStatutBadge = (disponible: boolean) => {
    if (disponible) {
      return (
        <span className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          <FaCheckCircle /> Disponible
        </span>
      )
    }
    return (
      <span className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
        <FaClock /> Réservé
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Chargement...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 sm:mb-8 text-center">
          Nos Chambres
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {chambres.map((chambre) => (
            <div
              key={chambre.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={chambre.photo || `/image/CHAMBRE${(parseInt(chambre.numero.slice(1)) % 7) + 1}.jpg`}
                  alt={`Chambre ${chambre.numero}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Chambre {chambre.numero}
                  </h3>
                  {getStatutBadge(chambre.disponible)}
                </div>

                <p className="text-gray-600 mb-4">{chambre.description}</p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">
                    {chambre.prix.toLocaleString()} Ar
                    <span className="text-xs sm:text-sm text-gray-500">/nuit</span>
                  </span>
                  <Link
                    href={`/reserver?chambre=${chambre.id}`}
                    className="w-full sm:w-auto text-center bg-primary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
