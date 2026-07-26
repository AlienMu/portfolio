import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  tList: (key: ListKey) => readonly string[];
  hobbies: readonly HobbyEntry[];
  skillGroups: readonly SkillGroup[];
}

const translations = {
  en: {
    greeting: "Hi, I'm Alien",
    heroSub: 'I write frontend — and build the framework under it. Pretty, and fast.',
    role: 'FRONTEND ENGINEER · CINEVIEW AUTHOR',
    avatarCaption: 'ALIEN MU',
    marquee: 'PERSONAL WORKS · ALIEN MU · FRONTEND ENGINEER · BUILT WITH CINEVIEW · ',
    scrollHint: 'Scroll',
    interestsTitle: 'HOBBIES & SKILLS',
    worksTitle: 'WORKS',
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
    heroSub: '写前端，也造框架——东西要好看，更要够快。',
    role: 'FRONTEND ENGINEER · CINEVIEW AUTHOR',
    avatarCaption: 'ALIEN MU',
    marquee: '个人作品 · ALIEN MU · 前端工程师 · 自研框架 CINEVIEW · ',
    scrollHint: '向下滚动',
    interestsTitle: '爱好与技能',
    worksTitle: '个人作品',
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

export interface HobbyEntry {
  word: string;
  note: string;
}

export interface SkillGroup {
  label: string;
  values: string;
}

const structured = {
  en: {
    hobbies: [
      { word: 'Music', note: 'headphones always on' },
      { word: 'Riding', note: 'motorcycles and wind' },
      { word: 'Travel', note: 'wandering around' },
    ] as HobbyEntry[],
    skillGroups: [
      { label: 'Frameworks', values: 'React · Vue · Nuxt' },
      { label: 'Languages', values: 'TypeScript · Node.js' },
      { label: 'Tooling', values: 'Vite · Pinia · Framer Motion' },
      { label: 'Focus', values: 'Performance · Architecture · Motion' },
    ] as SkillGroup[],
  },
  zh: {
    hobbies: [
      { word: '听歌', note: '耳机不离身' },
      { word: '骑摩托', note: '风里来去' },
      { word: '旅行', note: '到处溜达' },
    ] as HobbyEntry[],
    skillGroups: [
      { label: '框架', values: 'React · Vue · Nuxt' },
      { label: '语言', values: 'TypeScript · Node.js' },
      { label: '工程', values: 'Vite · Pinia · Framer Motion' },
      { label: '专长', values: '性能优化 · 前端架构 · 交互动效' },
    ] as SkillGroup[],
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
  const { hobbies, skillGroups } = structured[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tList, hobbies, skillGroups }}>
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
