# Alien · 作品集 — Works

个人作品集,也是自研框架 [CineView](https://github.com/AlienMu/cineView) 的样片:整站是一场"中文电影海报"式的滚动放映——片名海报开场,序幕自我介绍逐行揭示,**排片表**里所有 GitHub 项目随滚动截流逐幕登场(悬停高亮 + 场刊预览),幕后一幕现场演示框架动画预设,终幕以职员表落款。

A personal portfolio that doubles as the demo reel of my self-built framework **CineView** — a cinematic, Chinese-movie-poster-style scroll experience: title poster, a prologue that reveals line by line, a scroll-locked **filmography bill** where every repo takes the stage (hover to preview), a backstage scene with live animation presets, and a credits finale.

**Live**: https://alienmu.github.io/portfolio/

## 特性

- **自动采集 GitHub 项目**:构建时拉取公开仓库,与 `content/curation.json` 精选配置合并;GitHub Actions 每日重建,新项目自动上片
- **自研框架驱动**:CineView scroll 模式,center-lock 滚动区驱动海报分镜动画
- **中英双语**:轻量 context,localStorage 持久化
- **字体子集化**:思源宋体 14MB → ~75KB,按站点实际字符 glyph 级裁剪,全自托管
- **可访问性**:prefers-reduced-motion 降级为静态海报;键盘可达,焦点可见

## 本地开发

依赖 cineView 仓库以**平级目录**存在(pnpm `link:` 依赖):

```
workspace/
├── cineView/cineview   # 框架(需先构建)
└── portfolio           # 本站
```

```bash
# 1. 构建框架(首次 & 框架更新后)
cd cineView/cineview && pnpm install && pnpm build

# 2. 启动本站
cd ../../portfolio
pnpm install
pnpm fetch        # 可选:刷新 GitHub 项目数据(已提交离线副本)
pnpm fonts        # 可选:重新子集化字体(改文案后)
pnpm dev          # http://localhost:4000/portfolio/
```

## 策展

改 `content/curation.json`(展示顺序、中文片名/描述、印章配色、demo 链接),然后 `pnpm fetch`。不想展示的仓库加进 `exclude`。

## 部署

push 到 `main` 或每日定时,GitHub Actions 自动:checkout 两仓库 → 构建 cineview → fetch 项目数据 → 子集化字体 → 构建 → 发布 GitHub Pages。仓库 Settings → Pages → Source 需设为 **GitHub Actions**。

## License

MIT · Made by [Alien](https://github.com/AlienMu)
