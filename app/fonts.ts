import { Rowdies, Permanent_Marker, Inter } from 'next/font/google';

export const rowdies = Rowdies({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-rowdies',
});
export const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanentMarker',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});
