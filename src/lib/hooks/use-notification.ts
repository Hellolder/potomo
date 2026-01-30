import { useEffect, useState } from 'react';
import { useTimerStore } from '@/lib/store/timer-store';
import { TimerMode } from '@/types/timer';

/**
 * 通知 Hook
 * 处理浏览器通知权限和发送通知
 */
export function useNotification() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const mode = useTimerStore((state) => state.mode);
    const timeRemaining = useTimerStore((state) => state.timeRemaining);
    const prevTimeRef = useState(timeRemaining)[0];

    // 请求通知权限
    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);

            if (Notification.permission === 'default') {
                Notification.requestPermission().then((perm) => {
                    setPermission(perm);
                });
            }
        }
    }, []);

    // 监听模式切换并发送通知
    useEffect(() => {
        // 只在时间从 1 变为 0 时触发（即计时器完成）
        if (prevTimeRef === 1 && timeRemaining === 0) {
            sendNotification(mode);
        }
    }, [timeRemaining, mode, prevTimeRef]);

    const sendNotification = (currentMode: TimerMode) => {
        if (permission !== 'granted') return;

        let title = '';
        let body = '';

        if (currentMode === 'work') {
            title = '🎉 工作完成！';
            body = '是时候休息一下了！';
        } else {
            title = '⏰ 休息结束！';
            body = '准备开始新的番茄钟吧！';
        }

        new Notification(title, {
            body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
        });
    };

    const requestPermission = async () => {
        if ('Notification' in window) {
            const perm = await Notification.requestPermission();
            setPermission(perm);
            return perm;
        }
        return 'denied';
    };

    return {
        permission,
        requestPermission,
        sendNotification,
    };
}
