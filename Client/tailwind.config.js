/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'andada': ['Andada Pro', 'serif'],
      },
      colors: {
        primary: '#17bf9e',
        secondary: '#0a2b1e',
      },
    },
  },
  plugins: [],
}