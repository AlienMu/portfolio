/** 页码角标:海报右下角的 01 / 04 */
export function PageNo({ index, total = 4 }: { index: number; total?: number }) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="page-no mono">
      {pad(index)} / {pad(total)}
    </div>
  );
}
