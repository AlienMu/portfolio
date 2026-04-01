# Alien's Portfolio | Alien 的个人作品集

[English](#english) | [中文](#中文)

---

## English

A modern, high-performance portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

### ✨ Features

- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 🌐 **Bilingual Support** - English and Chinese language toggle
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Passes Core Web Vitals standards
- 🎨 **Modern Design** - Beautiful gradients and smooth animations
- 🖼️ **Interactive UI** - Hover effects and smooth transitions

### 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icons
- **Deployment**: Vercel-ready

### 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 🚀 Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Replace avatar: Add your photo to `public/avatar.jpg`
4. Update content: Edit translations in `contexts/LanguageContext.tsx`
5. Customize projects: Modify `components/Projects.tsx`
6. Run locally: `npm run dev`
7. Open [http://localhost:3000](http://localhost:3000)

### 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills showcase
│   ├── Projects.tsx       # Projects display
│   ├── Contact.tsx        # Contact information
│   └── ThemeToggle.tsx    # Theme switcher
├── contexts/              # React contexts
│   └── LanguageContext.tsx # i18n context
├── public/                # Static assets
│   └── avatar.jpg         # Profile photo
└── README.md              # Documentation
```

### 🎨 Customization

#### Update Personal Information

Edit `contexts/LanguageContext.tsx`:

```typescript
const translations = {
  en: {
    name: 'Your Name',
    aboutText: 'Your bio...',
    // ... other translations
  },
  zh: {
    name: '你的名字',
    aboutText: '你的简介...',
    // ... other translations
  },
}
```

#### Add/Remove Skills

Edit `components/Skills.tsx` to add or remove skills with custom icons.

#### Modify Projects

Edit `components/Projects.tsx` to showcase your projects with descriptions and links.

### 🌐 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or manually:

```bash
npm run build
npm start
```

### 📄 License

MIT License - feel free to use this template for your own portfolio!

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 中文

使用 Next.js 14、TypeScript 和 Tailwind CSS 构建的现代化、高性能个人作品集网站。

### ✨ 特性

- 🌓 **深色/浅色模式** - 无缝主题切换，支持系统偏好检测
- 🌐 **双语支持** - 中英文自由切换
- 📱 **完全响应式** - 适配所有设备和屏幕尺寸
- ⚡ **性能优化** - 通过 Core Web Vitals 标准
- 🎨 **现代设计** - 精美渐变和流畅动画
- 🖼️ **交互式界面** - 悬停效果和平滑过渡

### 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: 自定义 SVG 图标
- **部署**: 支持 Vercel

### 📦 安装

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 🚀 快速开始

1. 克隆仓库
2. 安装依赖：`npm install`
3. 替换头像：将你的照片放到 `public/avatar.jpg`
4. 更新内容：编辑 `contexts/LanguageContext.tsx` 中的翻译
5. 自定义项目：修改 `components/Projects.tsx`
6. 本地运行：`npm run dev`
7. 打开 [http://localhost:3000](http://localhost:3000)

### 📁 项目结构

```
portfolio/
├── app/                    # Next.js 应用目录
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Header.tsx         # 导航头部
│   ├── Hero.tsx           # 首屏区域
│   ├── About.tsx          # 关于我
│   ├── Skills.tsx         # 技能展示
│   ├── Projects.tsx       # 项目展示
│   ├── Contact.tsx        # 联系方式
│   └── ThemeToggle.tsx    # 主题切换
├── contexts/              # React 上下文
│   └── LanguageContext.tsx # 国际化上下文
├── public/                # 静态资源
│   └── avatar.jpg         # 个人照片
└── README.md              # 文档
```

### 🎨 自定义

#### 更新个人信息

编辑 `contexts/LanguageContext.tsx`：

```typescript
const translations = {
  en: {
    name: 'Your Name',
    aboutText: 'Your bio...',
    // ... 其他翻译
  },
  zh: {
    name: '你的名字',
    aboutText: '你的简介...',
    // ... 其他翻译
  },
}
```

#### 添加/删除技能

编辑 `components/Skills.tsx` 来添加或删除技能及自定义图标。

#### 修改项目

编辑 `components/Projects.tsx` 来展示你的项目，包括描述和链接。

### 🌐 部署

一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

或手动部署：

```bash
npm run build
npm start
```

### 📄 许可证

MIT 许可证 - 欢迎使用此模板创建你自己的作品集！

### 🤝 贡献

欢迎贡献、提出问题和功能请求！

---

Made with ❤️ by Alien
