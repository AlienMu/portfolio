import { Cue } from '@/components/Cue';
import { SealStamp } from '@/components/SealStamp';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

const CONTACTS = [
  { key: 'email', href: 'mailto:mu1hang@foxmail.com', label: 'mu1hang@foxmail.com' },
  { key: 'twitter', href: 'https://x.com/AlienMu777', label: '@AlienMu777' },
  { key: 'github', href: 'https://github.com/AlienMu', label: '@AlienMu' },
] as const;

interface CreditsSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/** 终幕:落款/字幕表。联系方式 + 总印章 + 剧终。 */
export function CreditsScene({ variant, reduced }: CreditsSceneProps) {
  const { language, t } = useLanguage();

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      {/* 居中容器在 Cue 外:动画宿主只包内容块,让它远离视口顶边,
          否则滚到绝对底部时内容顶边落进 exitMargin 闸门被判退场而隐藏 */}
      <div className="credits-layout">
        <Cue
          off={reduced}
          animateId="credits-body"
          enterAnimation="fade-in"
          exitAnimation="none"
          duration={{ enter: 900 }}
        >
          <div className="credits-inner">
            <h2 className="credits-title">{t('creditsTitle')}</h2>
            <div className="credits-rows">
              {CONTACTS.map((c) => (
                <div className="credits-row" key={c.key}>
                  <span className="credits-label">{t(c.key)}</span>
                  <span className="credits-value">
                    <a href={c.href} target={c.key === 'email' ? undefined : '_blank'} rel="noreferrer">
                      {c.label}
                    </a>
                  </span>
                </div>
              ))}
            </div>
            <SealStamp size={variant === 'mobile' ? 130 : 96} />
            <p className="credits-built">
              {t('builtWith')} ·{' '}
              <a href="https://github.com/AlienMu/cineView" target="_blank" rel="noreferrer">
                github.com/AlienMu/cineView
              </a>
            </p>
            <p className="credits-fin">{language === 'zh' ? '剧终' : 'FIN'}</p>
          </div>
        </Cue>
      </div>
    </div>
  );
}
