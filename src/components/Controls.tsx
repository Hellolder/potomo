'use client';

import { useTimerStore } from '@/lib/store/timer-store';

export default function Controls() {
    const isRunning = useTimerStore((state) => state.isRunning);
    const isPaused = useTimerStore((state) => state.isPaused);
    const start = useTimerStore((state) => state.start);
    const pause = useTimerStore((state) => state.pause);
    const reset = useTimerStore((state) => state.reset);
    const skip = useTimerStore((state) => state.skip);
    const mode = useTimerStore((state) => state.mode);

    // 根据模式选择按钮颜色
    const getButtonColors = () => {
        switch (mode) {
            case 'work':
                return {
                    primary: 'bg-work-600 hover:bg-work-700 active:bg-work-800',
                    secondary: 'bg-work-500/20 hover:bg-work-500/30 active:bg-work-500/40',
                };
            case 'shortBreak':
                return {
                    primary: 'bg-shortBreak-600 hover:bg-shortBreak-700 active:bg-shortBreak-800',
                    secondary: 'bg-shortBreak-500/20 hover:bg-shortBreak-500/30 active:bg-shortBreak-500/40',
                };
            case 'longBreak':
                return {
                    primary: 'bg-longBreak-600 hover:bg-longBreak-700 active:bg-longBreak-800',
                    secondary: 'bg-longBreak-500/20 hover:bg-longBreak-500/30 active:bg-longBreak-500/40',
                };
        }
    };

    const colors = getButtonColors();

    const handleStartPause = () => {
        if (isRunning) {
            pause();
        } else {
            start();
        }
    };

    return (
        <div className="flex gap-4 justify-center items-center">
            {/* 开始/暂停按钮 */}
            <button
                onClick={handleStartPause}
                className={`${colors.primary} text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`}
            >
                {isRunning ? '⏸ 暂停' : isPaused ? '▶ 继续' : '▶ 开始'}
            </button>

            {/* 重置按钮 */}
            <button
                onClick={reset}
                className={`${colors.secondary} text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95`}
            >
                ↻ 重置
            </button>

            {/* 跳过按钮 */}
            <button
                onClick={skip}
                className={`${colors.secondary} text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95`}
            >
                ⏭ 跳过
            </button>
        </div>
    );
}
