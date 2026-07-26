import { Cue } from '@/components/Cue';
import { Slate } from '@/components/Slate';
import { SOLID } from '@/components/solid';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

const SKILL_TAGS = [
  'React',
  'Vue',
  'TypeScript',
  'Node.js',
  'Vite',
  'Nuxt',
  'Pinia',
  'Framer Motion',
  'Tailwind CSS',
  'Performance',
  'Architecture',
  'Prompt Engineering',
];

interface PrologueSceneProps {
  variant: LayoutVariant;
  reduced: boolean;
}

/** 序幕:关于我。center-lock 截流——竖排「序」立起,独白逐行揭示,技能墙收尾。 */
export function PrologueScene({ variant, reduced }: PrologueSceneProps) {
  const { language, t, tList } = useLanguage();
  const zh = language === 'zh';
  const lines = tList('bioLines');

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <Slate text={t('prologueSlate')} />
      <div className="prologue-layout">
        <Cue off={reduced} animateId="prologue-title" enterAnimation={SOLID} duration={{ enter: 600 }}>
          {({ enterProgress }) => (
            <h2
              className={zh ? 'display vertical-zh prologue-title' : 'display prologue-title-en'}
              style={{
                clipPath: zh
                  ? `inset(0 0 ${(1 - enterProgress) * 100}% 0)`
                  : `inset(0 ${(1 - enterProgress) * 100}% 0 0)`,
              }}
            >
              {t('prologueTitle')}
            </h2>
          )}
        </Cue>

        <div className="prologue-lines">
          {lines.map((line, i) => (
            <Cue
              key={line}
              off={reduced}
              animateId={`prologue-line-${i}`}
              enterAnimation="slide-up"
              duration={{ enter: 450 }}
              timeline={
                i === 0
                  ? { waitFor: 'prologue-title', delay: 100 }
                  : { waitFor: `prologue-line-${i - 1}`, delay: 80 }
              }
            >
              <p className="prologue-line">{line}</p>
            </Cue>
          ))}
        </div>

        <Cue
          off={reduced}
          animateId="prologue-skills"
          enterAnimation="slide-up"
          duration={{ enter: 500 }}
          timeline={{ waitFor: `prologue-line-${lines.length - 1}`, delay: 120 }}
        >
          <div className="prologue-skills">
            {SKILL_TAGS.map((tag) => (
              <span className="skill-tag mono" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </Cue>
      </div>
    </div>
  );
}
