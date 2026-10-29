import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

/** `<!-- include:name.svg -->` in index.html → the contents of src/parts/name.svg (inline line art). */
function includeParts(): Plugin {
  return {
    name: 'include-parts',
    transformIndexHtml: (html) =>
      html.replace(/<!-- include:([\w.-]+) -->/g, (_, file: string) =>
        readFileSync(new URL(`./src/parts/${file}`, import.meta.url), 'utf8').trim()
      ),
  };
}

export default defineConfig(({ command }) => ({
  // Cloudflare Pages, served at the root of https://alienmmm.com
  base: '/',
  plugins: [includeParts()],
  // 开发时用 CineView 的开发版：属性写错、名字对不上会在控制台给出说明
  resolve: command === 'serve' ? { alias: [{ find: /^cineview$/, replacement: 'cineview/dev' }] } : {},
  server: { port: 4000 },
  build: { target: 'es2022' },
}));
