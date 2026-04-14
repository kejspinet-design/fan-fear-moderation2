/**
 * Root Layout
 * 
 * Wraps the application with AuthProvider and global styles.
 * 
 * **Validates: Requirements 5.1, 5.5**
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Fear Community Rules',
  description: 'Система правил модерации для фан-сообщества Fear',
  keywords: ['модерация', 'правила', 'Discord', 'Twitch', 'Fear'],
  authors: [{ name: 'Fear Community Team' }],
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider session={null}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}