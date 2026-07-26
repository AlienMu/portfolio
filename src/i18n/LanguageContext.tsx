import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const translations = {
  en: {
    worksTitle: 'WORKS',
    byline: 'A COLLECTION BY ALIEN MU',
    heroIntro:
      'I write frontend for a living and for fun — smooth, good-looking pages with performance that holds up. Off screen: music, motorcycles, and wandering. Code with passion, live with freedom.',
    scrollHint: 'Scroll to begin the screening',
    viewSource: 'View source',
    liveDemo: 'Live demo',
    docs: 'Docs',
    creditsTitle: 'CREDITS',
    email: 'Email',
    twitter: 'Twitter',
    github: 'GitHub',
    builtWith: 'Screened with CineView — a self-built framework',
    updatedPrefix: 'updated',
  },
  zh: {
    worksTitle: '作品集',
    byline: 'ALIEN MU · 出品',
    heroIntro:
      '喜欢敲前端代码，玩转各种现代 Web 技术。专注把页面做得流畅好看、性能在线。日常听歌、骑摩托、到处旅行——写代码有热爱，过日子有自由。',
    scrollHint: '向下滚动 开始放映',
    viewSource: '查看源码',
    liveDemo: '在线演示',
    docs: '文档',
    creditsTitle: '落款',
    email: '邮箱',
    twitter: '推特',
    github: 'GitHub',
    builtWith: '本站由自研框架 CineView 放映',
    updatedPrefix: '更新于',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

const STORAGE_KEY = 'portfolio-lang';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function initialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'zh' || stored === 'en') return stored;
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'));

  const t = (key: TranslationKey): string => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
