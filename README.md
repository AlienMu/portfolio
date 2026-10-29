# Alien · 个人主页

介绍我自己的一页：开场是我骑车的照片和一句话，然后是关于我、一段跟着滚动往前开的骑行视频、作品（CineView 为主）和联系方式。整页用我写的框架 [CineView 2](https://github.com/AlienMu/cineview) 搭成。暗色底，金色取自照片里车灯网罩的黄铜色。

My personal page: who I am, a ride you scroll through, my works (CineView first), and where to find me. Built with my own framework, CineView 2.

**Live**: https://alienmmm.com

## 结构

| 幕 | 内容 | 做法 |
| --- | --- | --- |
| 01 开场 | 骑车照 + 问候 + GitHub / X | 照片从暗处亮起，名字逐行升起；被下一幕盖住时变暗（`stack covered="dim"`） |
| 02 关于我 | 三句自我介绍 + 技能 | 背景等高线逐笔画出（`fx="draw"`） |
| 03 路上 | 骑行视频 + 三个爱好 + 雪山和合影 | 锁定区：画面停住，滚动推着视频逐帧前进、倒退（`zone` + `cv-video`），4300 px |
| 04 作品 | CineView + Resume + Mowen | 数字滚动（`fx="count"`）、截图依次升起 |
| 05 关注 | GitHub / X / Telegram / 邮箱 | |

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:4000/ ，开发时用 cineview/dev，写错的属性会在控制台报出来
pnpm fonts      # 改了文案后重新子集化字体
pnpm type-check && pnpm build && pnpm preview   # http://localhost:4173/
```

- 页面就是 `index.html`，样式在 `src/styles/main.css`，脚本 `src/main.ts` 只管语言切换和顶栏。
- 中英文都写在标记里（成对的 `<span lang>`），按 `<html lang>` 显示其中一种，切换语言不会重建舞台。
- 素材在 `public/media/`。原片（照片、视频）不进仓库；视频要每帧都是关键帧才能随滚动倒退：
  `ffmpeg -ss 8 -t 12 -i 原片.mp4 -an -vf "crop=1600:900:160:0,scale=1280:720,fps=25" -c:v libx264 -pix_fmt yuv420p -g 1 -crf 35 -preset slow -movflags +faststart public/media/road.mp4`

## 部署

部署在 Cloudflare Pages（项目名 `alien-portfolio`，域名 alienmmm.com），和 CineView 官网一样在本地构建后上传：

```bash
pnpm deploy     # 类型检查、构建，再用 wrangler 上传 dist/
```

第一次用要先 `npx wrangler login`。没有定时任务，也不抓取 GitHub 数据：内容都写在页面里，改完运行一次 `pnpm deploy` 就是发布。

## License

MIT · Made by [Alien](https://github.com/AlienMu)
