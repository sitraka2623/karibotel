'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa'

interface Chambre {
  id: string
  numero: string
  description: string
  prix: number
  disponible: boolean
  photo?: string
}

export default function GestionChambresPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [chambres, setChambres] = useState<Chambre[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingChambre, setEditingChambre] = useState<Chambre | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      loadChambres()
    }
  }, [status])

  const loadChambres = async () => {
    try {
      const res = await fetch('/api/chambres')
      const data = await res.json()
      setChambres(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (chambre: Chambre) => {
    setEditingChambre(chambre)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) return

    try {
      const res = await fetch(`/api/chambres/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        loadChambres()
        alert('Chambre supprimée avec succès')
      }
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingChambre || saving) return

    setSaving(true)
    try {
      const res = await fetch(`/api/chambres/${editingChambre.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numero: editingChambre.numero,
          description: editingChambre.description,
          prix: editingChambre.prix,
          photo: editingChambre.photo || null,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        await loadChambres()
        setShowModal(false)
        setEditingChambre(null)
        alert('✅ Chambre mise à jour avec succès')
      } else {
        console.error('Erreur API:', data)
        alert(`❌ Erreur: ${data.error || 'Erreur lors de la mise à jour'}`)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Erreur lors de la mise à jour')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Chargement...</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chambres.map((chambre) => (
            <div
              key={chambre.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
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
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      chambre.disponible
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {chambre.disponible ? 'Disponible' : 'Réservé'}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {chambre.description}
                </p>

                <div className="text-2xl font-bold text-primary mb-4">
                  {chambre.prix.toLocaleString()} Ar
                  <span className="text-sm text-gray-500">/nuit</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(chambre)}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(chambre.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de modification */}
        {showModal && editingChambre && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Modifier Chambre {editingChambre.numero}
              </h2>

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Numéro de Chambre
                  </label>
                  <input
                    type="text"
                    value={editingChambre.numero}
                    onChange={(e) =>
                      setEditingChambre({ ...editingChambre, numero: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingChambre.description}
                    onChange={(e) =>
                      setEditingChambre({
                        ...editingChambre,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Prix (Ariary)
                  </label>
                  <input
                    type="number"
                    value={editingChambre.prix}
                    onChange={(e) =>
                      setEditingChambre({
                        ...editingChambre,
                        prix: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    URL de la Photo
                  </label>
                  <input
                    type="text"
                    value={editingChambre.photo || ''}
                    onChange={(e) =>
                      setEditingChambre({ ...editingChambre, photo: e.target.value })
                    }
                    placeholder="/image/CHAMBRE1.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingChambre(null)
                    }}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  )
}
