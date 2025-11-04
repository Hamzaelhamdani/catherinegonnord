'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general' // general, commission, info
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen watercolor-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="title-serif text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Contact
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-body">
            Vous souhaitez acquérir une œuvre, commander une pièce sur mesure, 
            ou simplement échanger avec Catherine ? N'hésitez pas à nous contacter.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-blue-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="title-serif text-3xl font-light text-gray-900 mb-8">
                Informations de contact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">contact@catpainting.fr</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                    <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Atelier</h3>
                    <p className="text-gray-600">Paris, France</p>
                    <p className="text-sm text-gray-500">Visite sur rendez-vous</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Information */}
            <div className="bg-gradient-to-r from-blue-50 to-beige-50 rounded-xl p-6">
              <h3 className="title-serif text-xl font-medium text-gray-900 mb-4">
                Commandes personnalisées
              </h3>
              <p className="text-body text-gray-700 mb-4">
                Catherine accepte les commandes sur mesure pour des œuvres personnalisées. 
                Que ce soit pour un intérieur spécifique, un lieu cher à votre cœur, 
                ou une vision particulière, elle sera ravie d'étudier votre projet.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Délai de réalisation : 4-6 semaines</li>
                <li>• Acompte de 50% à la commande</li>
                <li>• Formats disponibles : 20x30 cm à 70x100 cm</li>
                <li>• Consultation préliminaire gratuite</li>
              </ul>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-xl p-6 soft-shadow">
              <h3 className="title-serif text-xl font-medium text-gray-900 mb-4">
                Questions fréquentes
              </h3>
              <div className="space-y-3">
                <details className="group">
                  <summary className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                    Quels sont les délais de livraison ?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 pl-4">
                    Les œuvres sont expédiées sous 2-3 jours ouvrés en France métropolitaine, 
                    5-7 jours pour l'international. Emballage sécurisé garanti.
                  </p>
                </details>
                
                <details className="group">
                  <summary className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                    Les œuvres sont-elles encadrées ?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 pl-4">
                    Les aquarelles sont vendues non encadrées, avec un passe-partout de qualité musée. 
                    Nous pouvons recommander des encadreurs professionnels.
                  </p>
                </details>

                <details className="group">
                  <summary className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                    Comment fonctionne l'achat NFT ?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 pl-4">
                    L'achat NFT inclut un token unique sur la blockchain Hedera avec l'image haute résolution 
                    et le certificat d'authenticité numérique. Un portefeuille vous sera créé automatiquement.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 soft-shadow-lg">
            <h2 className="title-serif text-3xl font-light text-gray-900 mb-8">
              Envoyez-nous un message
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PaperAirplaneIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="title-serif text-xl font-medium text-gray-900 mb-2">
                  Message envoyé !
                </h3>
                <p className="text-gray-600">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type de demande
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">Demande générale</option>
                    <option value="commission">Commande personnalisée</option>
                    <option value="purchase">Achat d'œuvre</option>
                    <option value="nft">Information NFT</option>
                    <option value="exhibition">Exposition/Collaboration</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom et prénom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sujet de votre message"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-watercolor px-6 py-4 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20">
          <h2 className="title-serif text-3xl font-light text-gray-900 mb-8 text-center">
            Nous trouver
          </h2>
          <div className="bg-gradient-to-br from-blue-100 to-beige-100 rounded-xl h-64 flex items-center justify-center soft-shadow">
            <div className="text-center text-gray-500">
              <MapPinIcon className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Carte interactive</p>
              <p className="text-sm">Localisation de l'atelier à Paris</p>
            </div>
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