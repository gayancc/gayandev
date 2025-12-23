import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { PreferencesProvider } from '@/components/PreferencesProvider';
import { CustomCursor } from '@/components/CustomCursor';
import { SkipToContent } from '@/components/SkipToContent';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Gayan Ranasinghe | Technical Lead',
  description: 'Gayan Ranasinghe - Technical Lead and C# Developer portfolio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <PreferencesProvider>
          <SkipToContent />
          <CustomCursor />
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
