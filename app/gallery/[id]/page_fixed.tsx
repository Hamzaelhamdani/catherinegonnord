'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeftIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { realArtworks } from '@/data/artworks'
import ArtworkImage from '@/components/ArtworkImage'
import RelatedArtworkCard from '@/components/RelatedArtworkCard'

export default function ArtworkDetailPage() {
  const params = useParams()
  
  const artwork = realArtworks.find(art => art.id === parseInt(params.id as string))
  
  if (!artwork) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Œuvre non trouvée</h1>
          <Link href="/gallery" className="btn-premium px-6 py-3">
            Retour à la galerie
          </Link>
        </div>
      </div>
    )
  }

  // Œuvres similaires (même catégorie, excluant l'œuvre actuelle)
  const relatedArtworks = realArtworks
    .filter(art => art.category === artwork.category && art.id !== artwork.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    alert('Fonctionnalité d\'achat à venir ! Contactez Catherine pour plus d\'informations.')
  }

  const handleContactArtist = () => {
    window.location.href = '/contact'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Bouton retour */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8">
        <Link 
          href="/gallery"
          className="inline-flex items-center gap-2 text-turquoise-bright hover:text-turquoise-dark transition-colors duration-300 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Retour à la galerie</span>
        </Link>
      </div>

      {/* Contenu principal */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image principale */}
          <ArtworkImage artwork={artwork} />

          {/* Informations de l'œuvre */}
          <div className="space-y-8">
            {/* En-tête */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-turquoise-light/20 text-turquoise-dark text-sm font-medium rounded-full">
                  {artwork.category}
                </span>
                {artwork.available ? (
                  <span className="inline-block px-3 py-1 bg-sage-light/20 text-sage-green text-sm font-medium rounded-full">
                    ✓ Disponible
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-sm font-medium rounded-full">
                    Vendue
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                {artwork.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-2">Par {artwork.artist}</p>
              
              <div className="text-3xl font-bold bg-gradient-to-r from-turquoise-bright to-coral-warm bg-clip-text text-transparent mb-6">
                {artwork.price.toLocaleString()}€
              </div>
            </div>

            {/* Boutons d'action */}
            {artwork.available && (
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="btn-premium flex-1 py-4 text-lg inline-flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Acheter cette œuvre
                </button>
                <button 
                  onClick={handleContactArtist}
                  className="flex-1 px-6 py-4 border-2 border-turquoise-bright text-turquoise-bright hover:bg-turquoise-bright hover:text-white transition-all duration-300 rounded-lg font-medium bg-white text-lg"
                >
                  Nous contacter
                </button>
              </div>
            )}

            {!artwork.available && (
              <div className="glass-card p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Œuvre vendue</h3>
                <p className="text-gray-600 mb-4">
                  Cette œuvre a trouvé son propriétaire, mais Catherine crée régulièrement de nouvelles pièces.
                </p>
                <button 
                  onClick={handleContactArtist}
                  className="btn-premium px-6 py-3"
                >
                  Commander une œuvre similaire
                </button>
              </div>
            )}

            {/* Détails techniques */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                Détails techniques
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-turquoise-light/20 rounded-full flex items-center justify-center">
                    📏
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium text-gray-900">{artwork.dimensions}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-coral-light/20 rounded-full flex items-center justify-center">
                    📅
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Année</p>
                    <p className="font-medium text-gray-900">{artwork.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sage-light/20 rounded-full flex items-center justify-center">
                    🎨
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Technique</p>
                    <p className="font-medium text-gray-900">{artwork.technique}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-powder/20 rounded-full flex items-center justify-center">
                    🏷️
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="font-medium text-gray-900">{artwork.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                À propos de cette œuvre
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {artwork.description}
              </p>
            </div>
          </div>
        </div>

        {/* Œuvres similaires */}
        {relatedArtworks.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-6">
                Œuvres similaires
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-turquoise-bright to-coral-warm mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedArtworks.map((relatedArtwork) => (
                <RelatedArtworkCard key={relatedArtwork.id} artwork={relatedArtwork} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/gallery" className="btn-premium px-8 py-4 text-lg">
                Voir toute la collection
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}