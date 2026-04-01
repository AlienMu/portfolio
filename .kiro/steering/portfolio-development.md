---
title: Portfolio Development Guide
description: Comprehensive guide for developing and maintaining the Alien Portfolio website
inclusion: auto
tags: [portfolio, nextjs, development, guidelines]
---

# Portfolio Development Guide

This steering file provides comprehensive guidelines for developing, maintaining, and extending the Alien Portfolio website.

## Project Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel-ready

### Core Features
1. Bilingual support (English/Chinese)
2. Dark/Light theme switching
3. Responsive design
4. Performance optimized (Core Web Vitals compliant)
5. Modern UI with gradients and animations

## Architecture Guidelines

### Component Structure

All components follow these principles:
- Use `'use client'` directive for interactive components
- Implement proper TypeScript typing
- Use Tailwind CSS for styling
- Follow atomic design principles

### File Organization

```
app/                    # Next.js App Router pages
components/             # Reusable React components
contexts/              # React Context providers
public/                # Static assets
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`, `ThemeToggle.tsx`)
- **Utilities**: camelCase (e.g., `useLanguage.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_LANGUAGE`)
- **CSS Classes**: kebab-case via Tailwind utilities

## Development Workflow

### Adding New Features

1. **Plan the feature**
   - Identify affected components
   - Consider i18n requirements
   - Plan responsive behavior

2. **Implement the feature**
   - Create/modify components
   - Add translations to `LanguageContext.tsx`
   - Ensure TypeScript types are correct
   - Test in both light/dark modes

3. **Test thoroughly**
   - Check responsive design (mobile, tablet, desktop)
   - Verify both language versions
   - Test theme switching
   - Run `npm run build` to check for errors

4. **Optimize performance**
   - Use Next.js Image component for images
   - Implement lazy loading where appropriate
   - Minimize bundle size

### Modifying Existing Components

#### Header Component
- Location: `components/Header.tsx`
- Purpose: Navigation and language/theme toggles
- Key features: Fixed positioning, responsive menu

#### Hero Component
- Location: `components/Hero.tsx`
- Purpose: Landing section with greeting
- Key features: Gradient text, call-to-action buttons

#### About Component
- Location: `components/About.tsx`
- Purpose: Personal introduction with avatar
- Key features: Avatar display, multi-line bio

#### Skills Component
- Location: `components/Skills.tsx`
- Purpose: Display technical skills with icons
- Key features: SVG icons, grid layout, hover effects

#### Projects Component
- Location: `components/Projects.tsx`
- Purpose: Showcase featured project
- Key features: Gradient background, GitHub link

#### Contact Component
- Location: `components/Contact.tsx`
- Purpose: Display contact methods
- Key features: Email, Twitter, GitHub links

## Internationalization (i18n)

### Adding New Translations

Edit `contexts/LanguageContext.tsx`:

```typescript
const translations = {
  en: {
    newKey: 'English text',
  },
  zh: {
    newKey: '中文文本',
  },
}
```

### Using Translations in Components

```typescript
import { useLanguage } from '@/contexts/LanguageContext'

export default function MyComponent() {
  const { t, language } = useLanguage()
  
  return <div>{t('newKey')}</div>
}
```

### Translation Guidelines

1. Keep keys descriptive and consistent
2. Maintain parity between English and Chinese
3. Use proper punctuation for each language
4. Consider text length differences in layouts

## Styling Guidelines

### Tailwind CSS Best Practices

1. **Use utility classes**: Prefer Tailwind utilities over custom CSS
2. **Responsive design**: Use responsive prefixes (`md:`, `lg:`)
3. **Dark mode**: Always provide dark mode variants (`dark:`)
4. **Consistency**: Use consistent spacing and sizing

### Color Palette

- **Primary**: Blue (`blue-600`)
- **Secondary**: Purple (`purple-600`)
- **Accent**: Pink (`pink-600`)
- **Neutral**: Gray shades
- **Gradients**: Use `bg-gradient-to-r` with multiple colors

### Common Patterns

