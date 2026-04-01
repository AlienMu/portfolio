'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">{t('about')}</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img 
              src="/avatar.jpg" 
              alt="Alien" 
              className="w-48 h-48 rounded-full object-cover shadow-lg"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {t('aboutText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
