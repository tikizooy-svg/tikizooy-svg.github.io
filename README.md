# TINA · UI/UX 设计师个人作品集

基于 **React + Vite** 构建的个人作品集网站。

- **设计规范**：首页——深色主题（`#111`）、Manrope 字体、纯蓝强调色（`#0000EE`）、胶囊徽章/按钮、区块编号眉题（`{01} —`）、蓝色数据横幅
- **内容**：参考 Tina UI/UX 设计师作品集设计稿
- **布局**：PC 端优先，版心最大宽度 **1700px**，响应式向下兼容

## 本地运行

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器（默认 http://localhost:5173）
npm run build   # 生产构建（输出到 dist/）
npm run preview # 预览生产构建
```

## 目录结构

```
tina-portfolio/
├── index.html                # 入口 HTML（标题 / 字体 / 元信息）
├── src/
│   ├── main.jsx              # React 挂载入口
│   ├── App.jsx               # 页面组装 + 滚动显现动画
│   ├── index.css             # 设计系统（色彩 / 字体 / 间距令牌 + 全部样式）
│   ├── data/
│   │   └── portfolio.js      # ★ 站点内容数据（改文案/项目/统计都在这里）
│   └── components/
│       ├── Nav.jsx           # 导航栏（TINA · 首页/关于我/我的作品 · 联系我）
│       ├── Hero.jsx          # 首屏（Hi, I'm Tina + 简介 + 按钮）
│       ├── Stats.jsx         # 数据统计（从业年限 / 完成项目 / 设计系统交付）
│       ├── About.jsx         # 关于我（姓名 + 设计理念引言）
│       ├── Experience.jsx    # 工作经历
│       ├── Works.jsx         # 作品展示（Selected Works 卡片网格）
│       └── Footer.jsx        # 合作邀约（LET'S WORK TOGETHER + 联系方式）
└── public/                   # 静态资源（如简历 PDF）
```

## 后续迭代指引

- **改文案 / 统计数据 / 项目**：编辑 `src/data/portfolio.js`
- **换作品封面图**：在 `Works.jsx` 中把 CSS 渐变封面替换为 `<img>`，图片放入 `src/assets/` 或 `public/`
- **加新作品卡片**：在 `portfolio.js` 的 `works` 数组追加一项即可
- **配色 / 字体 / 间距**：统一修改 `src/index.css` 顶部的 CSS 变量（design tokens）
