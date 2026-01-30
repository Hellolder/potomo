'use client';

import { useState } from 'react';
import { useTimerStore } from '@/lib/store/timer-store';
import { TimerSettings } from '@/types/timer';

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
    const settings = useTimerStore((state) => state.settings);
    const updateSettings = useTimerStore((state) => state.updateSettings);

    const [localSettings, setLocalSettings] = useState<TimerSettings>(settings);

    if (!isOpen) return null;

    const handleSave = () => {
        updateSettings(localSettings);
        onClose();
    };

    const handleCancel = () => {
        setLocalSettings(settings);
        onClose();
    };

    const handleChange = (key: keyof TimerSettings, value: number | boolean) => {
        setLocalSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">设置</h2>

                <div className="space-y-6">
                    {/* 时长设置 */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">时长设置（分钟）</h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-gray-600">工作时长</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={localSettings.workDuration}
                                    onChange={(e) => handleChange('workDuration', parseInt(e.target.value))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-work-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-gray-600">短休息时长</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={localSettings.shortBreakDuration}
                                    onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shortBreak-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-gray-600">长休息时长</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={localSettings.longBreakDuration}
                                    onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-longBreak-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-gray-600">长休息前番茄钟数</label>
                                <input
                                    type="number"
                                    min="2"
                                    max="10"
                                    value={localSettings.pomodorosUntilLongBreak}
                                    onChange={(e) => handleChange('pomodorosUntilLongBreak', parseInt(e.target.value))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 自动开始设置 */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">自动开始</h3>

                        <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-gray-600">自动开始休息</span>
                                <input
                                    type="checkbox"
                                    checked={localSettings.autoStartBreaks}
                                    onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
                                    className="w-5 h-5 text-shortBreak-500 rounded focus:ring-2 focus:ring-shortBreak-500"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-gray-600">自动开始番茄钟</span>
                                <input
                                    type="checkbox"
                                    checked={localSettings.autoStartPomodoros}
                                    onChange={(e) => handleChange('autoStartPomodoros', e.target.checked)}
                                    className="w-5 h-5 text-work-500 rounded focus:ring-2 focus:ring-work-500"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* 按钮 */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                    >
                        取消
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 bg-work-500 hover:bg-work-600 text-white rounded-xl font-semibold transition-colors"
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}
