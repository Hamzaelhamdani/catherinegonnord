'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { realArtworks } from '@/data/artworks'
import GalleryArtworkCard from '@/components/GalleryArtworkCard'

// Extraire les catégories uniques des œuvres
const allCategories = ['Toutes', ...new Set(realArtworks.map(artwork => artwork.category))]

const priceRanges = [
  { label: 'Tous les prix', min: 0, max: Infinity },
  { label: 'Moins de 500€', min: 0, max: 500 },
  { label: '500€ - 750€', min: 500, max: 750 },
  { label: '750€ - 1000€', min: 750, max: 1000 },
  { label: 'Plus de 1000€', min: 1000, max: Infinity }
]

export default function GalleryPage() {
  const [artworks, setArtworks] = useState(realArtworks)
  const [filteredArtworks, setFilteredArtworks] = useState(realArtworks)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('title')

  useEffect(() => {
    let filtered = artworks

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(artwork => 
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtre par catégorie
    if (selectedCategory !== 'Toutes') {
      filtered = filtered.filter(artwork => artwork.category === selectedCategory)
    }

    // Filtre par prix
    filtered = filtered.filter(artwork => 
      artwork.price >= selectedPriceRange.min && artwork.price <= selectedPriceRange.max
    )

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'year':
          return (b.year || 0) - (a.year || 0)
        case 'title':
        default:
          return a.title.localeCompare(b.title)
      }
    })

    setFilteredArtworks(filtered)
  }, [artworks, searchTerm, selectedCategory, selectedPriceRange, sortBy])

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec base blanche */}
      <div className="bg-gradient-to-br from-blue-powder/20 to-coral-light/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-light mb-6 text-gray-900 font-serif">
              Galerie d'Art
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-bright to-coral-warm mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'univers pictural de Catherine Gonnord à travers {realArtworks.length} œuvres uniques
            </p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm border border-turquoise-light/20 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Barre de recherche */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une œuvre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-turquoise-bright focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Bouton filtres mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-premium px-6 py-3 inline-flex items-center space-x-2"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filtres</span>
            </button>

            {/* Filtres desktop */}
            <div className={`lg:flex gap-4 ${showFilters ? 'flex flex-col space-y-4' : 'hidden'}`}>
              {/* Catégorie */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-turquoise-bright focus:border-transparent bg-white"
              >
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Prix */}
              <select
                value={selectedPriceRange.label}
                onChange={(e) => {
                  const range = priceRanges.find(r => r.label === e.target.value)
                  if (range) setSelectedPriceRange(range)
                }}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-turquoise-bright focus:border-transparent bg-white"
              >
                {priceRanges.map(range => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>

              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-turquoise-bright focus:border-transparent bg-white"
              >
                <option value="title">Ordre alphabétique</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="year">Année</option>
              </select>
            </div>
          </div>
        </div>

        {/* Compteur de résultats */}
        <div className="mb-8">
          <p className="text-gray-600">
            {filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? 's' : ''} trouvée{filteredArtworks.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille des œuvres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredArtworks.map((artwork) => (
            <GalleryArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-turquoise-light to-coral-light rounded-full flex items-center justify-center">
              <MagnifyingGlassIcon className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-serif text-gray-900 mb-4">Aucune œuvre trouvée</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou de filtrage pour découvrir d'autres œuvres.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Toutes')
                setSelectedPriceRange(priceRanges[0])
              }}
              className="btn-premium px-6 py-3"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Section call-to-action */}
      <div className="bg-gradient-to-br from-blue-powder/20 to-coral-light/20 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-6">
              Une œuvre vous intéresse ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contactez Catherine pour plus d'informations, commander une œuvre ou organiser une visite de l'atelier.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="btn-premium px-8 py-4 text-lg"
              >
                Nous contacter
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 text-lg border-2 border-turquoise-bright text-turquoise-bright hover:bg-turquoise-bright hover:text-white transition-all duration-300 rounded-lg font-medium bg-white/80 backdrop-blur-sm"
              >
                En savoir plus sur l'artiste
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}