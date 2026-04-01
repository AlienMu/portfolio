'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  en: {
    logo: 'Portfolio',
    greeting: 'Hello, I am a Alien',

    subtitle: 'Focused on building elegant and efficient user interfaces and interactive experiences',
    about: 'About Me',
    aboutText: 'Love coding frontend and playing with all kinds of modern web technologies~\n\nFocus on making pages smooth, beautiful, performant, and delivering top-notch experiences✨\n\nDaily life includes listening to music, riding motorcycles, and traveling around.\n\nPassionate about coding, living with freedom~',
    skills: 'Skills',
    projects: 'Projects',
    demo: 'Demo',
    contact: 'Contact',
    email: 'Email',
    twitter: 'Twitter',
    github: 'GitHub',
  },
  zh: {
    logo: 'Portfolio',
    greeting: '你好，我是Alien',
    subtitle: '专注于构建优雅、高效的用户界面与交互体验',
    about: '关于我',
    aboutText: '喜欢敲前端代码，玩转各种现代 Web 技术～\n\n专注把页面做得流畅好看、性能在线，体验拉满✨\n\n日常爱听歌、骑摩托、到处溜达旅行，\n\n写代码有热爱，过日子有自由～',
    skills: '技能',
    projects: '项目',
    demo: '演示',
    contact: '联系方式',
    email: '邮箱',
    twitter: '推特',
    github: 'GitHub',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en')
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
