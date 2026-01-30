'use client';

import { useTimerStore } from '@/lib/store/timer-store';
import { formatWorkTime } from '@/lib/utils/time';

interface StatisticsProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Statistics({ isOpen, onClose }: StatisticsProps) {
    const statistics = useTimerStore((state) => state.statistics);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">统计数据</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-6">
                    {/* 今日统计 */}
                    <div className="bg-gradient-to-br from-work-500 to-work-600 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4 opacity-90">今日</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-3xl font-bold">{statistics.todayPomodoros}</div>
                                <div className="text-sm opacity-75">番茄钟</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">{formatWorkTime(statistics.todayWorkTime)}</div>
                                <div className="text-sm opacity-75">工作时间</div>
                            </div>
                        </div>
                    </div>

                    {/* 总计统计 */}
                    <div className="bg-gradient-to-br from-longBreak-500 to-longBreak-600 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-semibold mb-4 opacity-90">总计</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-3xl font-bold">{statistics.totalPomodoros}</div>
                                <div className="text-sm opacity-75">番茄钟</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">{formatWorkTime(statistics.totalWorkTime)}</div>
                                <div className="text-sm opacity-75">工作时间</div>
                            </div>
                        </div>
                    </div>

                    {/* 最后更新时间 */}
                    <div className="text-center text-sm text-gray-500">
                        最后更新: {new Date(statistics.lastUpdated).toLocaleString('zh-CN')}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                >
                    关闭
                </button>
            </div>
        </div>
    );
}
