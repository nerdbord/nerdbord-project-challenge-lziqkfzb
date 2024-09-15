import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { rowdies, permanentMarker, inter } from './fonts';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Smartform',
  description: 'Generate your own form in 30s with AI helping',
  icons: {
    icon: './icon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#7F56D9', fontSize: '1rem', spacingUnit: '1.3rem' },
      }}
    >
      <html lang="en">
        <body
          className={`${inter.className} ${rowdies.variable} ${permanentMarker.variable} ${inter.variable} bg-gray-light font-light`}
        >
          <div
            className="relative mx-auto flex min-h-screen flex-col bg-white py-[34px] sm:max-w-[450px]"
            id="modalRoot"
          >
            {children}
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
