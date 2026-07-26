import { useEffect, useState } from 'react';

export type LayoutVariant = 'desktop' | 'mobile';

export interface DesignSize {
  size: number;
  variant: LayoutVariant;
}

const QUERY = '(min-width: 768px)';

function read(): DesignSize {
  return window.matchMedia(QUERY).matches
    ? { size: 1440, variant: 'desktop' }
    : { size: 750, variant: 'mobile' };
}

/**
 * CineView 是单标尺布局(scale = viewportWidth / size),桌面与移动共用一把尺
 * 会让其中一端比例失衡。跨断点时切换设计稿基准(1440 / 750),配合 App 里
 * key={variant} 重挂载整个 CineView 实例换尺。
 */
export function useDesignSize(): DesignSize {
  const [designSize, setDesignSize] = useState<DesignSize>(read);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setDesignSize(read());
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return designSize;
}
