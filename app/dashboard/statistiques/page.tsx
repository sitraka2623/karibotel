'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaChartLine, FaBed, FaCalendar, FaMoneyBillWave, FaUsers, FaCheckCircle } from 'react-icons/fa'

interface Stats {
  totalReservations: number
  reservationsConfirmees: number
  reservationsEnCours: number
  reservationsTerminees: number
  revenuTotal: number
  revenuMoisActuel: number
  tauxOccupation: number
  chambresDisponibles: number
  chambresOccupees: number
  totalChambres: number
  reservationsParMois: { mois: string; count: number }[]
  topChambres: { numero: string; count: number }[]
}

export default function StatistiquesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      loadStats()
    }
  }, [status])

  const loadStats = async () => {
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Chargement...</div>
      </div>
    )
  }

  if (!session || !stats) return null

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Statistiques</h1>

      {/* Stats principales */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-4xl opacity-80" />
            <div className="text-right">
              <p className="text-sm opacity-90">Total Réservations</p>
              <p className="text-4xl font-bold">{stats.totalReservations}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaCheckCircle className="text-4xl opacity-80" />
            <div className="text-right">
              <p className="text-sm opacity-90">Confirmées</p>
              <p className="text-4xl font-bold">{stats.reservationsConfirmees}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaBed className="text-4xl opacity-80" />
            <div className="text-right">
              <p className="text-sm opacity-90">En Cours</p>
              <p className="text-4xl font-bold">{stats.reservationsEnCours}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaMoneyBillWave className="text-4xl opacity-80" />
            <div className="text-right">
              <p className="text-sm opacity-90">Revenu Total</p>
              <p className="text-3xl font-bold">{(stats.revenuTotal / 1000).toFixed(0)}K Ar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Occupation des chambres */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaBed className="text-primary" />
            Occupation des Chambres
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Chambres</span>
              <span className="text-2xl font-bold text-gray-800">{stats.totalChambres}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Chambres Occupées</span>
              <span className="text-2xl font-bold text-orange-500">{stats.chambresOccupees}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Chambres Disponibles</span>
              <span className="text-2xl font-bold text-green-500">{stats.chambresDisponibles}</span>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-semibold">Taux d'Occupation</span>
                <span className="text-3xl font-bold text-primary">{stats.tauxOccupation}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-500"
                  style={{ width: `${stats.tauxOccupation}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaMoneyBillWave className="text-primary" />
            Revenus
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary to-green-600 rounded-lg p-6 text-white">
              <p className="text-sm opacity-90 mb-2">Revenu Total</p>
              <p className="text-4xl font-bold">{stats.revenuTotal.toLocaleString()} Ar</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <p className="text-sm opacity-90 mb-2">Revenu Mois Actuel</p>
              <p className="text-4xl font-bold">{stats.revenuMoisActuel.toLocaleString()} Ar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chambres les plus réservées */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaUsers className="text-primary" />
          Chambres les Plus Réservées
        </h2>
        
        <div className="space-y-4">
          {stats.topChambres.map((chambre, index) => (
            <div key={chambre.numero} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Chambre {chambre.numero}</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${(chambre.count / stats.totalReservations) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{chambre.count}</p>
                <p className="text-sm text-gray-600">réservations</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Réservations par mois */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaCalendar className="text-primary" />
          Réservations par Mois
        </h2>
        
        <div className="space-y-3">
          {stats.reservationsParMois.map((item) => (
            <div key={item.mois} className="flex items-center gap-4">
              <div className="w-24 text-gray-700 font-semibold">{item.mois}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div
                    className="bg-gradient-to-r from-primary to-green-500 h-8 rounded-full flex items-center justify-end pr-3 text-white font-semibold transition-all duration-500"
                    style={{ width: `${(item.count / Math.max(...stats.reservationsParMois.map(m => m.count))) * 100}%` }}
                  >
                    {item.count > 0 && item.count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
