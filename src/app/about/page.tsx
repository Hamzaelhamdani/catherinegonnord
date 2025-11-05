import Navigation from '@/components/Navigation'

const exhibitions = [
  { year: '2021', venue: 'Centre Culturel du Panthéon', location: 'Paris' },
  { year: '2020', venue: 'Musée J. François Millet', location: 'Barbizon' },
  { year: '2008', venue: 'Galerie des Arches', location: 'Paris' },
  { year: '2007', venue: 'Aquarella', location: 'Rueil-Malmaison' },
  { year: '2006', venue: 'Paris Country Club', location: 'Rueil-Malmaison' },
  { year: '2004', venue: 'Centre Culturel du Panthéon', location: 'Paris' },
  { year: '2003', venue: 'Galerie Étienne de Causans', location: 'Paris' },
  { year: '2002', venue: 'Galerie Étienne de Causans', location: 'Paris' },
]

export default function About() {
  return (
    <div className="min-h-screen watercolor-bg">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="title-serif text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            À propos de l'artiste
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Artist Portrait Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="title-serif text-3xl font-light text-gray-900 mb-6">
              Catherine Gonnord
            </h2>
            <div className="space-y-4 text-body text-lg leading-relaxed text-gray-700">
              <p>
                Diplômée en architecture d'intérieur à l'Académie Charpentier (Paris), 
                Catherine Gonnord se consacre à la peinture depuis 2002. Son univers 
                pictural invite à l'évasion, au calme et à la lumière.
              </p>
              <p>
                Elle explore les thèmes de l'eau, des voyages, des intérieurs, des saisons, 
                et de l'architecture. Son travail exprime un désir d'ailleurs, loin du bruit moderne.
              </p>
              <p>
                À travers ses aquarelles, Catherine capture des moments de sérénité et de beauté, 
                offrant au spectateur une pause contemplative dans un monde en perpétuel mouvement.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            {/* Placeholder for artist photo */}
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-beige-100 rounded-lg soft-shadow-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <p className="text-lg">Portrait de Catherine Gonnord</p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-20 py-12 px-8 bg-blue-50/50 rounded-xl soft-shadow">
          <h2 className="title-serif text-3xl font-light text-gray-900 mb-8 text-center">
            Philosophie artistique
          </h2>
          <blockquote className="title-serif text-xl lg:text-2xl font-light text-gray-800 italic text-center leading-relaxed">
            "Mon travail exprime un désir d'ailleurs, loin du bruit moderne. 
            À travers l'aquarelle, je cherche à capturer ces moments de grâce 
            où la lumière révèle la beauté du quotidien et de l'extraordinaire."
          </blockquote>
          <cite className="block text-center mt-6 text-lg text-gray-600">— Catherine Gonnord</cite>
        </div>

        {/* Artistic Themes */}
        <div className="mb-20">
          <h2 className="title-serif text-3xl font-light text-gray-900 mb-8 text-center">
            Thèmes artistiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Abstractions',
                description: 'Explorations libres de la forme et de la couleur, où l\'émotion pure s\'exprime sans contrainte.'
              },
              {
                title: 'Architecture',
                description: 'Études architecturales qui révèlent la beauté des structures et l\'harmonie des proportions.'
              },
              {
                title: 'Eaux',
                description: 'Reflets et transparences, mouvement et sérénité des éléments aquatiques.'
              },
              {
                title: 'Escaliers',
                description: 'Perspectives verticales qui invitent au voyage et à l\'élévation spirituelle.'
              },
              {
                title: 'Intérieurs',
                description: 'Intimité des espaces domestiques, jeux de lumière et atmosphères feutrées.'
              },
              {
                title: 'Paysages',
                description: 'Nature et horizons lointains, invitation à la contemplation et à l\'évasion.'
              },
              {
                title: 'Saisons',
                description: 'Cycle temporel et métamorphoses de la nature au fil du temps.'
              },
              {
                title: 'Villes',
                description: 'Vie urbaine et architecture citadine, témoins de notre époque.'
              },
              {
                title: 'Voyages',
                description: 'Découvertes et rencontres, souvenirs d\'ailleurs cristallisés en couleurs.'
              },
            ].map((theme) => (
              <div key={theme.title} className="p-6 bg-white rounded-lg soft-shadow watercolor-border">
                <h3 className="title-serif text-xl font-medium text-gray-900 mb-3">
                  {theme.title}
                </h3>
                <p className="text-body text-gray-600 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exhibitions */}
        <div>
          <h2 className="title-serif text-3xl font-light text-gray-900 mb-8 text-center">
            Expositions
          </h2>
          <div className="bg-white rounded-xl soft-shadow-lg p-8">
            <div className="space-y-4">
              {exhibitions.map((exhibition, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <span className="title-serif text-lg font-medium text-blue-800">
                        {exhibition.year}
                      </span>
                    </div>
                    <div>
                      <h3 className="title-serif text-lg font-medium text-gray-900">
                        {exhibition.venue}
                      </h3>
                      <p className="text-gray-600">{exhibition.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-beige-50 rounded-xl p-8 soft-shadow">
            <h3 className="title-serif text-2xl font-light text-gray-900 mb-4">
              Découvrez la collection
            </h3>
            <p className="text-body text-gray-600 mb-6 max-w-2xl mx-auto">
              Explorez l'univers pictural de Catherine Gonnord à travers sa galerie en ligne.
            </p>
            <a
              href="/gallery"
              className="btn-watercolor px-8 py-3 rounded-full text-lg font-medium inline-block"
            >
              Voir la galerie
            </a>
          </div>
        </div>
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