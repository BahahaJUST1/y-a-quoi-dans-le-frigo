/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7EC0C4',
        'primary-hover': '#70B9BE',
        'secondary': '#042628',
        'secondary-hover': '#031314',
        'third': '#545C5C',
        'fourth': '#F2FCFC'
      }
    },
  },
  plugins: [],
}