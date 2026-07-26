import { Cue } from '@/components/Cue';
import { AvatarCard } from '@/components/AvatarCard';
import { GhostGlyph } from '@/components/GhostGlyph';
import { PageNo } from '@/components/PageNo';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

const CONTACTS = [
  { key: 'email', href: 'mailto:mu1hang@foxmail.com', label: 'mu1hang@foxmail.com' },
  { key: 'twitter', href: 'https://x.com/AlienMu777', label: '@AlienMu777' },
  { key: 'github', href: 'https://github.com/AlienMu', label: '@AlienMu' },
] as const;

interface ContactSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/** 终页:联系。头像 + 三个入口,落款一行。 */
export function ContactScene({ variant, reduced }: ContactSceneProps) {
  const { t } = useLanguage();

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <GhostGlyph char="见" style={{ left: '3%', top: '8%' }} />
      <PageNo index={5} total={5} />
      {/* 居中容器在 Cue 外:动画宿主只包内容块,让它远离视口顶边,
          否则滚到绝对底部时内容顶边落进 exitMargin 闸门被判退场而隐藏 */}
      <div className="contact-layout">
        <Cue
          off={reduced}
          animateId="contact-body"
          enterAnimation="fade-in"
          exitAnimation="none"
          duration={{ enter: 700 }}
        >
          <div className="contact-inner">
            <AvatarCard size={variant === 'mobile' ? 200 : 150} caption={false} />
            <h2 className="display contact-title">{t('contactTitle')}</h2>
            <div className="contact-rows">
              {CONTACTS.map((c) => (
                <div className="contact-row" key={c.key}>
                  <span className="contact-label display">{t(c.key)}</span>
                  <span className="contact-value mono">
                    <a href={c.href} target={c.key === 'email' ? undefined : '_blank'} rel="noreferrer">
                      {c.label}
                    </a>
                  </span>
                </div>
              ))}
            </div>
            <p className="contact-built mono">
              {t('builtWith')} ·{' '}
              <a href="https://github.com/AlienMu/cineView" target="_blank" rel="noreferrer">
                github.com/AlienMu/cineView
              </a>
            </p>
          </div>
        </Cue>
      </div>
    </div>
  );
}
