/**
 * 计时器模式类型
 */
export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

/**
 * 计时器状态接口
 */
export interface TimerState {
    /** 当前模式 */
    mode: TimerMode;
    /** 剩余时间（秒） */
    timeRemaining: number;
    /** 是否正在运行 */
    isRunning: boolean;
    /** 是否暂停 */
    isPaused: boolean;
    /** 已完成的番茄钟数量 */
    completedPomodoros: number;
    /** 当前循环次数 */
    currentCycle: number;
}

/**
 * 计时器设置接口
 */
export interface TimerSettings {
    /** 工作时长（分钟），默认 25 */
    workDuration: number;
    /** 短休息时长（分钟），默认 5 */
    shortBreakDuration: number;
    /** 长休息时长（分钟），默认 15 */
    longBreakDuration: number;
    /** 长休息前的番茄钟数量，默认 4 */
    pomodorosUntilLongBreak: number;
    /** 是否自动开始休息 */
    autoStartBreaks: boolean;
    /** 是否自动开始番茄钟 */
    autoStartPomodoros: boolean;
}

/**
 * 统计数据接口
 */
export interface Statistics {
    /** 总完成番茄钟数 */
    totalPomodoros: number;
    /** 总工作时间（秒） */
    totalWorkTime: number;
    /** 今日完成番茄钟数 */
    todayPomodoros: number;
    /** 今日工作时间（秒） */
    todayWorkTime: number;
    /** 最后更新时间 ISO 8601 */
    lastUpdated: string;
}

/**
 * 默认计时器设置
 */
export const DEFAULT_SETTINGS: TimerSettings = {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    pomodorosUntilLongBreak: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
};

/**
 * 默认统计数据
 */
export const DEFAULT_STATISTICS: Statistics = {
    totalPomodoros: 0,
    totalWorkTime: 0,
    todayPomodoros: 0,
    todayWorkTime: 0,
    lastUpdated: new Date().toISOString(),
};
