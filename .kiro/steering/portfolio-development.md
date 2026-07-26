---
title: Portfolio Development Guide
description: Conventions for the CineView-powered portfolio (Vite + React SPA)
inclusion: auto
tags: [portfolio, cineview, vite, react, guidelines]
---

# Portfolio Development Guide

本站是"中文电影海报"风格的个人作品集,整页跑在自研框架 **CineView**(github.com/AlienMu/cineView)上——网站本身就是框架的样片。

## 技术栈(2026-07 重写后)

- **构建**: Vite 5 + React 18 + TypeScript(严格模式),SPA,无 SSR
- **框架**: `cineview`(本地 link 依赖)+ framer-motion peer
- **样式**: 手写 CSS(`src/styles/`),无 Tailwind;设计 token 见 global.css `:root`
- **部署**: GitHub Pages,`.github/workflows/deploy.yml`(push + 每日 cron 自动采集重建)

## 铁律

1. **cineview 构建顺序**:依赖是 `link:../cineView/cineview`,指向其 `dist/`。首次开发或框架更新后必须先 `cd ../cineView/cineview && pnpm build`,再回来 `pnpm dev`(改框架后需重启 vite)。
2. **只用 scroll 纵向模式**:`mode="scroll"` + `direction:'y'`。drag 模式(无滚轮支持)与横向 scroll(已知损坏)禁用。
3. **单一亮色方案**:纸 `#F6F4EF` / 墨 `#1F1D1A` / 朱 `#BE3B2A` / 黛 `#5A5E66` / 线 `#D8D4CB`。不做暗色模式,不加 `dark:` 逻辑。
4. **单标尺布局**:所有长度用 `calc(var(--u) * 设计px)`;桌面稿 1440、移动稿 750,断点切换靠 `App.tsx` 的 `key={variant}` 重挂载。
5. **竖排只给汉字**:`writing-mode: vertical-rl` 仅用于中文展示型文字;latin(仓库名、URL)一律横排等宽。
6. **render-prop 擦洗动画必须给 `enterAnimation`(可用 `SOLID`)+ `duration`**,否则时间轴零长度、`enterProgress` 恒 0。
7. **sceneId/zoneId 派生自仓库名**,fetch 脚本已断言唯一;重复 id 会静默毁掉滚动区。
8. **reduced-motion**:所有动画经 `<Cue off={reduced}>` 包装,新动画同样要走 Cue。
9. **背景覆盖 hack**:cineview 滚动根内联白底被 `[data-cineview-container] { background: var(--paper) !important }` 覆盖,升级框架后复查。
10. **中文文案用全角标点**(,:),英文用半角;双语 key 加进 `src/i18n/LanguageContext.tsx` 时保持 en/zh 对齐。

## 数据工作流

- **项目数据自动采集**:`pnpm fetch` → `scripts/fetch-repos.mjs` 拉 GitHub API(AlienMu 公开仓库),与 `content/curation.json` 合并 → `src/data/projects.json`(提交进 git,本地开发离线可用)。
- **策展**:改 `content/curation.json`(顺序、中文片名/描述、accent 色、截图、demo 链接),再跑 `pnpm fetch`。
- **CI 每日重建**:workflow 用内置 GITHUB_TOKEN 重新 fetch,新仓库最多滞后一天上线。

## 字体工作流

- 源字体(完整 TTF)提交在 `fonts/`;`pnpm fonts` → `scripts/subset-fonts.mjs` 扫描 src/ + content/ 全部字符,按 glyph 子集化产出 `src/assets/fonts/*.woff2`(约 70/55/8 KB)。
- 新增中文文案后重跑 `pnpm fonts`,否则新字形会回退到系统宋体。
- 全部自托管,禁止引入字体 CDN(大陆访客)。

## 本地验证清单

```bash
cd ../cineView/cineview && pnpm install && pnpm build
cd ../../portfolio && pnpm install && pnpm fetch && pnpm fonts && pnpm dev   # http://localhost:4000/portfolio/
```

- `pnpm type-check && pnpm build && pnpm preview` → http://localhost:4173/portfolio/(Pages base 路径预演)
- 双语切换全部文案翻转并持久化;`<html lang>` 同步
- DevTools 模拟 prefers-reduced-motion:内容静态直达终态
- 390px 视口走 750 稿变体,无横向溢出
- console 无 cineview onError(重点 INVALID_COMPONENT_HIERARCHY / FIRST_SCENE_TIMEOUT)

---

Last Updated: 2026-07 | Maintained By: Alien | Contact: mu1hang@foxmail.com
