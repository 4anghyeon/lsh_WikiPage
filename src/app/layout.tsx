import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/layout/Header';
import { ReactNode } from 'react';
import Provider from '@/app/shared/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CODINGHUB WIKI',
  description: '코딩허브 위키 페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <Provider>
          <main className="mt-20">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
