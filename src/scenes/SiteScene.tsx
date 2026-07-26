import { Animate } from 'cineview';
import { Cue } from '@/components/Cue';
import { GhostGlyph } from '@/components/GhostGlyph';
import { PageNo } from '@/components/PageNo';
import { SOLID } from '@/components/solid';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

/** 画格:预设名 + 持续播放该预设的小方块,现场演示框架能力 */
const DEMO_FRAMES = [
  { preset: 'pulse', label: 'pulse' },
  { preset: 'swing', label: 'swing' },
  { preset: 'bounce', label: 'bounce' },
] as const;

interface SiteSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/** 第三页:本站。这个网站也是作品——自研框架 CineView 的现场演示。 */
export function SiteScene({ variant, reduced }: SiteSceneProps) {
  const { language, t } = useLanguage();
  const zh = language === 'zh';

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <GhostGlyph char="造" style={{ right: '3%', top: '6%' }} />
      <PageNo index={3} />
      <div className="site-flow">
        <Cue off={reduced} animateId="site-title" enterAnimation={SOLID} duration={{ enter: 450 }}>
          {({ enterProgress }) => (
            <h2
              className={zh ? 'display vertical-zh site-title' : 'display site-title-en'}
              style={{
                clipPath: zh
                  ? `inset(0 0 ${(1 - enterProgress) * 100}% 0)`
                  : `inset(0 ${(1 - enterProgress) * 100}% 0 0)`,
              }}
            >
              {t('siteTitle')}
            </h2>
          )}
        </Cue>

        <div className="site-main">
          <Cue
            off={reduced}
            animateId="site-lead"
            enterAnimation="slide-up"
            duration={{ enter: 400 }}
            timeline={{ waitFor: 'site-title', delay: 60 }}
          >
            <p className="site-lead">{t('siteLead')}</p>
          </Cue>

          <div className="site-frames">
            {DEMO_FRAMES.map((f, i) => (
              <Cue
                key={f.preset}
                off={reduced}
                animateId={`site-frame-${i}`}
                enterAnimation="fade-in"
                duration={{ enter: 300 }}
                timeline={
                  i === 0
                    ? { waitFor: 'site-lead', delay: 60 }
                    : { waitFor: `site-frame-${i - 1}`, delay: 50 }
                }
              >
                <figure className="demo-frame">
                  <div className="demo-stage">
                    {reduced ? (
                      <div className="demo-chip" />
                    ) : (
                      <Animate
                        animateId={`demo-loop-${i}`}
                        enterAnimation={SOLID}
                        duration={{ enter: 1 }}
                        infiniteAnimation={f.preset}
                        timeline={{ sceneControlled: false }}
                      >
                        <div className="demo-chip" />
                      </Animate>
                    )}
                  </div>
                  <figcaption className="demo-caption mono">{f.label}</figcaption>
                </figure>
              </Cue>
            ))}
          </div>

          <Cue
            off={reduced}
            animateId="site-stats"
            enterAnimation="fade-in"
            duration={{ enter: 350 }}
            timeline={{ waitFor: `site-frame-${DEMO_FRAMES.length - 1}`, delay: 60 }}
          >
            <div className="site-foot">
              <p className="site-stats mono">{t('siteStats')}</p>
              <a className="film-link" href="https://github.com/AlienMu/cineView" target="_blank" rel="noreferrer">
                {t('viewSource')}
              </a>
            </div>
          </Cue>
        </div>
      </div>
    </div>
  );
}
