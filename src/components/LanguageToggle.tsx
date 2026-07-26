import { useLanguage } from '@/i18n/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const next = language === 'zh' ? 'English' : '中文';
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLanguage}
      aria-label={`Switch language to ${next}`}
    >
      {language === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
