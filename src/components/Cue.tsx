import { ReactNode } from 'react';
import { Animate } from 'cineview';
import type { AnimateProps, AnimateRenderState } from 'cineview';

const SETTLED: AnimateRenderState = { enterProgress: 1, phase: 'entered' };

type CueProps = AnimateProps & {
  /** reduced-motion 开关:true 时跳过 Animate,内容直达终态 */
  off: boolean;
};

/**
 * Animate 的 reduced-motion 包装:off 时不挂动画,render-prop 拿到已完成态。
 */
export function Cue({ off, ...animateProps }: CueProps) {
  if (off) {
    const { children } = animateProps;
    if (typeof children === 'function') {
      return <>{children(SETTLED)}</>;
    }
    return <>{children as ReactNode}</>;
  }
  return <Animate {...(animateProps as AnimateProps)} />;
}
