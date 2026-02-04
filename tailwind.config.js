
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00D4AA',
          dark: '#00B894',
          light: '#00FFD1'
        },
        secondary: {
          DEFAULT: '#0099FF',
          dark: '#0077CC',
          light: '#33AAFF'
        },
        navy: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          lighter: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
