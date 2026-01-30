import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/lib/store/timer-store';

/**
 * 计时器 Hook
 * 处理倒计时逻辑和生命周期
 */
export function useTimer() {
    const tick = useTimerStore((state) => state.tick);
    const isRunning = useTimerStore((state) => state.isRunning);
    const initializeFromStorage = useTimerStore((state) => state.initializeFromStorage);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // 组件挂载时从 localStorage 初始化
    useEffect(() => {
        initializeFromStorage();
    }, [initializeFromStorage]);

    // 设置定时器
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                tick();
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, tick]);

    return {
        // 可以在这里返回额外的辅助方法或计算值
    };
}
