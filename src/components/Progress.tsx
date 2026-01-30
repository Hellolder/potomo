'use client';

import { useTimerStore } from '@/lib/store/timer-store';

export default function Progress() {
    const completedPomodoros = useTimerStore((state) => state.completedPomodoros);
    const currentCycle = useTimerStore((state) => state.currentCycle);
    const settings = useTimerStore((state) => state.settings);
    const mode = useTimerStore((state) => state.mode);

    // 计算当前循环中的进度
    const cycleProgress = completedPomodoros % settings.pomodorosUntilLongBreak;

    // 根据模式选择颜色
    const getProgressColor = () => {
        switch (mode) {
            case 'work':
                return 'bg-work-500';
            case 'shortBreak':
                return 'bg-shortBreak-500';
            case 'longBreak':
                return 'bg-longBreak-500';
        }
    };

    const progressColor = getProgressColor();

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">进度</h3>
                <span className="text-sm opacity-75">
                    {cycleProgress} / {settings.pomodorosUntilLongBreak}
                </span>
            </div>

            {/* 进度条 */}
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden mb-4">
                <div
                    className={`${progressColor} h-full transition-all duration-500 rounded-full`}
                    style={{ width: `${(cycleProgress / settings.pomodorosUntilLongBreak) * 100}%` }}
                />
            </div>

            {/* 番茄钟指示器 */}
            <div className="flex gap-2 justify-center">
                {Array.from({ length: settings.pomodorosUntilLongBreak }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index < cycleProgress
                                ? progressColor
                                : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>

            <div className="mt-4 text-center text-sm opacity-75">
                总完成: {completedPomodoros} 个番茄钟
            </div>
        </div>
    );
}
