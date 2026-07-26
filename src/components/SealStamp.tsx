import { CSSProperties } from 'react';

interface SealStampProps {
  accent?: string | null;
  /** 盖印进度 0..1:2.2 倍悬空 → 落纸。缺省 1(已盖好,静态印章) */
  progress?: number;
  /** 印面边长(设计 px),经 --u 换算 */
  size?: number;
  className?: string;
}

/**
 * 印章:全站签名元素。静态时是落款,滚动区内由 enterProgress 驱动"盖印"。
 */
export function SealStamp({ accent, progress = 1, size = 84, className }: SealStampProps) {
  const p = Math.min(1, Math.max(0, progress));
  const style: CSSProperties = {
    width: `calc(var(--u) * ${size})`,
    height: `calc(var(--u) * ${size})`,
    background: accent ?? 'var(--seal)',
    color: 'var(--paper)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: `calc(var(--u) * ${size * 0.24})`,
    lineHeight: 1.15,
    letterSpacing: '0.06em',
    borderRadius: `calc(var(--u) * ${size * 0.08})`,
    boxShadow: `inset 0 0 0 calc(var(--u) * 2) var(--paper), inset 0 0 0 calc(var(--u) * 4) currentColor`,
    transform: `scale(${2.2 - 1.2 * p}) rotate(${-18 + 12 * p}deg)`,
    opacity: p === 0 ? 0 : 0.1 + 0.9 * p,
    userSelect: 'none',
  };
  return (
    <div className={className} style={style} aria-hidden="true">
      <span>ALIEN</span>
      <span>MU</span>
    </div>
  );
}
