import { Cue } from '@/components/Cue';
import { SealStamp } from '@/components/SealStamp';
import { Slate } from '@/components/Slate';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

interface HeroSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/** 第零场:片名海报。竖排大字 + 落款印 + 上映条 + 底部致密 billing block。 */
export function HeroScene({ variant, reduced }: HeroSceneProps) {
  const { language, t } = useLanguage();

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <Slate text={t('heroSlate')} />
      <div className="hero-layout">
        <Cue off={reduced} animateId="hero-title" enterAnimation="fade-in" duration={{ enter: 700 }}>
          {language === 'zh' ? (
            <h1 className="display vertical-zh hero-title">{t('worksTitle')}</h1>
          ) : (
            <h1 className="display hero-title-en">{t('worksTitle')}</h1>
          )}
        </Cue>
        <Cue
          off={reduced}
          animateId="hero-seal"
          enterAnimation="fade-in"
          duration={{ enter: 500 }}
          timeline={{ waitFor: 'hero-title', delay: 150 }}
        >
          <div className="hero-seal-block">
            <SealStamp size={variant === 'mobile' ? 104 : 72} />
            <p className="hero-byline mono">{t('byline')}</p>
            <p className="hero-now mono">{t('nowShowing')}</p>
          </div>
        </Cue>
        <Cue
          off={reduced}
          animateId="hero-intro"
          enterAnimation="slide-up"
          duration={{ enter: 600 }}
          timeline={{ waitFor: 'hero-seal', delay: 100 }}
        >
          <p className="hero-intro">{t('tagline')}</p>
        </Cue>
        <Cue
          off={reduced}
          animateId="hero-billing"
          enterAnimation="fade-in"
          duration={{ enter: 600 }}
          timeline={{ waitFor: 'hero-intro', delay: 80 }}
        >
          <p className="hero-billing mono">{t('billing')}</p>
        </Cue>
      </div>
      <div className="hero-hint">{t('scrollHint')} ↓</div>
    </div>
  );
}
