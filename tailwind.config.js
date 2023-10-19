/* eslint-disable no-undef */
const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        hkgrotesk: ['var(--font-hkgrotesk)', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
