'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Détecter le scroll pour changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Accueil', icon: '🏠' },
    { href: '/chambres', label: 'Chambres', icon: '🛏️' },
    { href: '/piscine', label: 'Piscine', icon: '🏊' },
    { href: '/reserver', label: 'Réserver', icon: '📅' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-primary/10' 
          : 'bg-gradient-to-r from-primary via-primary-dark to-primary shadow-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo avec animation et effet glow */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              {/* Effet glow derrière le logo */}
              <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
                scrolled 
                  ? 'bg-primary/30 scale-110' 
                  : 'bg-white/30 scale-125'
              }`} />
              
              {/* Logo */}
              <div className={`relative rounded-full shadow-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${
                scrolled 
                  ? 'bg-white ring-4 ring-primary/20' 
                  : 'bg-white ring-4 ring-white/30'
              }`}>
                <img 
                  src="/image/KARIBOTEL.png" 
                  alt="Karibotel Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Nom de l'hôtel */}
            <div className="hidden sm:block">
              <h1 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-primary' : 'text-white'
              }`}>
                KARIBOTEL
              </h1>
              <p className={`text-xs md:text-sm transition-colors duration-300 ${
                scrolled ? 'text-primary/70' : 'text-white/80'
              }`}>
                Ranomafana, Fianarantsoa
              </p>
            </div>
          </Link>

          {/* Menu Desktop avec design moderne */}
          <div className="hidden lg:flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              scrolled 
                ? 'bg-primary/5' 
                : 'bg-white/10 backdrop-blur-sm'
            }`}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full group overflow-hidden ${
                    pathname === link.href
                      ? scrolled
                        ? 'text-white bg-primary shadow-lg scale-105'
                        : 'text-primary bg-white shadow-lg scale-105'
                      : scrolled
                        ? 'text-gray-700 hover:text-primary hover:bg-primary/10'
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {/* Effet de brillance au survol */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <span className="relative flex items-center gap-2">
                    <span className="text-base">{link.icon}</span>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bouton Menu Mobile avec animation hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
              scrolled
                ? 'bg-primary/10 hover:bg-primary/20 text-primary'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            aria-label="Menu"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-primary' : 'bg-white'
                } ${
                  mobileMenuOpen 
                    ? 'top-1/2 -translate-y-1/2 rotate-45' 
                    : 'top-0'
                }`}
              />
              <span 
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-primary' : 'bg-white'
                } ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span 
                className={`absolute left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-primary' : 'bg-white'
                } ${
                  mobileMenuOpen 
                    ? 'top-1/2 -translate-y-1/2 -rotate-45' 
                    : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Menu Mobile avec design amélioré */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen 
              ? 'max-h-[500px] opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`py-6 border-t transition-colors duration-300 ${
            scrolled ? 'border-primary/10' : 'border-white/20'
          }`}>
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-2 ${
                    pathname === link.href
                      ? scrolled
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white text-primary shadow-lg scale-105'
                      : scrolled
                        ? 'text-gray-700 hover:bg-primary/10'
                        : 'text-white hover:bg-white/10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                  
                  {pathname === link.href && (
                    <span className="ml-auto">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
