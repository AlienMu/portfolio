import { Fragment } from 'react';
import { Project } from '@/data/types';
import { useLanguage } from '@/i18n/LanguageContext';

/** 海报下沿的"场次信息"条:语言 · star · 标签 · 更新时间,全部优雅降级 */
export function MetaRow({ project }: { project: Project }) {
  const { language, t } = useLanguage();

  const updated = new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: language === 'zh' ? 'long' : 'short',
  }).format(new Date(project.pushedAt));

  const items: string[] = [];
  if (project.language) items.push(project.language);
  if (project.stars > 0) items.push(`★ ${project.stars}`);
  items.push(...project.topics.slice(0, 4));
  items.push(`${t('updatedPrefix')} ${updated}`);

  return (
    <div className="meta-row">
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          {i > 0 && <span className="divider">/</span>}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
