import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowRightIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { realArtworks } from '@/data/artworks'

// Sélectionner les œuvres en vedette
const featuredArtworks = realArtworks.filter(artwork => artwork.featured).slice(0, 4)

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Section principale moderne et internationale */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background subtil avec nuances de vert */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sage-mist/40 via-pure-white to-sage-pale/20"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-sage-light/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-sage-soft/15 rounded-full blur-3xl opacity-40 animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Contenu principal */}
            <div className="space-y-10">
              {/* Badge international */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sage-mist border border-sage-light/30">
                <GlobeAltIcon className="h-4 w-4 text-sage-medium" />
                <span className="text-sm font-medium text-sage-deep">International Fine Artist</span>
              </div>
              
              {/* Titre principal */}
              <div className="space-y-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight text-charcoal font-serif">
                  Catherine Gonnord
                  <br />
                </h1>
                </div>
              
              {/* Description moderne */}
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-medium-gray leading-relaxed max-w-lg">
                  Contemporary watercolorist bridging architecture and fine art.
                </p>
                <p className="text-lg sm:text-xl text-medium-gray leading-relaxed max-w-lg">
                  Creating luminous works that capture the essence of 
                  <span className="text-sage-deep font-medium"> travel, interiors, and seasons</span>.
                </p>
              </div>
              
              {/* Statistiques internationales */}
              <div className="grid grid-cols-3 gap-8 py-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-sage-deep mb-2">23+</div>
                  <div className="text-sm text-medium-gray uppercase tracking-wider">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-sage-deep mb-2">200+</div>
                  <div className="text-sm text-medium-gray uppercase tracking-wider">Works</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-sage-deep mb-2">8</div>
                  <div className="text-sm text-medium-gray uppercase tracking-wider">Exhibitions</div>
                </div>
              </div>
              
              {/* Actions principales */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gallery"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-sage-medium hover:bg-sage-deep text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span>View Collection</span>
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-sage-medium text-sage-deep hover:bg-sage-medium hover:text-white rounded-full font-medium transition-all duration-300"
                >
                  Artist Story
                </Link>
              </div>
              
              {/* Badges de crédibilité */}
              <div className="flex items-center space-x-6 pt-8">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="h-5 w-5 text-sage-medium" />
                  <span className="text-sm text-medium-gray">Featured Artist</span>
                </div>
                <div className="w-px h-6 bg-sage-light"></div>
                <div className="text-sm text-medium-gray">Architecture Graduate • Fine Arts</div>
              </div>
            </div>
            
            {/* Galerie moderne */}
            <div className="relative">
              {/* Grille d'œuvres en vedette */}
              <div className="grid grid-cols-2 gap-4">
                {featuredArtworks.map((artwork, index) => (
                  <Link
                    key={artwork.id}
                    href={`/gallery/${artwork.id}`}
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-sage-mist hover:scale-105 transition-all duration-500"
                    style={{
                      transform: index % 2 === 0 ? 'translateY(0)' : 'translateY(2rem)',
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay élégant */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-medium text-lg mb-1">{artwork.title}</h3>
                        <p className="text-white/80 text-sm">{artwork.technique} • {artwork.year}</p>
                      </div>
                    </div>
                    
                    {/* Badge prix pour œuvres premium */}
                    {artwork.price > 700 && (
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-sage-medium text-white text-xs font-medium rounded-full">
                          Premium
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Élément décoratif */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-sage-light/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-sage-soft/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
          {/* Call-to-action final */}
          <div className="mt-24 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-sage-light/50 shadow-lg">
              <span className="text-medium-gray">Discover the complete collection</span>
              <Link
                href="/gallery"
                className="text-sage-medium hover:text-sage-deep font-medium transition-colors"
              >
                Gallery →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}