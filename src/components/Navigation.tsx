'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Logo from './Logo'
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon,
  ShoppingBagIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Galerie', href: '/gallery' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, profile, signOut } = useAuth()

  return (
    <nav className="glass-nav border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <Logo size="md" className="group-hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link px-4 py-2 rounded-full text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:bg-white/50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="p-3 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/50 transition-all duration-300"
                  title="Mon compte"
                >
                  <UserIcon className="h-5 w-5" />
                </Link>
                
                {profile?.is_admin && (
                  <Link
                    href="/admin"
                    className="p-3 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/50 transition-all duration-300"
                    title="Administration"
                  >
                    <CogIcon className="h-5 w-5" />
                  </Link>
                )}
                
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-full hover:bg-white/50"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="btn-premium px-6 py-3 rounded-full text-sm font-semibold"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-3 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white/50 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="glass-card mt-4 mb-4 p-6 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-white/20 pt-4 mt-4 space-y-1">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon compte
                  </Link>
                  
                  {profile?.is_admin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Administration
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-300"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/20 pt-4 mt-4">
                  <Link
                    href="/auth"
                    className="block btn-premium text-center py-3 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}