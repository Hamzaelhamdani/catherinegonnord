'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  HeartIcon, 
  ShareIcon, 
  ArrowLeftIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { realArtworks } from '@/data/artworks'

export default function ArtworkDetailPage() {
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: artwork.description,
        url: window.location.href
      })
    }
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
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl bg-white">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-turquoise-light/30 via-blue-powder/20 to-coral-light/30 flex items-center justify-center">
                        <div class="text-center text-gray-600">
                          <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full flex items-center justify-center">
                            <span class="text-5xl">🎨</span>
                          </div>
                          <p class="text-lg font-medium">${artwork.title}</p>
                          <p class="text-sm text-gray-500 mt-2">Image en cours de chargement</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
            
            {/* Actions sur l'image */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200"
              >
                {isLiked ? (
                  <HeartSolid className="h-6 w-6 text-coral-warm" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <button 
                onClick={handleShare}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200"
              >
                <ShareIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {artwork.featured && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-turquoise-bright to-coral-warm text-white">
                  ⭐ En vedette
                </span>
              </div>
            )}
          </div>

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
                <div key={relatedArtwork.id} className="group">
                  <Link href={`/gallery/${relatedArtwork.id}`}>
                    <div className="glass-card p-4 transition-all duration-500 group-hover:scale-105">
                      <div className="aspect-[4/5] relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={relatedArtwork.image}
                          alt={relatedArtwork.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-turquoise-light/30 via-blue-powder/20 to-coral-light/30 flex items-center justify-center">
                                  <div class="text-center text-gray-600">
                                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full flex items-center justify-center">
                                      <span class="text-2xl">🎨</span>
                                    </div>
                                    <p class="text-sm font-medium">${relatedArtwork.title}</p>
                                  </div>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedArtwork.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{relatedArtwork.category}</p>
                        <p className="text-base font-bold bg-gradient-to-r from-turquoise-bright to-coral-warm bg-clip-text text-transparent">
                          {relatedArtwork.price.toLocaleString()}€
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
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