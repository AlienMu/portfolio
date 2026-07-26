/**
 * 字体子集化:fonts/ 下的完整字体 → src/assets/fonts/*.woff2
 *
 * 站点文案是有限集(源码 + curation + 抓取的 projects.json),扫描全部
 * 源文件收集实际用到的字符,加固定安全集,glyph 级精确子集。
 * 全量思源宋体 ~14MB → 子集预期 <200KB。产物提交进 git,CI 在 fetch 后重跑,
 * 保证新抓取数据的字形始终被覆盖。
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'src/assets/fonts');

// ASCII 可打印 + 常用中文标点/符号兜底(覆盖 cron 抓取的英文描述与日期数字)
const ASCII = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const SAFETY = `${ASCII}，。、：；！?？·「」『』《》〈〉（）—…～·★☆↓↑→©年月日第幕壹贰叁肆伍陆柒捌玖拾剧终`;

const SCAN_DIRS = ['src', 'content'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.json', '.css', '.html']);

async function collectChars() {
  const chars = new Set(SAFETY);
  const stack = [...SCAN_DIRS.map((d) => path.join(ROOT, d)), path.join(ROOT, 'index.html')];
  while (stack.length) {
    const current = stack.pop();
    const entries = await readdir(current, { withFileTypes: true }).catch(() => null);
    if (entries === null) {
      // 不是目录:按文件读
      if (SCAN_EXT.has(path.extname(current))) {
        const text = await readFile(current, 'utf8').catch(() => '');
        for (const ch of text) chars.add(ch);
      }
      continue;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'assets') stack.push(full); // 不扫字体产物自身
      } else if (SCAN_EXT.has(path.extname(entry.name))) {
        const text = await readFile(full, 'utf8').catch(() => '');
        for (const ch of text) chars.add(ch);
      }
    }
  }
  return [...chars].join('');
}

async function subset(srcFile, outName, text) {
  const source = await readFile(path.join(ROOT, 'fonts', srcFile));
  const result = await subsetFont(source, text, { targetFormat: 'woff2' });
  const outPath = path.join(OUT_DIR, outName);
  await writeFile(outPath, result);
  console.log(
    `ok: ${srcFile} (${(source.length / 1024 / 1024).toFixed(1)}MB) → ${outName} (${(result.length / 1024).toFixed(1)}KB)`,
  );
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const text = await collectChars();
  console.log(`glyph universe: ${text.length} chars`);
  await subset('NotoSerifSC-Black.ttf', 'display.woff2', text);
  await subset('NotoSansSC-Regular.ttf', 'text.woff2', text);
  await subset('IBMPlexMono-Regular.ttf', 'mono.woff2', ASCII + '·★/—↓');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
