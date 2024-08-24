/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.html"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dracula"],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

