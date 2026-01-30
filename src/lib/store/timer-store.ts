import { create } from 'zustand';
import { TimerState, TimerSettings, Statistics, TimerMode, DEFAULT_SETTINGS } from '@/types/timer';
import { minutesToSeconds } from '@/lib/utils/time';
import { saveSettings, loadSettings, saveStatistics, loadStatistics } from '@/lib/utils/storage';

interface TimerStore extends TimerState {
    settings: TimerSettings;
    statistics: Statistics;

    // 计时器控制方法
    start: () => void;
    pause: () => void;
    reset: () => void;
    skip: () => void;
    tick: () => void;

    // 设置管理方法
    updateSettings: (settings: Partial<TimerSettings>) => void;

    // 内部方法
    switchMode: (mode: TimerMode) => void;
    completePomodoro: () => void;
    initializeFromStorage: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
    // 初始状态
    mode: 'work',
    timeRemaining: minutesToSeconds(DEFAULT_SETTINGS.workDuration),
    isRunning: false,
    isPaused: false,
    completedPomodoros: 0,
    currentCycle: 1,
    settings: DEFAULT_SETTINGS,
    statistics: loadStatistics(),

    // 开始计时器
    start: () => {
        set({ isRunning: true, isPaused: false });
    },

    // 暂停计时器
    pause: () => {
        set({ isRunning: false, isPaused: true });
    },

    // 重置计时器
    reset: () => {
        const { mode, settings } = get();
        const duration = mode === 'work'
            ? settings.workDuration
            : mode === 'shortBreak'
                ? settings.shortBreakDuration
                : settings.longBreakDuration;

        set({
            timeRemaining: minutesToSeconds(duration),
            isRunning: false,
            isPaused: false,
        });
    },

    // 跳过当前阶段
    skip: () => {
        const { mode, settings, completedPomodoros } = get();

        if (mode === 'work') {
            // 工作完成，切换到休息
            const newCompletedPomodoros = completedPomodoros + 1;
            const shouldLongBreak = newCompletedPomodoros % settings.pomodorosUntilLongBreak === 0;
            const newMode: TimerMode = shouldLongBreak ? 'longBreak' : 'shortBreak';

            get().completePomodoro();
            get().switchMode(newMode);

            if (settings.autoStartBreaks) {
                get().start();
            }
        } else {
            // 休息完成，切换到工作
            get().switchMode('work');

            if (settings.autoStartPomodoros) {
                get().start();
            }
        }
    },

    // 每秒执行一次
    tick: () => {
        const { timeRemaining, isRunning } = get();

        if (!isRunning) return;

        if (timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
        } else {
            // 时间到，触发完成逻辑
            get().skip();
        }
    },

    // 切换模式
    switchMode: (mode: TimerMode) => {
        const { settings } = get();
        const duration = mode === 'work'
            ? settings.workDuration
            : mode === 'shortBreak'
                ? settings.shortBreakDuration
                : settings.longBreakDuration;

        set({
            mode,
            timeRemaining: minutesToSeconds(duration),
            isRunning: false,
            isPaused: false,
        });
    },

    // 完成一个番茄钟
    completePomodoro: () => {
        const { completedPomodoros, statistics, settings } = get();
        const workDuration = minutesToSeconds(settings.workDuration);

        const newStatistics: Statistics = {
            totalPomodoros: statistics.totalPomodoros + 1,
            totalWorkTime: statistics.totalWorkTime + workDuration,
            todayPomodoros: statistics.todayPomodoros + 1,
            todayWorkTime: statistics.todayWorkTime + workDuration,
            lastUpdated: new Date().toISOString(),
        };

        set({
            completedPomodoros: completedPomodoros + 1,
            statistics: newStatistics,
        });

        saveStatistics(newStatistics);
    },

    // 更新设置
    updateSettings: (newSettings: Partial<TimerSettings>) => {
        const { settings, mode } = get();
        const updatedSettings = { ...settings, ...newSettings };

        set({ settings: updatedSettings });
        saveSettings(updatedSettings);

        // 如果计时器未运行，更新当前模式的时间
        const { isRunning } = get();
        if (!isRunning) {
            const duration = mode === 'work'
                ? updatedSettings.workDuration
                : mode === 'shortBreak'
                    ? updatedSettings.shortBreakDuration
                    : updatedSettings.longBreakDuration;

            set({ timeRemaining: minutesToSeconds(duration) });
        }
    },

    // 从 localStorage 初始化
    initializeFromStorage: () => {
        const settings = loadSettings();
        const statistics = loadStatistics();

        set({
            settings,
            statistics,
            timeRemaining: minutesToSeconds(settings.workDuration),
        });
    },
}));
