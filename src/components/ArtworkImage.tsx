'use client'

import { useState } from 'react'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline'

interface ArtworkImageProps {
  artwork: {
    id: string
    title: string
    imageUrl: string
    featured?: boolean
  }
}

export default function ArtworkImage({ artwork }: ArtworkImageProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: `Découvrez "${artwork.title}" de Catherine Gonnord`,
        url: window.location.href
      })
    }
  }

  return (
    <div className="relative">
      <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl bg-white">
        {!imageError ? (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-turquoise-light/30 via-blue-powder/20 to-coral-light/30 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full flex items-center justify-center">
                <span className="text-5xl">🎨</span>
              </div>
              <p className="text-lg font-medium">{artwork.title}</p>
              <p className="text-sm text-gray-500 mt-2">Image en cours de chargement</p>
            </div>
          </div>
        )}
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
  )
}