# Plan - Agent 执行计划

## 阶段 1: 项目初始化

### 1.1 创建 Next.js 项目
```bash
npx create-next-app@latest pomodoro-antigravity --typescript --tailwind --app --no-src
cd pomodoro-antigravity
```

### 1.2 安装依赖
```bash
npm install zustand
npm install -D @types/node
```

### 1.3 配置 Tailwind
- 确认 `tailwind.config.ts` 配置正确
- 设置自定义颜色主题（红、绿、蓝）

## 阶段 2: 类型定义

### 2.1 创建类型文件
**文件**: `src/types/timer.ts`
- 定义 `TimerState` 接口
- 定义 `TimerSettings` 接口
- 定义 `Statistics` 接口
- 定义 `TimerMode` 类型

## 阶段 3: 状态管理

### 3.1 创建 Zustand Store
**文件**: `src/lib/store/timer-store.ts`
- 实现计时器状态管理
- 实现设置管理
- 实现统计数据管理
- 添加 localStorage 持久化

### 3.2 创建自定义 Hooks
**文件**: `src/lib/hooks/use-timer.ts`
- `useTimer`: 计时器逻辑 hook
- 实现倒计时逻辑
- 实现模式切换逻辑
- 实现完成逻辑

**文件**: `src/lib/hooks/use-notification.ts`
- `useNotification`: 通知管理 hook
- 请求通知权限
- 发送浏览器通知

## 阶段 4: 工具函数

### 4.1 时间格式化
**文件**: `src/lib/utils/time.ts`
- `formatTime(seconds: number): string` - 格式化为 MM:SS
- `minutesToSeconds(minutes: number): number` - 分钟转秒

### 4.2 本地存储
**文件**: `src/lib/utils/storage.ts`
- `saveSettings(settings: TimerSettings): void`
- `loadSettings(): TimerSettings | null`
- `saveStatistics(stats: Statistics): void`
- `loadStatistics(): Statistics | null`

## 阶段 5: UI 组件

### 5.1 计时器显示组件
**文件**: `src/components/Timer.tsx`
- 显示当前时间
- 显示当前模式
- 根据模式切换颜色主题
- 响应式设计

### 5.2 控制按钮组件
**文件**: `src/components/Controls.tsx`
- 开始/暂停按钮
- 重置按钮
- 跳过按钮
- 按钮状态管理

### 5.3 进度指示组件
**文件**: `src/components/Progress.tsx`
- 显示当前循环进度
- 显示已完成番茄钟数
- 可视化进度条

### 5.4 设置面板组件
**文件**: `src/components/Settings.tsx`
- 时长设置（工作、短休息、长休息）
- 循环设置（长休息前的番茄钟数）
- 自动开始设置
- 保存/取消按钮

### 5.5 统计面板组件
**文件**: `src/components/Statistics.tsx`
- 显示总计数据
- 显示今日数据
- 数据可视化（可选）

## 阶段 6: 主页面

### 6.1 创建主页
**文件**: `src/app/page.tsx`
- 整合所有组件
- 实现布局
- 添加响应式设计
- 实现深色模式（可选）

### 6.2 布局配置
**文件**: `src/app/layout.tsx`
- 配置元数据
- 配置字体
- 全局样式

## 阶段 7: 样式优化

### 7.1 自定义 Tailwind 配置
- 定义颜色主题
- 定义动画效果
- 定义响应式断点

### 7.2 组件样式优化
- 添加过渡动画
- 优化按钮交互效果
- 优化移动端体验

## 阶段 8: 测试与优化

### 8.1 功能测试
- 测试计时器基本功能
- 测试模式切换
- 测试数据持久化
- 测试通知功能

### 8.2 性能优化
- 使用 React.memo 优化组件
- 优化状态更新逻辑
- 减少不必要的重渲染

### 8.3 用户体验优化
- 添加键盘快捷键
- 优化加载状态
- 添加错误处理

## 执行顺序

1. ✅ 阶段 1: 项目初始化
2. ✅ 阶段 2: 类型定义
3. ✅ 阶段 3: 状态管理
4. ✅ 阶段 4: 工具函数
5. ✅ 阶段 5: UI 组件
6. ✅ 阶段 6: 主页面
7. ✅ 阶段 7: 样式优化
8. ✅ 阶段 8: 测试与优化

## 注意事项

- 每个阶段完成后进行代码审查
- 确保类型安全，避免使用 any
- 遵循 constitution.md 中的约束条件
- 保持代码简洁和可维护性
- 及时提交代码变更
