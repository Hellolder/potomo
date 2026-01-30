# Specify - 详细的数据结构与逻辑定义

## 数据结构

### TimerState (计时器状态)
```typescript
interface TimerState {
  mode: 'work' | 'shortBreak' | 'longBreak';
  timeRemaining: number; // 剩余时间(秒)
  isRunning: boolean;
  isPaused: boolean;
  completedPomodoros: number; // 已完成的番茄钟数量
  currentCycle: number; // 当前循环次数
}
```

### TimerSettings (计时器设置)
```typescript
interface TimerSettings {
  workDuration: number; // 工作时长(分钟)，默认 25
  shortBreakDuration: number; // 短休息时长(分钟)，默认 5
  longBreakDuration: number; // 长休息时长(分钟)，默认 15
  pomodorosUntilLongBreak: number; // 长休息前的番茄钟数量，默认 4
  autoStartBreaks: boolean; // 是否自动开始休息
  autoStartPomodoros: boolean; // 是否自动开始番茄钟
}
```

### Statistics (统计数据)
```typescript
interface Statistics {
  totalPomodoros: number; // 总完成番茄钟数
  totalWorkTime: number; // 总工作时间(秒)
  todayPomodoros: number; // 今日完成番茄钟数
  todayWorkTime: number; // 今日工作时间(秒)
  lastUpdated: string; // 最后更新时间 ISO 8601
}
```

## 核心逻辑

### 计时器逻辑

#### 1. 初始化
- 默认模式为 `work`
- 根据设置初始化时间
- 状态为未运行

#### 2. 开始/暂停
- 开始：设置 `isRunning = true`，启动倒计时
- 暂停：设置 `isPaused = true`，保持当前时间

#### 3. 倒计时
- 每秒减少 `timeRemaining`
- 当 `timeRemaining === 0` 时触发完成逻辑

#### 4. 完成逻辑
```
如果当前模式是 'work':
  - completedPomodoros += 1
  - 更新统计数据
  - 如果 completedPomodoros % pomodorosUntilLongBreak === 0:
      切换到 'longBreak'
  - 否则:
      切换到 'shortBreak'
  - 如果 autoStartBreaks === true:
      自动开始休息
  - 否则:
      停止计时器

如果当前模式是 'shortBreak' 或 'longBreak':
  - 切换到 'work'
  - 如果 autoStartPomodoros === true:
      自动开始工作
  - 否则:
      停止计时器
```

#### 5. 重置
- 停止计时器
- 重置到初始状态
- 保持当前模式

#### 6. 跳过
- 立即触发完成逻辑
- 切换到下一个模式

### 持久化逻辑

#### LocalStorage 存储
- 使用 `localStorage` 存储设置和统计数据
- Key 命名规范：
  - `pomodoro-settings`: 计时器设置
  - `pomodoro-statistics`: 统计数据

#### 数据同步
- 组件挂载时从 localStorage 读取
- 设置变更时立即写入 localStorage
- 统计数据在番茄钟完成时更新

### 通知逻辑

#### 浏览器通知
- 请求通知权限
- 在计时器完成时发送通知
- 通知内容根据模式变化：
  - 工作完成 → "休息时间到了！"
  - 休息完成 → "开始新的番茄钟！"

#### 音频提示
- 播放提示音（可选）
- 用户可在设置中开启/关闭

## UI 交互规范

### 计时器显示
- 格式：`MM:SS`
- 大字体显示，易于阅读
- 不同模式使用不同颜色：
  - work: 红色系
  - shortBreak: 绿色系
  - longBreak: 蓝色系

### 控制按钮
- **开始/暂停**: 主要操作按钮
- **重置**: 次要操作按钮
- **跳过**: 次要操作按钮

### 进度指示
- 显示当前循环进度
- 显示已完成的番茄钟数量
- 可视化进度条或圆环

### 设置面板
- 模态框或侧边栏形式
- 实时预览设置变更
- 保存后立即生效
