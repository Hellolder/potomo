/**
 * 将秒数格式化为 MM:SS 格式
 * @param seconds - 秒数
 * @returns 格式化后的时间字符串
 */
export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}

/**
 * 将分钟转换为秒
 * @param minutes - 分钟数
 * @returns 秒数
 */
export function minutesToSeconds(minutes: number): number {
    return minutes * 60;
}

/**
 * 将秒数转换为分钟（向上取整）
 * @param seconds - 秒数
 * @returns 分钟数
 */
export function secondsToMinutes(seconds: number): number {
    return Math.ceil(seconds / 60);
}

/**
 * 格式化工作时间为易读格式
 * @param seconds - 秒数
 * @returns 格式化后的时间字符串（如 "2h 30m" 或 "45m"）
 */
export function formatWorkTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
}
