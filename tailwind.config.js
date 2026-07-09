/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        playing: {
          '0%, 100%': { transform: 'scaleY(0.1)' },
          '33%': { transform: 'scaleY(0.6)' },
          '66%': { transform: 'scaleY(0.9)' },
        }
      }
    },
  },
  plugins: [],
}