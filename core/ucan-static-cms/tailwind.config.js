/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{jsx,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

