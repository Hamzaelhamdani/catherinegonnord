'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

// Placeholder data - will be replaced with actual Supabase data
const mockArtworks = [
  {
    id: '1',
    title: 'Reflets d\'eau',
    category: 'eaux',
    categoryLabel: 'Eaux',
    image: '/placeholder-artwork-1.jpg',
    price: 850,
    year: 2023,
    medium: 'Aquarelle sur papier',
    dimensions: '30 x 40 cm'
  },
  {
    id: '2',
    title: 'Escalier de lumière',
    category: 'escaliers',
    categoryLabel: 'Escaliers',
    image: '/placeholder-artwork-2.jpg',
    price: 1200,
    year: 2023,
    medium: 'Aquarelle sur papier',
    dimensions: '40 x 50 cm'
  },
  {
    id: '3',
    title: 'Voyage en Provence',
    category: 'voyages',
    categoryLabel: 'Voyages',
    image: '/placeholder-artwork-3.jpg',
    price: 950,
    year: 2022,
    medium: 'Aquarelle sur papier',
    dimensions: '35 x 45 cm'
  },
  {
    id: '4',
    title: 'Intérieur parisien',
    category: 'interieurs',
    categoryLabel: 'Intérieurs',
    image: '/placeholder-artwork-4.jpg',
    price: 750,
    year: 2023,
    medium: 'Aquarelle sur papier',
    dimensions: '25 x 35 cm'
  },
  {
    id: '5',
    title: 'Abstraction bleue',
    category: 'abstractions',
    categoryLabel: 'Abstractions',
    image: '/placeholder-artwork-5.jpg',
    price: 680,
    year: 2022,
    medium: 'Aquarelle sur papier',
    dimensions: '30 x 30 cm'
  },
  {
    id: '6',
    title: 'Architecture gothique',
    category: 'architecture',
    categoryLabel: 'Architecture',
    image: '/placeholder-artwork-6.jpg',
    price: 1100,
    year: 2023,
    medium: 'Aquarelle sur papier',
    dimensions: '40 x 60 cm'
  },
]

const categories = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'abstractions', label: 'Abstractions' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'eaux', label: 'Eaux' },
  { value: 'escaliers', label: 'Escaliers' },
  { value: 'interieurs', label: 'Intérieurs' },
  { value: 'paysages', label: 'Paysages' },
  { value: 'saisons', label: 'Saisons' },
  { value: 'villes', label: 'Villes' },
  { value: 'voyages', label: 'Voyages' },
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredArtworks, setFilteredArtworks] = useState(mockArtworks)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = mockArtworks

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(artwork => artwork.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(artwork =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredArtworks(filtered)
  }, [selectedCategory, searchTerm])

  return (
    <div className="min-h-screen watercolor-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="title-serif text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Galerie
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-body">
            Découvrez la collection complète des aquarelles de Catherine Gonnord. 
            Chaque œuvre raconte une histoire unique à travers la délicatesse de l'aquarelle.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-blue-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une œuvre..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filtres</span>
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'btn-watercolor'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Categories */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-white rounded-lg soft-shadow">
              <h3 className="font-medium text-gray-900 mb-3">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value)
                      setShowFilters(false)
                    }}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.value
                        ? 'btn-watercolor'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            {filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? 's' : ''} trouvée{filteredArtworks.length > 1 ? 's' : ''}
            {selectedCategory && (
              <span> dans la catégorie "{categories.find(c => c.value === selectedCategory)?.label}"</span>
            )}
          </p>
        </div>

        {/* Artworks Grid */}
        {filteredArtworks.length > 0 ? (
          <div className="masonry-grid lg:column-count-3 md:column-count-2 column-count-1 gap-6">
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="break-inside-avoid mb-6 group">
                <Link href={`/artwork/${artwork.id}`}>
                  <div className="bg-white rounded-lg soft-shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:soft-shadow-xl">
                    {/* Artwork Image */}
                    <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-beige-100 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-2 bg-blue-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🎨</span>
                        </div>
                        <p className="text-sm px-4">{artwork.title}</p>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="font-semibold text-gray-900">{artwork.price} €</span>
                      </div>
                    </div>
                    
                    {/* Artwork Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="title-serif text-xl font-medium text-gray-900 group-hover:text-blue-800 transition-colors">
                          {artwork.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-blue-600 font-medium mb-2">
                        {artwork.categoryLabel}
                      </p>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{artwork.medium}</p>
                        <p>{artwork.dimensions}</p>
                        <p>{artwork.year}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-lg font-bold text-gray-900">
                          {artwork.price} €
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="title-serif text-xl font-medium text-gray-900 mb-2">
              Aucune œuvre trouvée
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche ou de navigation.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('')
                setSearchTerm('')
              }}
              className="btn-watercolor px-6 py-2 rounded-lg"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="title-serif text-2xl font-light mb-4">Catpainting</h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Galerie d'art en ligne dédiée aux aquarelles de Catherine Gonnord
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">
              © 2025 Catpainting. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}