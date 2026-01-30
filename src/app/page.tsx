'use client';

import { useState } from 'react';
import Timer from '@/components/Timer';
import Controls from '@/components/Controls';
import Progress from '@/components/Progress';
import Settings from '@/components/Settings';
import Statistics from '@/components/Statistics';
import { useTimer } from '@/lib/hooks/use-timer';
import { useNotification } from '@/lib/hooks/use-notification';
import { useTimerStore } from '@/lib/store/timer-store';

export default function Home() {
    const [showSettings, setShowSettings] = useState(false);
    const [showStatistics, setShowStatistics] = useState(false);
    const mode = useTimerStore((state) => state.mode);

    // 初始化计时器和通知
    useTimer();
    useNotification();

    // 根据模式选择背景颜色
    const getBackgroundGradient = () => {
        switch (mode) {
            case 'work':
                return 'from-work-400 via-work-500 to-work-600';
            case 'shortBreak':
                return 'from-shortBreak-400 via-shortBreak-500 to-shortBreak-600';
            case 'longBreak':
                return 'from-longBreak-400 via-longBreak-500 to-longBreak-600';
        }
    };

    return (
        <main className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 p-8`}>
            <div className="max-w-4xl mx-auto">
                {/* 头部 */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-2">🍅 Pomodoro</h1>
                    <p className="text-white/80 text-lg">专注工作，高效休息</p>
                </header>

                {/* 主要内容区域 */}
                <div className="space-y-8">
                    {/* 计时器 */}
                    <div className="flex justify-center">
                        <Timer />
                    </div>

                    {/* 控制按钮 */}
                    <Controls />

                    {/* 进度显示 */}
                    <div className="max-w-md mx-auto">
                        <Progress />
                    </div>

                    {/* 底部按钮 */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                            ⚙️ 设置
                        </button>
                        <button
                            onClick={() => setShowStatistics(true)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                            📊 统计
                        </button>
                    </div>
                </div>

                {/* 页脚 */}
                <footer className="text-center mt-16 text-white/60 text-sm">
                    <p>使用番茄工作法提高你的工作效率</p>
                    <p className="mt-2">25分钟专注 + 5分钟休息 = 高效工作</p>
                </footer>
            </div>

            {/* 模态框 */}
            <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
            <Statistics isOpen={showStatistics} onClose={() => setShowStatistics(false)} />
        </main>
    );
}
