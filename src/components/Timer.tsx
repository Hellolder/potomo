'use client';

import { useTimerStore } from '@/lib/store/timer-store';
import { formatTime } from '@/lib/utils/time';

export default function Timer() {
    const mode = useTimerStore((state) => state.mode);
    const timeRemaining = useTimerStore((state) => state.timeRemaining);

    // 根据模式选择颜色主题
    const getThemeColors = () => {
        switch (mode) {
            case 'work':
                return {
                    bg: 'bg-gradient-to-br from-work-500 to-work-700',
                    text: 'text-work-50',
                    glow: 'shadow-work-500/50',
                };
            case 'shortBreak':
                return {
                    bg: 'bg-gradient-to-br from-shortBreak-500 to-shortBreak-700',
                    text: 'text-shortBreak-50',
                    glow: 'shadow-shortBreak-500/50',
                };
            case 'longBreak':
                return {
                    bg: 'bg-gradient-to-br from-longBreak-500 to-longBreak-700',
                    text: 'text-longBreak-50',
                    glow: 'shadow-longBreak-500/50',
                };
        }
    };

    const getModeLabel = () => {
        switch (mode) {
            case 'work':
                return '工作时间';
            case 'shortBreak':
                return '短休息';
            case 'longBreak':
                return '长休息';
        }
    };

    const colors = getThemeColors();

    return (
        <div className={`${colors.bg} ${colors.text} rounded-3xl p-12 shadow-2xl ${colors.glow} transition-all duration-500`}>
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-8 opacity-90">
                    {getModeLabel()}
                </h2>
                <div className="text-8xl font-bold tracking-wider mb-4 font-mono">
                    {formatTime(timeRemaining)}
                </div>
            </div>
        </div>
    );
}
