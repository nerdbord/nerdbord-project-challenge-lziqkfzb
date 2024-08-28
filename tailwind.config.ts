import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import tailwindcssSignals from 'tailwindcss-signals';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#7F56D9',
        'brand-light': '#B69BF2',
        'brand-highlight': '#D6BBFB',
        'brand-disabled': '#E9D7FE',
        black: '#0F1726',
        'black-system': '#000000EB',
        'black-modal': '#0F1726B2',
        jeans: '#475467',
        'jeans-light': '#667085',
        'jeans-dark': '#344054',
        gray: '#D0D5DD',
        'gray-light': '#F3F3F3',
        'gray-dark': '#9A98A4',
        white: '#FFF',
        green: '#7DE5B1',
      },
      fontFamily: {},
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1125px',
          xl: '1125px',
          '2xl': '1125px',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '&>*');
    }),
    tailwindcssSignals,
  ],
};
export default config;
