# Constitution - 技术栈约束与核心原则

## 技术栈

### 核心框架
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript 5+**

### 样式方案
- **Tailwind CSS** - 用于快速样式开发
- **CSS Modules** (可选) - 用于组件级样式隔离

### 状态管理
- **Zustand** - 轻量级状态管理库
- **React Hooks** - 本地状态管理

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型安全

## 核心原则

### 1. 简洁性优先
- 保持代码简洁明了
- 避免过度工程化
- 优先使用标准库和轻量级依赖

### 2. 类型安全
- 所有代码必须有完整的 TypeScript 类型定义
- 避免使用 `any` 类型
- 充分利用类型推断

### 3. 组件化设计
- UI 组件应该是纯函数组件
- 遵循单一职责原则
- 组件应该是可复用和可测试的

### 4. 性能优先
- 使用 React.memo 优化不必要的重渲染
- 合理使用 useMemo 和 useCallback
- 避免在渲染路径中进行复杂计算

### 5. 用户体验
- 界面应该直观易用
- 提供清晰的视觉反馈
- 支持键盘快捷键操作

## 约束条件

### 必须遵守
- ✅ 使用 App Router (不使用 Pages Router)
- ✅ 所有组件使用 TypeScript
- ✅ 使用 Tailwind CSS 进行样式设计
- ✅ 状态管理使用 Zustand

### 禁止使用
- ❌ Class 组件
- ❌ Redux (使用 Zustand 替代)
- ❌ 内联样式 (使用 Tailwind 类名)
- ❌ any 类型 (除非绝对必要)
