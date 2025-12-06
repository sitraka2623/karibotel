'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { 
  FaHome, 
  FaBed, 
  FaCalendarAlt, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes
} from 'react-icons/fa'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Fermer la sidebar lors du changement de route sur mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-2xl">Chargement...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const menuItems = [
    { href: '/dashboard', icon: FaHome, label: 'Tableau de bord' },
    { href: '/dashboard/chambres', icon: FaBed, label: 'Chambres' },
    { href: '/dashboard/reservations', icon: FaCalendarAlt, label: 'Réservations' },
    { href: '/dashboard/statistiques', icon: FaChartBar, label: 'Statistiques' },
    { href: '/dashboard/parametres', icon: FaCog, label: 'Paramètres' },
  ]

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed h-full shadow-2xl z-50
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo Admin */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <FaUser className="text-2xl" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Karibotel</h2>
                <p className="text-xs text-gray-400">Administration</p>
              </div>
            </div>
            {/* Bouton fermer pour mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Fermer le menu"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <FaUser className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 flex justify-between items-center">
            {/* Bouton hamburger mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? (
                <FaTimes className="text-2xl text-gray-700" />
              ) : (
                <FaBars className="text-2xl text-gray-700" />
              )}
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 truncate">
                {menuItems.find(item => item.href === pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">
                Bienvenue, {session.user?.name}
              </p>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              <Link
                href="/"
                target="_blank"
                className="px-3 lg:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm lg:text-base"
              >
                <span className="hidden sm:inline">Voir le site</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
