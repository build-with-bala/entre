import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import ChatBot from '@/components/ChatBot';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASkify',
  description: 'got questions? we got answers!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <AppProvider>
          <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            {children}
            <ChatBot />
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
