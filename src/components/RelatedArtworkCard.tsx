'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RelatedArtworkCardProps {
  artwork: {
    id: string
    title: string
    category: string
    price: number
    imageUrl: string
  }
}

export default function RelatedArtworkCard({ artwork }: RelatedArtworkCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="group">
      <Link href={`/gallery/${artwork.id}`}>
        <div className="glass-card p-4 transition-all duration-500 group-hover:scale-105">
          <div className="aspect-[4/5] relative overflow-hidden rounded-xl mb-4">
            {!imageError ? (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-turquoise-light/30 via-blue-powder/20 to-coral-light/30 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
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
            <p className="text-base font-bold bg-gradient-to-r from-turquoise-bright to-coral-warm bg-clip-text text-transparent">
              {artwork.price.toLocaleString()}€
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}