```tsx
// Button
<button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">

// Card
<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">

// Gradient Text
<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
```

## Performance Optimization

### Core Web Vitals Checklist

- ✅ Use Next.js Image component for images
- ✅ Implement proper lazy loading
- ✅ Minimize JavaScript bundle size
- ✅ Use CSS animations over JavaScript
- ✅ Optimize font loading
- ✅ Implement proper caching headers

### Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/avatar.jpg"
  alt="Alien"
  width={192}
  height={192}
  className="rounded-full"
  priority // for above-the-fold images
/>
```

### Code Splitting

- Use dynamic imports for heavy components
- Lazy load non-critical sections
- Keep initial bundle size minimal

## Accessibility Guidelines

1. **Semantic HTML**: Use proper HTML elements
2. **ARIA labels**: Add `aria-label` to icon buttons
3. **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
4. **Color contrast**: Maintain WCAG AA standards
5. **Focus indicators**: Visible focus states for all interactive elements

## Testing Checklist

Before deploying changes:

- [ ] Test in Chrome, Firefox, Safari
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify both light and dark themes
- [ ] Check both English and Chinese versions
- [ ] Test all interactive elements
- [ ] Verify responsive breakpoints
- [ ] Run `npm run build` successfully
- [ ] Check for console errors
- [ ] Test all external links
- [ ] Verify email/social links work

## Common Tasks

### Updating Personal Information

1. **Name and Bio**: Edit `contexts/LanguageContext.tsx`
2. **Avatar**: Replace `public/avatar.jpg`
3. **Contact Info**: Update links in `components/Contact.tsx`
4. **Social Links**: Modify URLs in Contact component

### Adding a New Skill

1. Open `components/Skills.tsx`
2. Add new skill object with icon:

```typescript
{
  name: 'New Skill',
  icon: (
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#COLOR">
      <path d="..." />
    </svg>
  )
}
```

### Modifying the Project

1. Open `components/Projects.tsx`
2. Update project object:

```typescript
const project = {
  title: 'Project Title',
  titleZh: '项目标题',
  description: 'English description',
  descriptionZh: '中文描述',
  tags: ['Tag1', 'Tag2'],
  gradient: 'from-color-400 to-color-600',
  github: 'https://github.com/username/repo',
}
```

### Changing Theme Colors

1. Update Tailwind classes in components
2. Maintain consistency across all components
3. Test in both light and dark modes

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import repository in Vercel
3. Configure build settings (auto-detected)
4. Deploy

### Environment Variables

No environment variables required for basic deployment.

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Troubleshooting

### Common Issues

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm run build` locally and fix type errors

**Issue**: Images not loading
- **Solution**: Ensure images are in `public/` directory

**Issue**: Translations not updating
- **Solution**: Check `LanguageContext.tsx` for correct key names

**Issue**: Dark mode not working
- **Solution**: Verify `dark:` classes are applied and localStorage is accessible

**Issue**: Responsive layout broken
- **Solution**: Check responsive breakpoints (`md:`, `lg:`) in Tailwind classes

## Best Practices Summary

1. **Always test both languages** before committing
2. **Maintain dark mode support** for all new features
3. **Keep components small and focused**
4. **Use TypeScript strictly** - no `any` types
5. **Follow existing patterns** for consistency
6. **Optimize for performance** - check bundle size
7. **Write semantic HTML** for accessibility
8. **Test on real devices** not just browser DevTools
9. **Keep dependencies minimal** - avoid unnecessary packages
10. **Document complex logic** with comments

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [Web.dev Performance](https://web.dev/performance/)

## Maintenance

### Regular Updates

- Update dependencies monthly: `npm update`
- Check for security vulnerabilities: `npm audit`
- Review and update content quarterly
- Monitor Core Web Vitals in production

### Version Control

- Use meaningful commit messages
- Create feature branches for new features
- Keep main branch stable and deployable
- Tag releases with semantic versioning

---

**Last Updated**: 2026
**Maintained By**: Alien
**Contact**: mu1hang@foxmail.com
