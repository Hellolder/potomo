import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pomodoro Antigravity - 番茄钟计时器',
    description: '一个现代化的番茄工作法计时器，帮助你提高工作效率',
    keywords: ['番茄钟', 'Pomodoro', '计时器', '效率工具'],
    authors: [{ name: 'Pomodoro Antigravity' }],
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#ef4444',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
