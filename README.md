# Pomodoro Antigravity 🍅

一个现代化的番茄钟应用，使用 Next.js、TypeScript 和 Tailwind CSS 构建。

## 特性

- ⏱️ 经典番茄工作法计时器
- 🎨 精美的 UI 设计，支持三种模式主题
- 📊 统计数据追踪
- 🔔 浏览器通知提醒
- ⚙️ 可自定义设置
- 💾 本地数据持久化
- 📱 响应式设计，支持移动端

## 技术栈

- **Next.js 14+** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式方案
- **Zustand** - 状态管理

## 项目结构

```
pomodoro-antigravity/
├── .speckit/              # 项目规格文件
│   ├── constitution.md   # 技术栈约束与核心原则
│   ├── specify.md        # 详细的数据结构与逻辑定义
│   └── plan.md           # 分步执行指令
├── src/                  # 源代码
│   ├── app/             # Next.js App Router 页面
│   ├── components/      # UI 组件
│   ├── lib/             # 核心逻辑
│   └── types/           # TypeScript 类型定义
├── package.json
└── tailwind.config.ts
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

1. **开始工作**: 点击开始按钮开始 25 分钟的工作时间
2. **休息时间**: 工作完成后自动切换到 5 分钟短休息
3. **长休息**: 完成 4 个番茄钟后，享受 15 分钟长休息
4. **自定义设置**: 点击设置按钮调整时长和行为
5. **查看统计**: 追踪你的工作效率和完成的番茄钟数量

## 开发指南

请查看 `.speckit/` 目录下的文档了解详细的开发规范和计划：

- `constitution.md` - 技术栈约束与核心原则
- `specify.md` - 数据结构与逻辑定义
- `plan.md` - 开发计划与执行步骤

## License

MIT
