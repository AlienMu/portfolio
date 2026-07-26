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
    worksTitle: 'WORKS',
    byline: 'A COLLECTION BY ALIEN MU',
    tagline: 'Elegant, efficient interfaces — built like scenes, screened by scroll.',
    nowShowing: 'NOW SHOWING · 2026',
    billing:
      'ALIEN MU PRESENTS · A CINEVIEW PICTURE · SHOT IN REACT AND TYPESCRIPT · SET DESIGN VITE · TYPOGRAPHY NOTO SERIF SC · SEAL VERMILION #BE3B2A · PROJECTED BY CINEVIEW SCROLL ENGINE · GITHUB.COM/ALIENMU',
    scrollHint: 'Scroll to begin the screening',
    prologueTitle: 'PROLOGUE',
    prologueSlate: 'SC.01 · PROLOGUE',
    heroSlate: 'SC.00 · TITLE',
    filmoTitle: 'FILMOGRAPHY',
    filmoSub: 'Scroll to raise the bill — every repo takes the stage',
    filmoSlate: 'SC.02 · FILMOGRAPHY',
    filmoHint: 'Hover a title to preview · click to enter',
    filmoIdle: 'Point at a title on the bill —\nits card shows here.',
    backstageTitle: 'BACKSTAGE',
    backstageSlate: 'SC.03 · BACKSTAGE',
    backstageLead:
      'This site runs on CineView — the star of the bill. Scroll is the camera: scenes lock, timelines scrub, then the reel rolls on.',
    backstageStats: '45 animation presets · 1222 tests · 48.6 KB gzip',
    creditsTitle: 'CREDITS',
    creditsSlate: 'SC.04 · CREDITS',
    email: 'Email',
    twitter: 'Twitter',
    github: 'GitHub',
    builtWith: 'Screened with CineView — a self-built framework',
    updatedPrefix: 'updated',
    viewSource: 'View source',
    liveDemo: 'Live demo',
    docs: 'Docs',
    finale: 'FIN',
  },
  zh: {
    worksTitle: '作品集',
    byline: 'ALIEN MU · 出品',
    tagline: '优雅高效的界面与交互——按幕搭建，以滚动放映。',
    nowShowing: '正在上映 · 2026',
    billing:
      'ALIEN MU 出品 · CINEVIEW 放映 · REACT / TYPESCRIPT 摄制 · 美术置景 VITE · 字体 思源宋体 · 印泥朱 #BE3B2A · 滚动引擎 CINEVIEW SCROLL · GITHUB.COM/ALIENMU',
    scrollHint: '向下滚动 开始放映',
    prologueTitle: '序',
    prologueSlate: '第壹场 · 序',
    heroSlate: '第零场 · 片名',
    filmoTitle: '排片表',
    filmoSub: '滚动升起片单——每个仓库逐幕登场',
    filmoSlate: '第贰场 · 排片',
    filmoHint: '移入片名可预览 · 点击进场',
    filmoIdle: '把指针移到片单上——\n这里会亮出它的场刊。',
    backstageTitle: '幕后',
    backstageSlate: '第叁场 · 幕后',
    backstageLead:
      '本站正跑在片单头牌 CineView 上——滚动即运镜：场景锁定、时间轴随滚动擦洗，放完自动放行。',
    backstageStats: '45 组动画预设 · 1222 项测试 · 48.6 KB gzip',
    creditsTitle: '落款',
    creditsSlate: '第肆场 · 落款',
    email: '邮箱',
    twitter: '推特',
    github: 'GitHub',
    builtWith: '本站由自研框架 CineView 放映',
    updatedPrefix: '更新于',
    viewSource: '查看源码',
    liveDemo: '在线演示',
    docs: '文档',
    finale: '剧终',
  },
} as const;

const lists = {
  en: {
    bioLines: [
      'I write frontend for a living — and for fun.',
      'Smooth, good-looking pages, with performance that holds up.',
      'Off screen: music, motorcycles, wandering. Code with passion, live free.',
    ],
    creditsRoles: [
      'Directed by — Alien',
      'Written by — Alien',
      'Starring — Alien',
      'Projected by — CineView',
    ],
  },
  zh: {
    bioLines: [
      '喜欢敲前端代码，玩转各种现代 Web 技术。',
      '专注把页面做得流畅好看、性能在线。',
      '日常听歌、骑摩托、到处旅行——写代码有热爱，过日子有自由。',
    ],
    creditsRoles: ['导演 — Alien', '编剧 — Alien', '主演 — Alien', '放映 — CineView'],
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
