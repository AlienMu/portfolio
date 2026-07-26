import { useState } from 'react';
import { Cue } from '@/components/Cue';
import { MetaRow } from '@/components/MetaRow';
import { SealStamp } from '@/components/SealStamp';
import { Slate } from '@/components/Slate';
import { SOLID } from '@/components/solid';
import { Project } from '@/data/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

const ZH_NUMERALS = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

interface FilmographySceneProps {
  projects: Project[];
  variant: LayoutVariant;
  reduced: boolean;
}

/**
 * 排片表:作品集主幕。center-lock 截流滚动,片单逐行升起;
 * 演完释放后,悬停片名高亮并在右侧亮出场刊(描述/元数据/链接),点击进场。
 */
export function FilmographyScene({ projects, variant, reduced }: FilmographySceneProps) {
  const { language, t } = useLanguage();
  const zh = language === 'zh';
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered === null ? null : projects[hovered];

  const rowTitle = (p: Project) => (zh ? (p.title.zh ?? p.name) : (p.title.en ?? p.name));
  const rowDesc = (p: Project) => (zh ? p.description.zh : p.description.en) ?? p.description.en;

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <Slate text={t('filmoSlate')} />
      <div className="filmo-layout">
        <Cue off={reduced} animateId="filmo-head" enterAnimation="slide-up" duration={{ enter: 500 }}>
          <header className="filmo-head">
            <h2 className="display filmo-title-main">{t('filmoTitle')}</h2>
            <p className="filmo-sub mono">{t('filmoSub')}</p>
          </header>
        </Cue>

        <div className="filmo-body">
          <ul className="filmo-list" onMouseLeave={() => setHovered(null)}>
            {projects.map((p, i) => (
              <Cue
                key={p.name}
                off={reduced}
                animateId={`filmo-row-${i}`}
                enterAnimation={SOLID}
                duration={{ enter: 480 }}
                timeline={i === 0 ? { waitFor: 'filmo-head', delay: 120 } : { waitFor: `filmo-row-${i - 1}`, delay: 80 }}
              >
                {({ enterProgress }) => (
                  <li
                    className="filmo-item"
                    style={{
                      clipPath: `inset(0 ${(1 - enterProgress) * 100}% 0 0)`,
                      transform: `translateY(${(1 - enterProgress) * 22}px)`,
                      opacity: 0.2 + 0.8 * enterProgress,
                    }}
                  >
                    <a
                      className="filmo-row"
                      href={p.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ ['--row-accent' as string]: p.accent ?? 'var(--seal)' }}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                    >
                      <span className="filmo-no mono">{zh ? `第${ZH_NUMERALS[i] ?? i + 1}幕` : `ACT ${ROMAN[i] ?? i + 1}`}</span>
                      <span className="filmo-names">
                        <span className="display filmo-name">{rowTitle(p)}</span>
                        <span className="filmo-latin mono">{p.name}</span>
                      </span>
                      <span className="filmo-year mono">
                        {p.language ?? '—'} · {new Date(p.pushedAt).getFullYear()}
                      </span>
                      <span className="filmo-arrow mono" aria-hidden="true">
                        →
                      </span>
                    </a>
                    {variant === 'mobile' && rowDesc(p) && (
                      <p className="filmo-mobile-desc">{rowDesc(p)}</p>
                    )}
                  </li>
                )}
              </Cue>
            ))}
          </ul>

          {variant === 'desktop' && (
            <aside
              className="filmo-panel"
              onMouseEnter={() => hovered !== null && setHovered(hovered)}
            >
              {active ? (
                <div className="filmo-card" key={active.name}>
                  <SealStamp accent={active.accent} size={110} />
                  <h3 className="display filmo-card-title">{rowTitle(active)}</h3>
                  {rowDesc(active) && <p className="filmo-card-desc">{rowDesc(active)}</p>}
                  <MetaRow project={active} />
                  <div className="filmo-card-links">
                    <a className="film-link" href={active.htmlUrl} target="_blank" rel="noreferrer">
                      {t('viewSource')}
                    </a>
                    {(active.links.demo ?? active.homepage) && (
                      <a
                        className="film-link"
                        href={active.links.demo ?? active.homepage ?? undefined}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t('liveDemo')}
                      </a>
                    )}
                    {active.links.docs && (
                      <a className="film-link" href={active.links.docs} target="_blank" rel="noreferrer">
                        {t('docs')}
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="filmo-card filmo-card-idle">
                  <SealStamp accent="#C9C4B8" size={110} />
                  <p className="filmo-idle-text">{t('filmoIdle')}</p>
                </div>
              )}
            </aside>
          )}
        </div>

        <Cue
          off={reduced}
          animateId="filmo-hint"
          enterAnimation="fade-in"
          duration={{ enter: 400 }}
          timeline={{ waitFor: `filmo-row-${projects.length - 1}`, delay: 150 }}
        >
          <p className="filmo-hint mono">{t('filmoHint')}</p>
        </Cue>
      </div>
    </div>
  );
}
