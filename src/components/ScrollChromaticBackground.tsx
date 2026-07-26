import { useEffect, useRef } from 'react';
import type { LayoutVariant } from '@/hooks/useDesignSize';

interface ScrollChromaticBackgroundProps {
  variant: LayoutVariant;
  reduced: boolean;
}

type Rgb = readonly [number, number, number];
type GradientPalette = readonly [Rgb, Rgb, Rgb, Rgb, Rgb];

/** 滚动经过的调色路径；每组都是同一张固定五色标渐变在该时刻的颜色。 */
const GRADIENT_PALETTES: readonly GradientPalette[] = [
  [[250, 248, 243], [244, 240, 231], [239, 235, 225], [246, 239, 232], [249, 246, 239]],
  [[250, 242, 235], [244, 226, 218], [235, 218, 211], [242, 232, 218], [248, 240, 230]],
  [[246, 239, 243], [233, 221, 232], [222, 216, 229], [237, 226, 225], [248, 240, 235]],
  [[241, 245, 248], [222, 233, 240], [215, 225, 235], [231, 232, 230], [246, 241, 233]],
  [[237, 246, 245], [216, 234, 234], [210, 226, 230], [228, 237, 229], [243, 242, 232]],
  [[242, 246, 237], [222, 235, 217], [214, 226, 211], [232, 232, 216], [247, 241, 231]],
  [[249, 245, 232], [240, 231, 207], [232, 220, 198], [241, 225, 211], [248, 239, 231]],
  [[248, 240, 239], [237, 222, 224], [226, 216, 222], [239, 228, 216], [249, 242, 233]],
  [[250, 248, 243], [244, 240, 231], [239, 235, 225], [246, 239, 232], [249, 246, 239]],
];

function interpolateRgb(from: Rgb, to: Rgb, progress: number): string {
  const channels = from.map((channel, index) =>
    Math.round(channel + (to[index] - channel) * progress)
  );
  return `rgb(${channels.join(' ')})`;
}

function interpolateGradient(progress: number): readonly [string, string, string, string, string] {
  const scaled = Math.min(1, Math.max(0, progress)) * (GRADIENT_PALETTES.length - 1);
  const index = Math.min(Math.floor(scaled), GRADIENT_PALETTES.length - 2);
  const localProgress = scaled - index;
  const from = GRADIENT_PALETTES[index];
  const to = GRADIENT_PALETTES[index + 1];

  return [
    interpolateRgb(from[0], to[0], localProgress),
    interpolateRgb(from[1], to[1], localProgress),
    interpolateRgb(from[2], to[2], localProgress),
    interpolateRgb(from[3], to[3], localProgress),
    interpolateRgb(from[4], to[4], localProgress),
  ];
}

/** 固定渐变纸色层：只插值色标，渐变方向与位置不随滚动移动。 */
export function ScrollChromaticBackground({ variant, reduced }: ScrollChromaticBackgroundProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || reduced) return;

    const scrollRoot = document.querySelector<HTMLElement>('[data-cineview-container="true"]');
    if (!scrollRoot) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const range = Math.max(scrollRoot.scrollHeight - scrollRoot.clientHeight, 1);
      const progress = Math.min(1, Math.max(0, scrollRoot.scrollTop / range));

      const [start, quarter, middle, threeQuarter, end] = interpolateGradient(progress);
      layer.style.setProperty('--chromatic-start', start);
      layer.style.setProperty('--chromatic-quarter', quarter);
      layer.style.setProperty('--chromatic-middle', middle);
      layer.style.setProperty('--chromatic-three-quarter', threeQuarter);
      layer.style.setProperty('--chromatic-end', end);
    };

    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    scrollRoot.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      scrollRoot.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [reduced, variant]);

  return <div ref={layerRef} className="scroll-chromatic-background" aria-hidden="true" />;
}
