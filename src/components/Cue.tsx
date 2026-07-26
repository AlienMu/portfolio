import { ReactNode } from 'react';
import { Animate } from 'cineview';
import type { AnimateProps, AnimateRenderState } from 'cineview';

const SETTLED: AnimateRenderState = { enterProgress: 1, phase: 'entered' };

type CueProps = AnimateProps & {
  /** reduced-motion 开关:true 时跳过 Animate,内容直达终态 */
  off: boolean;
};

/**
 * Animate 的站内统一包装:
 * - off(reduced-motion)时不挂动画,render-prop 拿到已完成态
 * - 默认开启 replayOnReenter；提供 exitAnimation 的元素离场后再次进入会重播
 *   (zone 接管的元素不受此项影响,反向滚动天然反向擦洗)
 */
export function Cue({ off, visibility, ...animateProps }: CueProps) {
  if (off) {
    const { children } = animateProps;
    if (typeof children === 'function') {
      return <>{children(SETTLED)}</>;
    }
    return <>{children as ReactNode}</>;
  }
  return (
    <Animate
      visibility={{ replayOnReenter: true, ...visibility }}
      {...(animateProps as AnimateProps)}
    />
  );
}
