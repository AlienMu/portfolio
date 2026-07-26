# Alien · 作品集 — Works

海报风格的个人页,同时是自研框架 [CineView](https://github.com/AlienMu/cineView) 的现场演示:自我介绍开场(逐字问候 + 头像相框),**个人作品**列表随滚动截流逐行展开(悬停高亮 + 右侧详情),「本站」一页现场播放框架动画预设,联系页收尾。纸墨朱三色、宋体大字、底纹汉字与纸纹质感。

A poster-style personal page that doubles as a live demo of my self-built framework **CineView**: a self-introduction opening (per-character greeting + pinned avatar card), a scroll-locked **works list** that unfolds row by row (hover to preview), a page about this site with live animation presets, and a contact finale.

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
