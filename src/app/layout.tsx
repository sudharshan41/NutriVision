import type { Metadata } from 'next';
import './globals.css';
import { UserProfileProvider } from '@/context/user-profile-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'NutriVision',
  description: 'AI and AR Integrated Nutrition Assistant',
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
      <body className="font-body antialiased">
        <UserProfileProvider>
          {children}
          <Toaster />
        </UserProfileProvider>
      </body>
    </html>
  );
}
