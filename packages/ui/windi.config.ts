import { defineConfig } from 'windicss/helpers';
import { kebabCase } from './src/utils/string.utils';
import { colors } from './src/vars/colors';
import { fonts } from './src/vars/fonts';

export default defineConfig({
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.tsx',
  ],
  safelist: [
    Object.keys(colors).map(key => `bg-${kebabCase(key)}`),
    Object.keys(colors).map(key => `border-${kebabCase(key)}`),
    Object.keys(colors).map(key => `text-${kebabCase(key)}`),
    Object.keys(fonts).map(key => `font-${kebabCase(key)}`),
    'font-light',
    'font-normal',
    'font-semibold',
    'text-left',
    'text-center',
    'text-right',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      separator: 'var(--color-separator)',
      white: 'var(--color-white)',
      'gray-1': 'var(--color-gray-1)',
      'gray-2': 'var(--color-gray-2)',
      'gray-3': 'var(--color-gray-3)',
      'gray-4': 'var(--color-gray-4)',
      'gray-5': 'var(--color-gray-5)',
      'gray-6': 'var(--color-gray-6)',
      red: 'var(--color-red)',
      green: 'var(--color-green)',
      blue: 'var(--color-blue)',
    },
    gradientColorStops: {
      'blue-start': '#1D61EF',
      'blue-stop': '#19D5FD',
    },
    boxShadow: {
      DEFAULT: '0 2px 12px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
});

