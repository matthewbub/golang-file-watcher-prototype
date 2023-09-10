/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        adelle: ['adelle-sans', 'sans-serif'],
        adellecondensed: ['adelle-sans-condensed', 'sans-serif'],
        sourcecode: ['source-code-pro', 'monospace'],
        miller: ['miller-text', 'serif'],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

