import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** CineView 不处理 reduced-motion,消费端自己降级:动画一律直达终态。 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
