import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';

const dotGothic16 = DotGothic16({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'TestSQL',
  description: 'Generated by create next app'
};

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang='en'>
      <body className={`${dotGothic16.className} text-[#5ac53f]`}>{children}</body>
    </html>
  );
}
