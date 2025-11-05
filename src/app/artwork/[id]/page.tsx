'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowLeftIcon, 
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  SparklesIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// Mock data - will be replaced with actual Supabase data
const mockArtwork = {
  id: '1',
  title: 'Reflets d\'eau',
  category: 'eaux',
  categoryLabel: 'Eaux',
  description: 'Cette aquarelle capture la danse délicate de la lumière sur l\'eau, créant un jeu de reflets et de transparences qui évoque la sérénité et le mouvement perpétuel de la nature. Les nuances de bleu et les touches dorées révèlent la beauté éphémère d\'un instant suspendu.',
  image: '/placeholder-artwork-1.jpg',
  price_eur: 850,
  price_nft: 120,
  year: 2023,
  medium: 'Aquarelle sur papier Arches',
  dimensions: '30 x 40 cm',
  is_available: true,
  nft_status: 'available',
  created_at: '2023-10-15'
}

interface ArtworkDetailProps {
  params: { id: string }
}

export default function ArtworkDetail({ params }: ArtworkDetailProps) {
  const [selectedOption, setSelectedOption] = useState<'physical' | 'nft' | 'both'>('physical')
  const [isLiked, setIsLiked] = useState(false)
  const [showNFTInfo, setShowNFTInfo] = useState(false)
  const { user } = useAuth()

  const getTotalPrice = () => {
    switch (selectedOption) {
      case 'physical':
        return mockArtwork.price_eur
      case 'nft':
        return mockArtwork.price_nft
      case 'both':
        return mockArtwork.price_eur + mockArtwork.price_nft * 0.8 // 20% discount for bundle
      default:
        return mockArtwork.price_eur
    }
  }

  const handlePurchase = () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/auth'
      return
    }
    
    // Implement Stripe checkout
    console.log('Redirecting to checkout...', {
      artworkId: mockArtwork.id,
      option: selectedOption,
      price: getTotalPrice()
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: mockArtwork.title,
        text: `Découvrez "${mockArtwork.title}" par Catherine Gonnord`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papier!')
    }
  }

  return (
    <div className="min-h-screen watercolor-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Retour à la galerie</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artwork Image */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-beige-100 rounded-lg soft-shadow-lg overflow-hidden artwork-frame">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-24 h-24 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🎨</span>
                  </div>
                  <p className="text-lg font-medium">{mockArtwork.title}</p>
                  <p className="text-sm text-gray-400">Photo haute résolution à venir</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {isLiked ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
                <span>{isLiked ? 'Ajouté aux favoris' : 'Ajouter aux favoris'}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ShareIcon className="h-5 w-5" />
                <span>Partager</span>
              </button>
            </div>
          </div>

          {/* Artwork Details */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {mockArtwork.categoryLabel}
                </span>
                <span className="text-sm text-gray-500">Réf: #{mockArtwork.id}</span>
              </div>
              
              <h1 className="title-serif text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                {mockArtwork.title}
              </h1>
              
              <p className="text-body text-lg leading-relaxed text-gray-700 mb-6">
                {mockArtwork.description}
              </p>

              {/* Technical Details */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-lg soft-shadow">
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Technique</dt>
                  <dd className="text-sm text-gray-900">{mockArtwork.medium}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Dimensions</dt>
                  <dd className="text-sm text-gray-900">{mockArtwork.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Année</dt>
                  <dd className="text-sm text-gray-900">{mockArtwork.year}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">Disponibilité</dt>
                  <dd className={`text-sm font-medium ${mockArtwork.is_available ? 'text-green-600' : 'text-red-600'}`}>
                    {mockArtwork.is_available ? 'Disponible' : 'Vendu'}
                  </dd>
                </div>
              </div>
            </div>

            {/* Purchase Options */}
            {mockArtwork.is_available && (
              <div className="bg-white rounded-xl p-6 soft-shadow-lg">
                <h3 className="title-serif text-2xl font-medium text-gray-900 mb-6">
                  Options d'achat
                </h3>

                <div className="space-y-4 mb-6">
                  {/* Physical Artwork */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'physical'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption('physical')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={selectedOption === 'physical'}
                          onChange={() => setSelectedOption('physical')}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">Œuvre physique</h4>
                          <p className="text-sm text-gray-600">Aquarelle originale avec certificat d'authenticité</p>
                        </div>
                      </div>
                      <span className="font-bold text-lg text-gray-900">{mockArtwork.price_eur} €</span>
                    </div>
                  </div>

                  {/* NFT Version */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'nft'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption('nft')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={selectedOption === 'nft'}
                          onChange={() => setSelectedOption('nft')}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center space-x-2">
                          <div>
                            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                              <span>Version NFT</span>
                              <SparklesIcon className="h-4 w-4 text-yellow-500" />
                            </h4>
                            <p className="text-sm text-gray-600">Token numérique sur blockchain Hedera</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowNFTInfo(!showNFTInfo)
                            }}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <InformationCircleIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <span className="font-bold text-lg text-gray-900">{mockArtwork.price_nft} €</span>
                    </div>
                  </div>

                  {/* Bundle Option */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'both'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption('both')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={selectedOption === 'both'}
                          onChange={() => setSelectedOption('both')}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                            <span>Pack complet</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">-20%</span>
                          </h4>
                          <p className="text-sm text-gray-600">Œuvre physique + NFT</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm text-gray-500 line-through">
                          {mockArtwork.price_eur + mockArtwork.price_nft} €
                        </span>
                        <span className="font-bold text-lg text-gray-900">{getTotalPrice()} €</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NFT Information */}
                {showNFTInfo && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">Qu'est-ce qu'un NFT ?</h5>
                    <p className="text-sm text-blue-800 mb-3">
                      Un NFT (Non-Fungible Token) est un certificat numérique unique qui prouve 
                      votre propriété de l'œuvre sur la blockchain. Il inclut l'image haute résolution 
                      et toutes les métadonnées de l'œuvre.
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Propriété vérifiable sur blockchain Hedera</li>
                      <li>• Image haute résolution (300 DPI)</li>
                      <li>• Métadonnées de l'artiste et de l'œuvre</li>
                      <li>• Certificat d'authenticité numérique</li>
                    </ul>
                  </div>
                )}

                {/* Purchase Button */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-gray-900">{getTotalPrice()} €</span>
                  </div>
                  
                  <button
                    onClick={handlePurchase}
                    className="w-full btn-watercolor px-6 py-4 rounded-lg text-lg font-medium flex items-center justify-center space-x-2"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>
                      {!user ? 'Se connecter pour acheter' : 'Ajouter au panier'}
                    </span>
                  </button>
                  
                  {!user && (
                    <p className="text-sm text-gray-600 text-center">
                      <Link href="/auth" className="text-blue-600 hover:text-blue-700 underline">
                        Créez un compte
                      </Link> pour effectuer un achat
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Artist Info */}
            <div className="bg-gradient-to-r from-blue-50 to-beige-50 rounded-xl p-6">
              <h3 className="title-serif text-xl font-medium text-gray-900 mb-4">
                À propos de l'artiste
              </h3>
              <p className="text-body text-gray-700 mb-4">
                Catherine Gonnord, diplômée en architecture d'intérieur, se consacre à la peinture 
                depuis 2002. Son univers pictural invite à l'évasion, au calme et à la lumière.
              </p>
              <Link
                href="/about"
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                En savoir plus sur Catherine Gonnord
              </Link>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        <div className="mt-20">
          <h2 className="title-serif text-3xl font-light text-gray-900 mb-8 text-center">
            Œuvres similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/artwork/${i + 1}`} className="group">
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-beige-100 rounded-lg soft-shadow overflow-hidden transition-all duration-300 group-hover:scale-105">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 mx-auto mb-2 bg-blue-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <p className="text-sm">Œuvre {i + 1}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="title-serif text-lg font-medium text-gray-900">Titre de l'œuvre {i + 1}</h3>
                  <p className="text-sm text-gray-600">Catégorie</p>
                  <p className="font-semibold text-gray-900 mt-1">{750 + i * 100} €</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
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