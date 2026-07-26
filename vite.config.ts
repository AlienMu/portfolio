import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  // GitHub Pages project site: https://alienmu.github.io/portfolio/
  // base 无条件生效,让 dev 与线上路径一致,base 路径问题在开发期即暴露
  base: '/portfolio/',
  plugins: [react()],
  resolve: {
    // cineview 是 link: 依赖,不 dedupe 会引入第二份 React/framer-motion 导致 hooks 崩溃
    dedupe: ['react', 'react-dom', 'framer-motion'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: { port: 4000 },
});
