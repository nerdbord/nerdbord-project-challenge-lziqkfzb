import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { rowdies, permanentMarker, inter } from './fonts';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${rowdies.variable} ${permanentMarker.variable} ${inter.variable} bg-gray-500 font-light`}
      >
        <div className="Breakpoint prefix Minimum width CSS relative mx-auto flex min-h-screen flex-col justify-between bg-white py-[34px] sm:max-w-[450px]">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
