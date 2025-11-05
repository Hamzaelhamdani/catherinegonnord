import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-turquoise-light/30 via-blue-powder/20 to-coral-light/30">
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-bold tracking-tight font-serif text-gray-900">
              À Propos
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Découvrez l'univers et la passion de Catherine Gonnord
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Portrait de l'artiste */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="glass-card p-8 order-2 lg:order-1">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Catherine Gonnord
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Artiste aquarelliste passionnée, Catherine Gonnord puise son inspiration dans la beauté 
                éphémère de la nature et les émotions humaines. Depuis plus de quinze ans, elle explore 
                les possibilités infinies de l'aquarelle, cette technique délicate qui demande précision 
                et intuition.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Formée aux Beaux-Arts de Paris, Catherine a développé un style unique qui mélange 
                réalisme et abstraction. Ses œuvres capturent des moments fugaces, des atmosphères 
                particulières où la lumière danse avec les couleurs dans une harmonie parfaite.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Chaque toile raconte une histoire, évoque une émotion, invite à la contemplation. 
                Catherine croit profondément que l'art doit toucher l'âme et créer une connexion 
                intime entre l'œuvre et celui qui la regarde.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="glass-card p-4 overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-turquoise-bright/20 to-coral-warm/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parcours artistique */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">
            Parcours Artistique
          </h2>
          
          <div className="space-y-8">
            {[
              {
                year: "2024",
                title: "Exposition personnelle",
                description: "Galerie Moderne, Paris - \"Transparences\"",
                highlight: true
              },
              {
                year: "2023",
                title: "Prix de l'Aquarelle",
                description: "Salon International de l'Art Contemporain, Lyon"
              },
              {
                year: "2022",
                title: "Résidence d'artiste",
                description: "Château de Versailles - Programme culturel"
              },
              {
                year: "2021",
                title: "Exposition collective",
                description: "\"Femmes Artistes\" - Musée d'Art Moderne, Marseille"
              },
              {
                year: "2020",
                title: "Formation spécialisée",
                description: "Techniques avancées d'aquarelle - Académie Julian, Paris"
              },
              {
                year: "2009",
                title: "Diplôme des Beaux-Arts",
                description: "École Nationale Supérieure des Beaux-Arts, Paris"
              }
            ].map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center font-bold text-white ${
                  milestone.highlight 
                    ? 'bg-gradient-to-br from-coral-warm to-coral-soft' 
                    : 'bg-gradient-to-br from-turquoise-bright to-blue-ocean'
                }`}>
                  {milestone.year}
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-700">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophie artistique */}
        <div className="glass-card p-8 mb-20">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Ma Philosophie
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticité</h3>
              <p className="text-gray-700">
                Chaque œuvre exprime une vérité personnelle, une émotion authentique 
                qui résonne avec l'âme humaine.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-coral-warm to-coral-soft rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Harmonie</h3>
              <p className="text-gray-700">
                L'équilibre parfait entre les couleurs, les formes et les émotions 
                crée une symphonie visuelle apaisante.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sage-green to-sage-light rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Temporalité</h3>
              <p className="text-gray-700">
                Capturer l'instant présent, ces moments fugaces qui rendent 
                la vie si précieuse et si belle.
              </p>
            </div>
          </div>
        </div>

        {/* Technique et matériaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Ma Technique
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'aquarelle est un médium exigeant qui ne pardonne aucune erreur. 
                Cette contrainte devient une liberté quand on apprend à danser avec elle.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Je privilégie la technique "humide sur humide" qui permet des fondus 
                naturels et des effets de transparence uniques. Chaque coup de pinceau 
                est réfléchi, chaque couleur choisie avec intention.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Mes œuvres naissent souvent d'une émotion, d'un souvenir, d'un paysage 
                qui m'a marquée. Je laisse ensuite la peinture exprimer sa propre personnalité.
              </p>
            </div>
          </div>
          
          <div className="glass-card p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Matériaux Premium
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Papiers</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Papier Arches 300g - Grain fin et torchon</li>
                  <li>• Papier Fabriano Artistico - 100% coton</li>
                  <li>• Papier Hahnemühle - Qualité archive</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pigments</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Aquarelles Winsor & Newton Professional</li>
                  <li>• Pigments Sennelier - Extra-fine</li>
                  <li>• Couleurs Daniel Smith - Pureté maximale</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Conservation</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Encadrement avec verre anti-UV</li>
                  <li>• Passe-partout acid-free</li>
                  <li>• Certificat d'authenticité inclus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Découvrez Mes Œuvres
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Chaque aquarelle raconte une histoire unique. Laissez-vous emporter 
            par la beauté et l'émotion de mes créations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="btn-premium"
            >
              Voir la galerie
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-turquoise-bright text-turquoise-bright hover:bg-turquoise-bright hover:text-white transition-all duration-300 rounded-lg font-medium"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}