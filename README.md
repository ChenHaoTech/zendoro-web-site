# TOOD
- [ ] 如何发布 md 文件? 
- [ ] 需要修改什么内容? 
  - [ ] 颜色主题

- [ ] tail wind 学习
- [ ] next 启动有什么注意事项吗
- [ ] change fav icon

---
## 文件结构

ls
@types             lib                package.json       tailwind.config.js
LICENSE            next-seo.config.ts pages              tsconfig.json
README.md          next.config.js     postcss.config.js
components         node_modules       public
interfaces         package-lock.json  styles

./lib
├── api.ts
├── constants.ts
├── markdownToHtml.ts
└── modules
    ├── copy-images.mjs
    └── find-files-recusively.mjs

./pages
├── [...slug].tsx
├── _app.tsx
├── _document.tsx
├── api
│   ├── post-preview
│   │   └── [...slug].ts
│   └── search
│       └── index.ts
├── docs
│   └── [...slug].tsx
├── index.tsx
├── newsletters
│   └── subscribe.tsx
├── posts
│   └── [pid].tsx
└── pricing.tsx    


./components
├── blog
│   ├── comments.tsx
│   ├── pagination.tsx
│   ├── popular-posts.tsx
│   └── post-list.tsx
├── docs
│   └── sidebar.tsx
├── landing
│   ├── cta.tsx
│   ├── features-blocks.tsx
│   ├── features-home.tsx
│   ├── hero-home.tsx
│   └── testimoninals-home.tsx
├── misc
│   ├── backlinks.tsx
│   ├── date-formatter.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── layout.tsx
│   ├── meta.tsx
│   ├── note-preview.tsx
│   ├── preview-link.tsx
│   └── search.tsx
├── post
│   ├── markdown-styles.module.css
│   ├── post-body.tsx
│   ├── post-meta.tsx
│   ├── post-preview.tsx
│   ├── post-single.tsx
│   └── post-wrapper.tsx
├── pricing
│   ├── features-table.tsx
│   └── pricing-tables.tsx
└── utils
    ├── newsletter.tsx
    └── transitions.jsx
    

./interfaces
├── author.ts
└── post.ts