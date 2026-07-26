import type { CustomAnimation } from 'cineview';

/**
 * 恒定不透明的自定义变体:host 自身不做任何视觉变化,
 * 只借它的时间轴长度拿 enterProgress 做 render-prop 擦洗驱动。
 * (与官网 site/CapabilityScene 的 solidVariant 同思路)
 */
export const SOLID: CustomAnimation = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { duration: 0 } },
};
