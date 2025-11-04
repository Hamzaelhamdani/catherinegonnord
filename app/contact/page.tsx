'use client'

import { useState } from 'react'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    artworkInterest: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        artworkInterest: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-ethereal/20 via-rose-vibrant/10 to-gold-soft/20 flex items-center justify-center">
        <div className="glass-card p-8 max-w-md mx-auto text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Message envoyé !
          </h2>
          <p className="text-gray-700">
            Merci pour votre message. Catherine vous répondra dans les plus brefs délais.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-turquoise-light/30 via-blue-powder/20 to-coral-light/30">
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-bold tracking-tight font-serif text-gray-900">
              Contact
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Échangeons autour de l'art et de vos projets artistiques
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Informations de contact */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              Restons en contact
            </h2>
            
            <div className="space-y-6 mb-12">
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-turquoise-bright to-blue-ocean rounded-full flex items-center justify-center">
                    <EnvelopeIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">contact@catpainting.com</p>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-coral-warm to-coral-soft rounded-full flex items-center justify-center">
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-700">+33 1 23 45 67 89</p>
                    <p className="text-sm text-gray-600">Lun-Ven 9h-18h</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage-green to-sage-light rounded-full flex items-center justify-center">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Atelier</h3>
                    <p className="text-gray-700">Paris, France</p>
                    <p className="text-sm text-gray-600">Sur rendez-vous uniquement</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-sky to-turquoise-soft rounded-full flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horaires</h3>
                    <p className="text-gray-700">Lundi - Vendredi</p>
                    <p className="text-sm text-gray-600">9h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Mes Services
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-turquoise-bright rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Vente d'œuvres originales</h4>
                    <p className="text-sm text-gray-600">Aquarelles uniques avec certificat d'authenticité</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-coral-warm rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Commandes personnalisées</h4>
                    <p className="text-sm text-gray-600">Créations sur mesure selon vos désirs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-sage-green rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cours et ateliers</h4>
                    <p className="text-sm text-gray-600">Apprentissage de l'aquarelle en groupe ou individuel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-sky rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expositions</h4>
                    <p className="text-sm text-gray-600">Participation à des événements artistiques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <div className="glass-card p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Envoyez-moi un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 rounded-lg border-0 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-blue-ethereal/50 focus:bg-white/80 transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>
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
                      className="w-full px-4 py-3 rounded-lg border-0 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-blue-ethereal/50 focus:bg-white/80 transition-all duration-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-0 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-blue-ethereal/50 focus:bg-white/80 transition-all duration-300"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="achat">Achat d'une œuvre</option>
                    <option value="commande">Commande personnalisée</option>
                    <option value="cours">Cours d'aquarelle</option>
                    <option value="exposition">Projet d'exposition</option>
                    <option value="presse">Demande presse</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="artworkInterest" className="block text-sm font-medium text-gray-700 mb-2">
                    Œuvre d'intérêt (optionnel)
                  </label>
                  <input
                    type="text"
                    id="artworkInterest"
                    name="artworkInterest"
                    value={formData.artworkInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-0 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-blue-ethereal/50 focus:bg-white/80 transition-all duration-300"
                    placeholder="Nom de l'œuvre qui vous intéresse"
                  />
                </div>

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
                    className="w-full px-4 py-3 rounded-lg border-0 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-blue-ethereal/50 focus:bg-white/80 transition-all duration-300 resize-none"
                    placeholder="Décrivez votre projet, vos questions ou vos souhaits..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full btn-premium ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    'Envoyer le message'
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-turquoise-bright/10 border border-turquoise-bright/20 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note :</strong> Vos données personnelles sont protégées et ne seront utilisées 
                  que pour répondre à votre demande. Délai de réponse habituel : 24-48h.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}