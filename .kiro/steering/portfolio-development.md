---
title: Portfolio Development Guide
description: Conventions for the CineView 2 personal page (plain HTML + Vite)
inclusion: auto
tags: [portfolio, cineview, vite]
---

# Portfolio Development Guide

介绍 Alien 本人的个人主页。CineView 是重点作品之一，不是主角。整页用 CineView 2（npm `cineview`，`cv-*` 自定义元素）搭成。

## 技术栈（2026-10 重做后）

- 纯 HTML + Vite 5 + TypeScript；没有 React，也没有框架组件
- `cineview@2.0.1`，从 npm 装，版本写死；开发时 Vite 把 `cineview` 指到 `cineview/dev`（会打印写法错误）
- 样式：手写 CSS，`src/styles/main.css`，第一行 `@import 'cineview/cineview.css'`
- 部署：Cloudflare Pages（项目 `alien-portfolio`，域名 alienmmm.com），本地 `pnpm deploy` 构建并用 wrangler 上传；没有 CI

## 规则

1. **暗金配色**：底色 `#0F0E0D`、金色 `#BD9661`（高光 `#E7C399`）、正文 `#EDE6DC`、次要文字 `#A39A8E`。深金 `#896B48` 对比度只有 3.9:1，只能用来画线。
2. **字体**：英文 Barlow、中文思源黑体，常规和粗体两档；mono 用 IBM Plex Mono。全部自己托管，不引入字体 CDN。改了文案后跑 `pnpm fonts`。
3. **单位**：`--u` 是 1920 宽稿子上的 1 像素，按视口缩放，最大到 1920px；手机（≤760px）改成 750 宽的稿子。
4. **双语**：每段文字写成成对的 `<span lang="zh-CN">` 和 `<span lang="en">`。图片 alt 和 aria-label 用 `data-alt-zh/en`、`data-label-zh/en`。
5. **锁定区长度**：第 3 幕 1px 滚动 = 1ms，最晚结束的元素决定长度（现在是 4300）。改了时间就同步改 CSS 里的 `#road { height: calc(4300px + 100svh) }`。
6. **比屏幕高的块**用 `on="enter(partial)"`，否则要整块进入视口才会播放，在矮屏幕上永远不出现。
7. **grid 里的 `cv-animate`** 要加 `min-width: 0`，否则内容会撑破列宽。
8. **路径**：素材用相对路径 `media/...`，不写死根路径，换部署位置时不用改。

## 验证

- `pnpm type-check && pnpm build && pnpm preview`
- 在 Chrome 和 WebKit 里看五种视口（1920×1080、1440×900、1280×720、820×1180、390×844）：没有 `cv-error`，没有横向滚动条
- 中英文切换；开启减弱动态效果；在第 3 幕中间刷新页面

---

Last Updated: 2026-10 | Maintained By: Alien | Contact: mu1hang@foxmail.com
