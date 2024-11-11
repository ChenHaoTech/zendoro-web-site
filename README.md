# TOOD
- [ ] 如何发布 md 文件? 
- [ ] 需要修改什么内容? 
  - [ ] 修改本地DNS, 让 fleetingnotes.app重新定位到本地
  - [ ] 对应的check list 输出出来, 以后使用
  - [ ] ts 如何字符串拼接
  - [ ] `https://customer.io/` 注册
  - [ ] `https://testimonial.to/?via=widgets` 注册
  - [ ] 删除付费模块
  - [ ] `/Users/apple/Work/github/zendoro-notes-website/.env` 信息修改
  - [ ] pricing-tables.tsx 修改
  - [ ] features-table.tsx
  - [ ] 什么事Css 类
  

**需要修改的文件**
- [ ] next-seo.config.ts
- [ ] favicon 修改
- [ ] 一些常用的链接, 替换所有的`fleetingnotes`的文本。


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



## AI 
看起来你提供了一个项目目录结构的列表，这个目录结构似乎是用于一个基于Next.js框架的前端项目。下面是你提供的目录结构的简要概述：
项目根目录
• `@types`：TypeScript 类型定义文件。
• `lib`：存放项目库文件。
• `LICENSE`：项目许可证文件。
• `next-seo.config.ts`：Next.js SEO配置文件。
• `next.config.js`：Next.js项目配置文件。
• `package.json`：npm包管理文件。
• `postcss.config.js`：PostCSS配置文件。
• `public`：存放静态资源文件。
• `styles`：存放样式文件。
• `tailwind.config.js`：Tailwind CSS配置文件。
• `tsconfig.json`：TypeScript配置文件。
lib目录
• `api.ts`：API接口文件。
• `constants.ts`：常量定义文件。
• `markdownToHtml.ts`：Markdown转HTML的文件。
• `modules`：模块目录，包含`copy-images.mjs`和`find-files-recursively.mjs`。
pages目录
• `_app.tsx`：应用级别的组件。
• `_document.tsx`：文档级别的组件。
• `api`：API相关页面。
• `docs`：文档页面。
• `index.tsx`：首页。
• `newsletters`：订阅页面。
• `posts`：文章页面。
• `pricing.tsx`：定价页面。
components目录
• `blog`：博客相关组件。
• `docs`：文档相关组件。
• `landing`：着陆页相关组件。
• `misc`：杂项组件。
• `post`：文章相关组件。
• `pricing`：定价相关组件。
• `utils`：工具组件。
interfaces目录
• `author.ts`：作者接口定义文件。
• `post.ts`：文章接口定义文件。这个目录结构显示了一个典型的Next.js项目结构，包括页面、组件、接口定义和工具函数等。如果你有任何具体的问题或者需要帮助的地方，请告诉我！