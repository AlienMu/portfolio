'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('logo')}
        </a>
        
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('about')}
          </a>
          <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('skills')}
          </a>
          <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('projects')}
          </a>
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('contact')}
          </a>
          
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center justify-center min-w-[60px] px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
          
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
