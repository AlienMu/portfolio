/**
 * 字体子集化:fonts/ 下的完整字体 → src/assets/fonts/*.woff2
 *
 * 站点文案是有限集,扫描 index.html 与 src/ 收集实际用到的字符,加 ASCII 兜底,glyph 级精确子集。
 * 思源黑体 ~10MB → 子集几十 KB。产物提交进 git;改文案后重跑 `pnpm fonts`。
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'src/assets/fonts');

const ASCII = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const SAFETY = `${ASCII}，。、：；！？·「」《》（）—…↗↓→←©`;
const SCAN = ['index.html', 'src'];
const SCAN_EXT = new Set(['.ts', '.html', '.css', '.svg']);

async function collect(target, chars) {
  const entries = await readdir(target, { withFileTypes: true }).catch(() => null);
  if (entries === null) {
    if (SCAN_EXT.has(path.extname(target))) for (const ch of await readFile(target, 'utf8')) chars.add(ch);
    return;
  }
  for (const entry of entries) {
    if (entry.name === 'assets') continue; // 不扫字体产物自身
    await collect(path.join(target, entry.name), chars);
  }
}

async function subset(srcFile, outName, text) {
  const source = await readFile(path.join(ROOT, 'fonts', srcFile));
  const result = await subsetFont(source, text, { targetFormat: 'woff2' });
  await writeFile(path.join(OUT_DIR, outName), result);
  console.log(`ok: ${srcFile} (${(source.length / 1024).toFixed(0)}KB) → ${outName} (${(result.length / 1024).toFixed(1)}KB)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const chars = new Set(SAFETY);
  for (const t of SCAN) await collect(path.join(ROOT, t), chars);
  const text = [...chars].join('');
  console.log(`glyph universe: ${text.length} chars`);
  await subset('NotoSansSC-Regular.ttf', 'sans-400.woff2', text);
  await subset('NotoSansSC-Bold.ttf', 'sans-700.woff2', text);
  // Barlow 只覆盖拉丁:中文走思源黑体
  await subset('Barlow-Regular.ttf', 'barlow-400.woff2', SAFETY);
  await subset('Barlow-SemiBold.ttf', 'barlow-600.woff2', SAFETY);
  await subset('Barlow-Bold.ttf', 'barlow-700.woff2', SAFETY);
  await subset('IBMPlexMono-Regular.ttf', 'mono-400.woff2', SAFETY);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
