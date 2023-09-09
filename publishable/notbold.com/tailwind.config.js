const typographyPlugin = require('@tailwindcss/typography')

const typographyStyles = require('./typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  plugins: [typographyPlugin],
  theme: {
    fontSize: {
      xs: ['13px', { lineHeight: '24px' }],
      sm: ['14px', { lineHeight: '24px' }],
      base: ['16px', { lineHeight: '28px' }],
      lg: ['18px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '32px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
      '4xl': ['32px', { lineHeight: '40px' }],
      '5xl': ['48px', { lineHeight: '56px' }],
      '6xl': ['60px', { lineHeight: '16px' }],
      '7xl': ['72px', { lineHeight: '16px' }],
      '8xl': ['96px', { lineHeight: '16px' }],
      '9xl': ['128px', { lineHeight: '16px' }],
    },
    typography: typographyStyles,
  },
}
