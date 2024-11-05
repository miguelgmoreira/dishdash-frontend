/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fff',
          dark: '#252529',
          gray: "#F2F2F2"
        },
        secondary: '#333333',
        brand: {
          DEFAULT: '#FF3C00',
          light: '',
          dark: ''
        },
        textPrimary: '#3E3E3E',
        textSecondary: ''
      }
    },
  },
  plugins: [
  ],
}