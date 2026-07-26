import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  tList: (key: ListKey) => readonly string[];
}

const translations = {
  en: {
    greeting: "Hi, I'm Alien",
    role: 'Frontend engineer · Author of CineView',
    avatarCaption: 'ALIEN MU',
    marquee: 'PERSONAL WORKS · ALIEN MU · FRONTEND ENGINEER · BUILT WITH CINEVIEW · ',
    scrollHint: 'Scroll',
    worksTitle: 'WORKS',
    worksSub: 'Scroll to unfold · hover to preview · click to open',
    worksIdle: 'Point at any row —\nits details unfold here.',
    siteTitle: 'THIS SITE',
    siteLead:
      'This site is a work too — it runs on CineView, the React framework I built myself. The scroll-locking and row-by-row reveals you just used are all it.',
    siteStats: '45 animation presets · 1222 tests · 48.6 KB gzip',
    contactTitle: 'SAY HI',
    email: 'Email',
    twitter: 'Twitter',
    github: 'GitHub',
    builtWith: 'Built with my own framework — CineView',
    updatedPrefix: 'updated',
    viewSource: 'View source',
    liveDemo: 'Live demo',
    docs: 'Docs',
  },
  zh: {
    greeting: '你好，我是 Alien',
    role: '前端工程师 · 自研框架 CineView 作者',
    avatarCaption: 'ALIEN MU',
    marquee: '个人作品 · ALIEN MU · 前端工程师 · 自研框架 CINEVIEW · ',
    scrollHint: '向下滚动',
    worksTitle: '个人作品',
    worksSub: '滚动逐行展开 · 移入预览 · 点击进入',
    worksIdle: '把指针移到任意一行，\n这里会展开它的详情。',
    siteTitle: '本站',
    siteLead:
      '这个网站本身也是作品——它跑在我自研的 React 框架 CineView 上，你刚刚经过的滚动锁定、逐行登场，都由它驱动。',
    siteStats: '45 组动画预设 · 1222 项测试 · 48.6 KB gzip',
    contactTitle: '联系',
    email: '邮箱',
    twitter: '推特',
    github: 'GitHub',
    builtWith: '本站由自研框架 CineView 驱动',
    updatedPrefix: '更新于',
    viewSource: '查看源码',
    liveDemo: '在线演示',
    docs: '文档',
  },
} as const;

const lists = {
  en: {
    bioLines: [
      'I write frontend for a living — and for fun.',
      'Smooth, good-looking pages, with performance that holds up.',
      'Off screen: music, motorcycles, wandering. Code with passion, live free.',
    ],
  },
  zh: {
    bioLines: [
      '喜欢敲前端代码，玩转各种现代 Web 技术。',
      '专注把页面做得流畅好看、性能在线。',
      '日常听歌、骑摩托、到处旅行——写代码有热爱，过日子有自由。',
    ],
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type ListKey = keyof typeof lists.en;

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
  const tList = (key: ListKey): readonly string[] => lists[language][key];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tList }}>
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
