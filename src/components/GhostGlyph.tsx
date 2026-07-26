import { CSSProperties } from 'react';

/** 底纹大字:每幕背景里一枚超大低透明度宋体字,填空间、定气质。 */
export function GhostGlyph({ char, style }: { char: string; style?: CSSProperties }) {
  return (
    <span className="ghost-glyph display" style={style} aria-hidden="true">
      {char}
    </span>
  );
}
