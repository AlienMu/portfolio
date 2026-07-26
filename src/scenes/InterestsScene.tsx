import { Cue } from '@/components/Cue';
import { GhostGlyph } from '@/components/GhostGlyph';
import { PageNo } from '@/components/PageNo';
import { SOLID } from '@/components/solid';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

interface InterestsSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/**
 * 第二页:爱好与技能。
 * 爱好是三根竖排大字词柱，像海报上垂下的签条，逐根立起;
 * 技能是右侧的条目清单，横线逐行铺开、文字随后浮现。
 */
export function InterestsScene({ variant, reduced }: InterestsSceneProps) {
  const { language, t, hobbies, skillGroups } = useLanguage();
  const zh = language === 'zh';

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <GhostGlyph char="趣" style={{ left: '2%', bottom: '5%' }} />
      <PageNo index={2} total={5} />
      <div className="interests-flow">
        <div className="interests-left">
          <Cue off={reduced} animateId="interests-head" enterAnimation="slide-up" duration={{ enter: 380 }}>
            <h2 className="display interests-title">{t('interestsTitle')}</h2>
          </Cue>
          <div className="hobby-words" data-lang={language}>
            {hobbies.map((h, i) => (
              <Cue
                key={h.word}
                off={reduced}
                animateId={`hobby-${i}`}
                enterAnimation={SOLID}
                duration={{ enter: 420 }}
                timeline={
                  i === 0
                    ? { waitFor: 'interests-head', delay: 80 }
                    : { waitFor: `hobby-${i - 1}`, delay: 90 }
                }
              >
                {({ enterProgress }) => (
                  <div className="hobby-col">
                    <span
                      className={`display hobby-word${zh ? ' vertical-zh' : ''}`}
                      style={{
                        clipPath: zh
                          ? `inset(0 0 ${(1 - enterProgress) * 100}% 0)`
                          : `inset(0 ${(1 - enterProgress) * 100}% 0 0)`,
                        transform: `translateY(${(1 - enterProgress) * 14}px)`,
                      }}
                    >
                      {h.word}
                    </span>
                    <span className="hobby-note mono" style={{ opacity: enterProgress }}>
                      {h.note}
                    </span>
                  </div>
                )}
              </Cue>
            ))}
          </div>
        </div>

        <div className="skills-list">
          {skillGroups.map((g, i) => (
            <Cue
              key={g.label}
              off={reduced}
              animateId={`skill-${i}`}
              enterAnimation={SOLID}
              duration={{ enter: 380 }}
              timeline={
                i === 0
                  ? { waitFor: `hobby-${hobbies.length - 1}`, delay: 100 }
                  : { waitFor: `skill-${i - 1}`, delay: 70 }
              }
            >
              {({ enterProgress }) => (
                <div className="skill-row">
                  <span
                    className="skill-rule"
                    style={{ transform: `scaleX(${enterProgress})` }}
                    aria-hidden="true"
                  />
                  <div
                    className="skill-cells"
                    style={{
                      opacity: enterProgress,
                      transform: `translateY(${(1 - enterProgress) * 10}px)`,
                    }}
                  >
                    <span className="display skill-label">{g.label}</span>
                    <span className="skill-values mono">{g.values}</span>
                  </div>
                </div>
              )}
            </Cue>
          ))}
        </div>
      </div>
    </div>
  );
}
