import { TimerSettings, Statistics, DEFAULT_SETTINGS, DEFAULT_STATISTICS } from '@/types/timer';

const SETTINGS_KEY = 'pomodoro-settings';
const STATISTICS_KEY = 'pomodoro-statistics';

/**
 * 保存计时器设置到 localStorage
 * @param settings - 计时器设置
 */
export function saveSettings(settings: TimerSettings): void {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
}

/**
 * 从 localStorage 加载计时器设置
 * @returns 计时器设置或 null
 */
export function loadSettings(): TimerSettings {
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            return JSON.parse(stored) as TimerSettings;
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
    }
    return DEFAULT_SETTINGS;
}

/**
 * 保存统计数据到 localStorage
 * @param statistics - 统计数据
 */
export function saveStatistics(statistics: Statistics): void {
    try {
        localStorage.setItem(STATISTICS_KEY, JSON.stringify(statistics));
    } catch (error) {
        console.error('Failed to save statistics:', error);
    }
}

/**
 * 从 localStorage 加载统计数据
 * @returns 统计数据或 null
 */
export function loadStatistics(): Statistics {
    try {
        const stored = localStorage.getItem(STATISTICS_KEY);
        if (stored) {
            const stats = JSON.parse(stored) as Statistics;

            // 检查是否是新的一天，如果是则重置今日数据
            const lastUpdated = new Date(stats.lastUpdated);
            const today = new Date();

            if (!isSameDay(lastUpdated, today)) {
                return {
                    ...stats,
                    todayPomodoros: 0,
                    todayWorkTime: 0,
                    lastUpdated: today.toISOString(),
                };
            }

            return stats;
        }
    } catch (error) {
        console.error('Failed to load statistics:', error);
    }
    return DEFAULT_STATISTICS;
}

/**
 * 检查两个日期是否是同一天
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 是否是同一天
 */
function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * 清除所有存储的数据
 */
export function clearAllData(): void {
    try {
        localStorage.removeItem(SETTINGS_KEY);
        localStorage.removeItem(STATISTICS_KEY);
    } catch (error) {
        console.error('Failed to clear data:', error);
    }
}
