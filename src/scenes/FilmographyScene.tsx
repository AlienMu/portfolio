import { useEffect, useState } from 'react';
import { Cue } from '@/components/Cue';
import { GhostGlyph } from '@/components/GhostGlyph';
import { MetaRow } from '@/components/MetaRow';
import { PageNo } from '@/components/PageNo';
import { SOLID } from '@/components/solid';
import { Project } from '@/data/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { LayoutVariant } from '@/hooks/useDesignSize';

interface FilmographySceneProps {
  projects: Project[];
  variant: LayoutVariant;
  reduced: boolean;
}

/** render-prop 内不能 setState,用子组件的 effect 把展开进度同步给父级 */
function RevealSync({
  index,
  progress,
  isLast,
  onActive,
  onRetreat,
  onDone,
}: {
  index: number;
  progress: number;
  isLast: boolean;
  onActive: (i: number) => void;
  onRetreat: (i: number) => void;
  onDone: (done: boolean) => void;
}) {
  const entered = progress > 0.15;
  const done = progress >= 0.99;
  useEffect(() => {
    if (entered) onActive(index);
    else onRetreat(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);
  useEffect(() => {
    if (isLast) onDone(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, isLast]);
  return null;
}

/**
 * 个人作品:center-lock 截流滚动,列表逐行展开;
 * 展开期间右侧详情跟随当前登场的行联动(hover 关闭),
 * 全部展开后交还给 hover:移入高亮 + 详情切换,点击进入仓库。
 */
export function FilmographyScene({ projects, variant, reduced }: FilmographySceneProps) {
  const { language, t } = useLanguage();
  const zh = language === 'zh';
  const [hovered, setHovered] = useState<number | null>(null);
  const [autoIdx, setAutoIdx] = useState<number | null>(reduced ? projects.length - 1 : null);
  const [revealDone, setRevealDone] = useState(reduced);

  // 联动规则:展开中面板跟随 autoIdx;展开完毕后 hover 优先,无 hover 停在最后联动到的行
  const activeIdx = revealDone ? (hovered ?? autoIdx) : autoIdx;
  const active = activeIdx === null ? null : projects[activeIdx];

  const rowTitle = (p: Project) => (zh ? (p.title.zh ?? p.name) : (p.title.en ?? p.name));
  const rowDesc = (p: Project) => (zh ? p.description.zh : p.description.en) ?? p.description.en;

  return (
    <div className="poster" data-variant={variant}>
      <div className="poster-frame" />
      <GhostGlyph char="作" style={{ left: '2%', bottom: '4%' }} />
      <PageNo index={3} total={5} />
      <div className="filmo-layout">
        <Cue off={reduced} animateId="filmo-head" enterAnimation="slide-up" duration={{ enter: 380 }}>
          <header className="filmo-head">
            <h2 className="display filmo-title-main">{t('worksTitle')}</h2>
            <p className="filmo-sub mono">{t('worksSub')}</p>
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
                duration={{ enter: 340 }}
                timeline={i === 0 ? { waitFor: 'filmo-head', delay: 80 } : { waitFor: `filmo-row-${i - 1}`, delay: 60 }}
              >
                {({ enterProgress }) => (
                  <li
                    className="filmo-item"
                    style={{
                      clipPath: `inset(0 ${(1 - enterProgress) * 100}% 0 0)`,
                      transform: `translateY(${(1 - enterProgress) * 20}px)`,
                      opacity: 0.2 + 0.8 * enterProgress,
                    }}
                  >
                    {!reduced && (
                      <RevealSync
                        index={i}
                        progress={enterProgress}
                        isLast={i === projects.length - 1}
                        onActive={(idx) => setAutoIdx((cur) => (cur === null || idx > cur ? idx : cur))}
                        onRetreat={(idx) =>
                          setAutoIdx((cur) => (cur === idx ? (idx > 0 ? idx - 1 : null) : cur))
                        }
                        onDone={setRevealDone}
                      />
                    )}
                    {/* 扫光条:随展开进度掠过整行,落定后隐去 */}
                    <span
                      className="filmo-sweep"
                      style={{
                        transform: `scaleX(${enterProgress})`,
                        opacity: Math.sin(Math.min(1, enterProgress) * Math.PI),
                        background: p.accent ?? 'var(--seal)',
                      }}
                      aria-hidden="true"
                    />
                    <a
                      className="filmo-row"
                      data-active={activeIdx === i}
                      href={p.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ ['--row-accent' as string]: p.accent ?? 'var(--seal)' }}
                      onMouseEnter={() => revealDone && setHovered(i)}
                      onFocus={() => revealDone && setHovered(i)}
                    >
                      <span className="filmo-no mono">{String(i + 1).padStart(2, '0')}</span>
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
            <aside className="filmo-panel">
              {active ? (
                <div
                  className="filmo-card"
                  key={active.name}
                  style={{ ['--row-accent' as string]: active.accent ?? 'var(--seal)' }}
                >
                  <div className="filmo-card-head">
                    <h3 className="display filmo-card-title">{rowTitle(active)}</h3>
                    <p className="filmo-card-latin mono">{active.name}</p>
                  </div>
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
                  <p className="filmo-idle-text">{t('worksIdle')}</p>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
