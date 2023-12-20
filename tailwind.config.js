/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bunny: {
          100: '#DDCBFF',
          200: '#BB98FF',
          300: '#8A2BE2',
          400: '#4A1E9E',
          500: '#C92E6F'
        },
      },
    },
  },
  plugins: [],
}

