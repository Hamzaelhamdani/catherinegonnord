'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  HeartIcon, 
  ShareIcon, 
  ArrowLeftIcon,
  ShoppingCartIcon,
  EyeIcon,
  CalendarIcon,
  PaintBrushIcon,
  RectangleStackIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { realArtworks } from '@/data/artworks'

// Données simulées (en réalité, ces données viendraient de Supabase)
const mockArtworks = [
  {
    id: 1,
    title: "Brumes Matinales",
    price: 680,
    description: "Cette aquarelle capture la magie des premières heures du jour, quand la brume danse encore sur les prairies. Les tons doux de bleu et de vert se mélangent dans une harmonie parfaite, créant une atmosphère de sérénité et de mystère.",
    longDescription: "Inspirée par les matinées d'automne dans la campagne française, cette œuvre reflète la beauté éphémère de ces moments où la nature se réveille lentement. Catherine Gonnord a utilisé la technique de l'aquarelle humide sur humide pour obtenir ces effets de transparence et de fluidité qui caractérisent son style unique.",
    image: "/images/artwork1.jpg",
    images: [
      "/images/artwork1.jpg",
      "/images/artwork1-detail1.jpg", 
      "/images/artwork1-detail2.jpg"
    ],
    artist: "Catherine Gonnord",
    category: "Paysages",
    technique: "Aquarelle sur papier Arches",
    dimensions: "38x56 cm",
    year: 2024,
    available: true,
    featured: true,
    materials: ["Aquarelle professionnelle", "Papier Arches 300g", "Encadrement possible"],
    provenance: "Atelier de l'artiste",
    condition: "Parfait état",
    signature: "Signée en bas à droite",
    certificate: true,
    likes: 23,
    views: 156
  },
  // Autres œuvres...
]

const relatedArtworks = [
  {
    id: 2,
    title: "Reflets Dorés",
    price: 850,
    image: "/images/artwork2.jpg",
    category: "Abstraits"
  },
  {
    id: 3,
    title: "Harmonie Bleue", 
    price: 720,
    image: "/images/artwork3.jpg",
    category: "Abstraits"
  },
  {
    id: 5,
    title: "Lumières d'Automne",
    price: 620,
    image: "/images/artwork5.jpg",
    category: "Paysages"
  }
]

export default function ArtworkDetailPage() {
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  
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
    // Logique d'ajout au panier
    alert('Œuvre ajoutée au panier !')
  }

  const handleContactArtist = () => {
    // Logique de contact
    window.location.href = '/contact'
  }

  const handleShare = () => {
    navigator.share?.({
      title: artwork.title,
      text: artwork.description,
      url: window.location.href
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-ethereal/20 via-rose-vibrant/10 to-gold-soft/20">
      {/* Bouton retour */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8">
        <Link 
          href="/gallery"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Retour à la galerie
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="glass-card p-4 overflow-hidden">
              <div className="aspect-[4/5] relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-ethereal/20 to-rose-vibrant/20"></div>
                <div className="absolute top-4 left-4 z-10">
                  {artwork.featured && (
                    <span className="premium-badge">
                      ★ Coup de cœur
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
                  >
                    {isLiked ? (
                      <HeartSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-700" />
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
                  >
                    <ShareIcon className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Miniatures */}
            {artwork.images && artwork.images.length > 1 && (
              <div className="flex gap-3">
                {artwork.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-1 aspect-square overflow-hidden rounded-lg transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-blue-ethereal shadow-lg' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-ethereal/20 to-rose-vibrant/20"></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="space-y-8">
            {/* En-tête */}
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                {artwork.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Par {artwork.artist}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" />
                  {artwork.views} vues
                </div>
                <div className="flex items-center gap-1">
                  <HeartIcon className="h-4 w-4" />
                  {artwork.likes} likes
                </div>
              </div>
            </div>

            {/* Prix et disponibilité */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-ethereal to-purple-deep bg-clip-text text-transparent">
                    {artwork.price.toLocaleString()}€
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Livraison gratuite en France
                  </p>
                </div>
                <div className="text-right">
                  {artwork.available ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Disponible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Vendu
                    </span>
                  )}
                </div>
              </div>

              {artwork.available && (
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="btn-premium w-full flex items-center justify-center gap-2"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Ajouter au panier
                  </button>
                  <button
                    onClick={handleContactArtist}
                    className="w-full px-6 py-3 border-2 border-blue-ethereal text-blue-ethereal hover:bg-blue-ethereal hover:text-white transition-all duration-300 rounded-lg font-medium"
                  >
                    Contacter l'artiste
                  </button>
                </div>
              )}
            </div>

            {/* Détails techniques */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Détails de l'œuvre</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <RectangleStackIcon className="h-5 w-5 text-blue-ethereal" />
                  <div>
                    <p className="text-sm text-gray-600">Dimensions</p>
                    <p className="font-medium">{artwork.dimensions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-blue-ethereal" />
                  <div>
                    <p className="text-sm text-gray-600">Année</p>
                    <p className="font-medium">{artwork.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <PaintBrushIcon className="h-5 w-5 text-blue-ethereal" />
                  <div>
                    <p className="text-sm text-gray-600">Technique</p>
                    <p className="font-medium">{artwork.technique}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-ethereal to-purple-deep"></div>
                  <div>
                    <p className="text-sm text-gray-600">Catégorie</p>
                    <p className="font-medium">{artwork.category}</p>
                  </div>
                </div>
              </div>

              {artwork.certificate && (
                <div className="mt-4 p-3 bg-gold-soft/20 border border-gold-soft/30 rounded-lg">
                  <p className="text-sm font-medium text-gold-dark">
                    ✓ Certificat d'authenticité inclus
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {artwork.description}
                </p>
                
                {artwork.longDescription && (
                  <div className={`transition-all duration-300 ${showFullDescription ? 'block' : 'hidden'}`}>
                    <p className="text-gray-700 leading-relaxed">
                      {artwork.longDescription}
                    </p>
                  </div>
                )}
                
                {artwork.longDescription && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-ethereal hover:text-blue-deep font-medium transition-colors duration-300"
                  >
                    {showFullDescription ? 'Voir moins' : 'Lire la suite'}
                  </button>
                )}
              </div>

              {artwork.materials && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Matériaux utilisés</h4>
                  <ul className="space-y-1">
                    {artwork.materials.map((material, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-ethereal rounded-full"></div>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Œuvres similaires */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Œuvres similaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArtworks.map((relatedArtwork) => (
              <Link
                key={relatedArtwork.id}
                href={`/gallery/${relatedArtwork.id}`}
                className="group"
              >
                <div className="glass-card p-0 overflow-hidden hover:scale-[1.02] transition-all duration-500">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-ethereal/20 to-rose-vibrant/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/50 transition-all duration-500"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-gray-900 mb-1">
                      {relatedArtwork.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="premium-badge text-xs">{relatedArtwork.category}</span>
                      <p className="font-bold text-blue-ethereal">
                        {relatedArtwork.price.toLocaleString()}€
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}