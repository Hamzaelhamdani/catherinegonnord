'use client'

import { useState } from 'react'
import Link from 'next/link'

interface GalleryArtworkCardProps {
  artwork: {
    id: string
    title: string
    category: string
    technique?: string
    dimensions?: string
    price: number
    imageUrl: string
    available?: boolean
    year?: number
  }
}

export default function GalleryArtworkCard({ artwork }: GalleryArtworkCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="group">
      <Link href={`/gallery/${artwork.id}`}>
        <div className="glass-card p-4 transition-all duration-500 group-hover:scale-105">
          <div className="aspect-[4/5] relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-turquoise-light/30 via-blue-powder/20 to-coral-light/30">
            {!imageError ? (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full flex items-center justify-center">
                    <span className="text-3xl">🎨</span>
                  </div>
                  <p className="text-sm font-medium">{artwork.title}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 line-clamp-2">
              {artwork.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{artwork.category}</p>
            <p className="text-xs text-gray-500 mb-3">{artwork.technique || 'Technique mixte'} • {artwork.dimensions || 'Dimensions non spécifiées'}</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold bg-gradient-to-r from-turquoise-bright to-coral-warm bg-clip-text text-transparent">
                {artwork.price.toLocaleString()}€
              </p>
              {artwork.available !== false ? (
                <span className="text-xs text-sage-green font-medium">Disponible</span>
              ) : (
                <span className="text-xs text-gray-400 font-medium">Vendue</span>
              )}
            </div>
            {artwork.year && (
              <p className="text-xs text-gray-400 mt-1">{artwork.year}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}