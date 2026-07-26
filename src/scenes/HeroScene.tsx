import { Cue } from '@/components/Cue';
import { AvatarCard } from '@/components/AvatarCard';
import { GhostGlyph } from '@/components/GhostGlyph';
import { PageNo } from '@/components/PageNo';
import { SOLID } from '@/components/solid';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

/** 入口按钮。Telegram 用户名如有出入请改这里。 */
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/AlienMu' },
  { label: 'X', href: 'https://x.com/AlienMu777' },
  { label: 'Telegram', href: 'https://t.me/AlienMu777' },
  { label: 'Email', href: 'mailto:mu1hang@foxmail.com' },
] as const;

/** 问候语切分:汉字/标点逐字，latin 单词整块 */
function tokenize(text: string): string[] {
  return text.match(/[一-鿿，。、!?！?]|[^一-鿿，。、!?！?]+/g) ?? [text];
}

interface HeroSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/** 第一页:只有我——逐字问候、头像相框、入口按钮。 */
export function HeroScene({ variant, reduced }: HeroSceneProps) {
  const { t } = useLanguage();
  const tokens = tokenize(t('greeting'));

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <GhostGlyph char="我" style={{ right: '4%', bottom: '8%' }} />
      <PageNo index={1} total={5} />
      <div className="hero-grid">
        <div className="hero-main">
          {/* 单个 Animate 包整行(块级宿主不能逐字塞进 h1),
              用同一 enterProgress 分摊每个字的局部进度做级联揭示 */}
          <Cue off={reduced} animateId="hero-greeting" enterAnimation={SOLID} duration={{ enter: 900 }}>
            {({ enterProgress }) => (
              <h1 className="display hero-greeting" aria-label={t('greeting')}>
                {tokens.map((tok, i) => {
                  const step = 0.55 / Math.max(1, tokens.length - 1);
                  const p = Math.min(1, Math.max(0, (enterProgress - i * step) / 0.45));
                  return (
                    <span
                      key={`${tok}-${i}`}
                      className="hero-char"
                      style={{
                        clipPath: `inset(0 0 ${(1 - p) * 100}% 0)`,
                        transform: `translateY(${(1 - p) * 18}px)`,
                      }}
                    >
                      {tok}
                    </span>
                  );
                })}
              </h1>
            )}
          </Cue>
          <Cue
            off={reduced}
            animateId="hero-sub"
            enterAnimation="slide-up"
            duration={{ enter: 420 }}
            timeline={{ waitFor: 'hero-greeting', delay: 50 }}
          >
            <p className="hero-sub">{t('heroSub')}</p>
          </Cue>
          <Cue
            off={reduced}
            animateId="hero-role"
            enterAnimation="fade-in"
            duration={{ enter: 400 }}
            timeline={{ waitFor: 'hero-sub', delay: 50 }}
          >
            <p className="hero-role mono">{t('role')}</p>
          </Cue>
          <Cue
            off={reduced}
            animateId="hero-socials"
            enterAnimation="slide-up"
            duration={{ enter: 420 }}
            timeline={{ waitFor: 'hero-role', delay: 60 }}
          >
            <div className="hero-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className="film-link"
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Cue>
        </div>
        <Cue
          off={reduced}
          animateId="hero-avatar"
          enterAnimation={{
            initial: { opacity: 0, y: 26, rotate: -7 },
            animate: { opacity: 1, y: 0, rotate: -2 },
          }}
          duration={{ enter: 550 }}
          timeline={{ waitFor: 'hero-greeting', delay: 100 }}
        >
          <div className="hero-side">
            <AvatarCard size={variant === 'mobile' ? 380 : 340} />
          </div>
        </Cue>
      </div>
      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track mono">
          <span>{t('marquee').repeat(4)}</span>
          <span>{t('marquee').repeat(4)}</span>
        </div>
      </div>
      <div className="hero-hint mono">{t('scrollHint')} ↓</div>
    </div>
  );
}
