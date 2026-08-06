
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Email Verification Theme (#01EFBB)
        email: {
          DEFAULT: '#01EFBB',
          light: '#65F7D7',
          lighter: '#E6FDF8',
          dark: '#00C49A',
          darker: '#008B6D',
        },
        // ICP Validation Theme (#0393F7)
        icp: {
          DEFAULT: '#0393F7',
          light: '#62B8FA',
          lighter: '#EBF6FE',
          dark: '#0277C6',
          darker: '#015793',
        },
        // Semantic Brand Mapping
        primary: {
          DEFAULT: '#01EFBB',
          dark: '#00C49A',
          light: '#65F7D7',
        },
        secondary: {
          DEFAULT: '#0393F7',
          dark: '#0277C6',
          light: '#62B8FA',
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
