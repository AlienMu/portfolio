import 'cineview';
import type { CvErrorDetail } from 'cineview';

type Lang = 'zh' | 'en';

const KEY = 'alien-lang';
const TITLES: Record<Lang, { title: string; desc: string }> = {
  zh: {
    title: 'Alien · 写前端，也造框架',
    desc: 'Alien，前端开发者，CineView 作者。写前端，也造框架；东西要好看，更要够快。',
  },
  en: {
    title: 'Alien · Frontend, and the framework under it',
    desc: 'Alien, frontend engineer and author of CineView. I write frontend and build the framework under it: it should look good, and be fast.',
  },
};

const current = (): Lang => (document.documentElement.lang === 'en' ? 'en' : 'zh');

/**
 * Both languages are in the markup (`<span lang>` pairs, hidden by html[lang] in CSS), so a
 * switch never rebuilds the stage. Only attributes that cannot hold two languages are swapped.
 */
function applyLanguage(lang: Lang): void {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.title = TITLES[lang].title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', TITLES[lang].desc);
  for (const el of document.querySelectorAll<HTMLImageElement>('img[data-alt-zh]')) {
    el.alt = (lang === 'zh' ? el.dataset.altZh : el.dataset.altEn) ?? el.alt;
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-label-zh]')) {
    el.setAttribute('aria-label', (lang === 'zh' ? el.dataset.labelZh : el.dataset.labelEn) ?? '');
  }
  for (const b of document.querySelectorAll<HTMLButtonElement>('[data-set-lang]')) {
    b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
  }
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // Private mode or blocked storage: the choice just isn't remembered.
  }
}

applyLanguage(current());
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-set-lang]')) {
  b.addEventListener('click', () => {
    const lang = b.dataset.setLang === 'en' ? 'en' : 'zh';
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', lang);
      history.replaceState(history.state, '', url);
    }
    applyLanguage(lang);
  });
}

// The bar turns solid once the opening has scrolled past its first screen.
const bar = document.querySelector<HTMLElement>('.bar');
let solidFrame = 0;
const updateBar = (): void => {
  solidFrame = 0;
  bar?.toggleAttribute('data-solid', window.scrollY > window.innerHeight * 0.6);
};
window.addEventListener(
  'scroll',
  () => {
    if (!solidFrame) solidFrame = requestAnimationFrame(updateBar);
  },
  { passive: true }
);
updateBar();

// Every authoring mistake surfaces as a cv-error with a stable code.
document.addEventListener('cv-error', (event) => {
  const { code, message, element } = (event as CustomEvent<CvErrorDetail>).detail;
  console.warn(`[cineview] ${code}: ${message}`, element);
});
