import { Cue } from '@/components/Cue';
import { MetaRow } from '@/components/MetaRow';
import { SealStamp } from '@/components/SealStamp';
import { SOLID } from '@/components/solid';
import { Project } from '@/data/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

const ZH_NUMERALS = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function actLabel(index: number, zh: boolean): string {
  if (zh) return `第${ZH_NUMERALS[index] ?? index + 1}幕`;
  return `ACT ${ROMAN[index] ?? index + 1}`;
}

interface ProjectSceneProps {
  project: Project;
  index: number;
  variant: LayoutVariant;
  reduced: boolean;
}

/**
 * 一个项目 = 一张海报一幕。center-lock 滚动区内分段揭示:
 * 片名立起 → 描述浮现 → 元数据 + 印章盖印(签名动效)。
 */
export function ProjectScene({ project, index, variant, reduced }: ProjectSceneProps) {
  const { language, t } = useLanguage();
  const zh = language === 'zh';
  const zhTitle = project.title.zh;
  const enTitle = project.title.en ?? project.name;
  const description = (zh ? project.description.zh : project.description.en) ?? project.description.en;

  const seal = (
    <Cue
      off={reduced}
      animateId={`${project.name}-seal`}
      enterAnimation={SOLID}
      duration={{ enter: 800 }}
      timeline={{ phase: { start: 0.55, end: 0.85 } }}
    >
      {({ enterProgress }) => (
        <SealStamp
          className="project-seal"
          accent={project.accent}
          progress={enterProgress}
          size={variant === 'mobile' ? 120 : 84}
        />
      )}
    </Cue>
  );

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <div className="project-layout">
        <div className="project-act">
          <p className="act-label">{actLabel(index, zh)}</p>
          <p className="project-name-latin">{project.name}</p>
        </div>

        {zh && zhTitle ? (
          <div className="project-title-block">
            <Cue
              off={reduced}
              animateId={`${project.name}-title`}
              enterAnimation={SOLID}
              duration={{ enter: 800 }}
              timeline={{ phase: { start: 0, end: 0.35 } }}
            >
              {({ enterProgress }) => (
                <h2
                  className="display vertical-zh project-title-zh"
                  style={{ clipPath: `inset(0 0 ${(1 - enterProgress) * 100}% 0)` }}
                >
                  {zhTitle}
                </h2>
              )}
            </Cue>
          </div>
        ) : (
          <div className="project-title-block-en">
            <Cue
              off={reduced}
              animateId={`${project.name}-title`}
              enterAnimation={SOLID}
              duration={{ enter: 800 }}
              timeline={{ phase: { start: 0, end: 0.35 } }}
            >
              {({ enterProgress }) => (
                <h2
                  className="display project-title-en"
                  style={{ clipPath: `inset(0 ${(1 - enterProgress) * 100}% 0 0)` }}
                >
                  {enTitle}
                </h2>
              )}
            </Cue>
          </div>
        )}
        {seal}

        {description && (
          <Cue
            off={reduced}
            animateId={`${project.name}-desc`}
            enterAnimation="slide-up"
            timeline={{ phase: { start: 0.25, end: 0.6 } }}
          >
            <p className="project-desc">{description}</p>
          </Cue>
        )}

        <Cue
          off={reduced}
          animateId={`${project.name}-meta`}
          enterAnimation="fade-in"
          timeline={{ phase: { start: 0.45, end: 0.75 } }}
        >
          <div className="project-meta">
            <MetaRow project={project} />
          </div>
        </Cue>

        <Cue
          off={reduced}
          animateId={`${project.name}-links`}
          enterAnimation="fade-in"
          timeline={{ phase: { start: 0.6, end: 0.9 } }}
        >
          <div className="project-links">
            <a className="film-link" href={project.htmlUrl} target="_blank" rel="noreferrer">
              {t('viewSource')}
            </a>
            {(project.links.demo ?? project.homepage) && (
              <a
                className="film-link"
                href={project.links.demo ?? project.homepage ?? undefined}
                target="_blank"
                rel="noreferrer"
              >
                {t('liveDemo')}
              </a>
            )}
            {project.links.docs && (
              <a className="film-link" href={project.links.docs} target="_blank" rel="noreferrer">
                {t('docs')}
              </a>
            )}
          </div>
        </Cue>

        {project.screenshot && (
          <Cue
            off={reduced}
            animateId={`${project.name}-shot`}
            enterAnimation="fade-in"
            timeline={{ phase: { start: 0.3, end: 0.65 } }}
          >
            <figure className="project-shot">
              <img src={`${import.meta.env.BASE_URL}${project.screenshot}`} alt={enTitle} loading="lazy" />
            </figure>
          </Cue>
        )}
      </div>
    </div>
  );
}
