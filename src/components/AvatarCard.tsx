import { useLanguage } from '@/i18n/LanguageContext';

interface AvatarCardProps {
  /** 相框宽度(设计 px) */
  size?: number;
  caption?: boolean;
}

/** 头像相框:纸白衬边 + 细线框 + 朱红角标,微微倾斜像钉在海报上的照片。 */
export function AvatarCard({ size = 300, caption = true }: AvatarCardProps) {
  const { t } = useLanguage();
  return (
    <figure className="avatar-card" style={{ width: `calc(var(--u) * ${size})` }}>
      <span className="avatar-corner" aria-hidden="true" />
      <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt="Alien 的头像" />
      {caption && <figcaption className="avatar-caption mono">{t('avatarCaption')}</figcaption>}
    </figure>
  );
}
