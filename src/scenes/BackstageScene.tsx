import { Animate } from 'cineview';
import { Cue } from '@/components/Cue';
import { SOLID } from '@/components/solid';
import { Slate } from '@/components/Slate';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

/** 画格:预设名 + 持续播放该预设的小方块,现场演示框架能力 */
const DEMO_FRAMES = [
  { preset: 'pulse', label: 'pulse' },
  { preset: 'swing', label: 'swing' },
  { preset: 'bounce', label: 'bounce' },
] as const;

interface BackstageSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/** 幕后:CineView 特写。画格里的预设动画在真实播放——介绍即演示。 */
export function BackstageScene({ variant, reduced }: BackstageSceneProps) {
  const { language, t } = useLanguage();
  const zh = language === 'zh';

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <Slate text={t('backstageSlate')} />
      <div className="backstage-layout">
        <Cue off={reduced} animateId="backstage-title" enterAnimation={SOLID} duration={{ enter: 600 }}>
          {({ enterProgress }) => (
            <h2
              className={zh ? 'display vertical-zh backstage-title' : 'display backstage-title-en'}
              style={{
                clipPath: zh
                  ? `inset(0 0 ${(1 - enterProgress) * 100}% 0)`
                  : `inset(0 ${(1 - enterProgress) * 100}% 0 0)`,
              }}
            >
              {t('backstageTitle')}
            </h2>
          )}
        </Cue>

        <Cue
          off={reduced}
          animateId="backstage-lead"
          enterAnimation="slide-up"
          duration={{ enter: 500 }}
          timeline={{ waitFor: 'backstage-title', delay: 100 }}
        >
          <p className="backstage-lead">{t('backstageLead')}</p>
        </Cue>

        <div className="backstage-frames">
          {DEMO_FRAMES.map((f, i) => (
            <Cue
              key={f.preset}
              off={reduced}
              animateId={`backstage-frame-${i}`}
              enterAnimation="fade-in"
              duration={{ enter: 400 }}
              timeline={
                i === 0
                  ? { waitFor: 'backstage-lead', delay: 100 }
                  : { waitFor: `backstage-frame-${i - 1}`, delay: 80 }
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
          animateId="backstage-stats"
          enterAnimation="fade-in"
          duration={{ enter: 450 }}
          timeline={{ waitFor: `backstage-frame-${DEMO_FRAMES.length - 1}`, delay: 120 }}
        >
          <div className="backstage-foot">
            <p className="backstage-stats mono">{t('backstageStats')}</p>
            <a className="film-link" href="https://github.com/AlienMu/cineView" target="_blank" rel="noreferrer">
              {t('viewSource')}
            </a>
          </div>
        </Cue>
      </div>
    </div>
  );
}
