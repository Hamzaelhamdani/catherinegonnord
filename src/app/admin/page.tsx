'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navigation from '@/components/Navigation'
import {
  PaintBrushIcon,
  ShoppingBagIcon,
  UsersIcon,
  SparklesIcon,
  CogIcon,
  ChartBarIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

// Mock data - will be replaced with actual Supabase data
const mockStats = {
  totalArtworks: 24,
  totalOrders: 12,
  totalUsers: 45,
  totalNFTs: 8,
  monthlyRevenue: 4850,
  pendingOrders: 3
}

const mockRecentOrders = [
  { id: '1', user: 'Marie Dubois', artwork: 'Reflets d\'eau', amount: 850, status: 'pending', date: '2025-01-15' },
  { id: '2', user: 'Jean Martin', artwork: 'Escalier de lumière', amount: 1200, status: 'confirmed', date: '2025-01-14' },
  { id: '3', user: 'Sophie Bernard', artwork: 'Voyage en Provence', amount: 950, status: 'shipped', date: '2025-01-13' },
]

const mockRecentArtworks = [
  { id: '1', title: 'Reflets d\'eau', category: 'Eaux', price: 850, status: 'available' },
  { id: '2', title: 'Escalier de lumière', category: 'Escaliers', price: 1200, status: 'sold' },
  { id: '3', title: 'Voyage en Provence', category: 'Voyages', price: 950, status: 'available' },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('month')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-green-100 text-green-800'
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'sold':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen watercolor-bg">
        <Navigation />
        
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="title-serif text-4xl font-light text-gray-900">
                Administration
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez votre galerie et vos ventes en ligne
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
              
              <Link
                href="/admin/artworks/new"
                className="btn-watercolor px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center space-x-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Nouvelle œuvre</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 soft-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Œuvres</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.totalArtworks}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PaintBrushIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/admin/artworks"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Gérer les œuvres →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 soft-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commandes</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingBagIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/admin/orders"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Voir les commandes →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 soft-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/admin/customers"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Gérer les clients →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 soft-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">NFTs</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.totalNFTs}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <SparklesIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/admin/nfts"
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Gérer les NFTs →
                </Link>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Revenus ce mois</p>
                <p className="text-4xl font-bold">{mockStats.monthlyRevenue.toLocaleString()} €</p>
                <p className="text-blue-100 text-sm mt-2">+12% par rapport au mois dernier</p>
              </div>
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl p-6 soft-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="title-serif text-xl font-medium text-gray-900">
                  Commandes récentes
                </h2>
                <Link
                  href="/admin/orders"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir tout
                </Link>
              </div>
              
              <div className="space-y-4">
                {mockRecentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{order.user}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.artwork}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">{order.date}</span>
                        <span className="font-semibold text-gray-900">{order.amount} €</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {mockStats.pendingOrders > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>{mockStats.pendingOrders}</strong> commande{mockStats.pendingOrders > 1 ? 's' : ''} en attente de traitement
                  </p>
                </div>
              )}
            </div>

            {/* Recent Artworks */}
            <div className="bg-white rounded-xl p-6 soft-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="title-serif text-xl font-medium text-gray-900">
                  Œuvres récentes
                </h2>
                <Link
                  href="/admin/artworks"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir tout
                </Link>
              </div>
              
              <div className="space-y-4">
                {mockRecentArtworks.map((artwork) => (
                  <div key={artwork.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-beige-100 rounded-lg flex items-center justify-center">
                        <PaintBrushIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{artwork.title}</h3>
                        <p className="text-sm text-gray-600">{artwork.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{artwork.price} €</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artwork.status)}`}>
                        {artwork.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/artworks/new"
              className="group bg-white rounded-xl p-6 soft-shadow hover:soft-shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <PlusIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-800">
                    Ajouter une œuvre
                  </h3>
                  <p className="text-sm text-gray-600">
                    Publier une nouvelle pièce
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/gallery"
              target="_blank"
              className="group bg-white rounded-xl p-6 soft-shadow hover:soft-shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <EyeIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-green-800">
                    Voir le site
                  </h3>
                  <p className="text-sm text-gray-600">
                    Aperçu public de la galerie
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="group bg-white rounded-xl p-6 soft-shadow hover:soft-shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <CogIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-800">
                    Paramètres
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configuration du site
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}