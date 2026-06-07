/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0D0D0D',
          2: '#141414',
          3: '#1C1C1C',
          4: '#242424',
          5: '#2E2E2E',
        },
        bronze: {
          DEFAULT: '#B87333',
          light: '#D4A574',
          dark: '#8B5E2A',
        },
        ivory: {
          DEFAULT: '#F5F0E8',
          dim: '#C8C0B0',
          muted: '#8A8070',
          dimmed: '#5A5248',
        },
        wisdom: '#7F77DD',
        courage: '#E24B4A',
        justice: '#1D9E75',
        temperance: '#EF9F27',
        impact: {
          'pos-bg': '#1A2E20',
          'pos-text': '#4ECB84',
          'pos-border': '#1F4028',
          'neg-bg': '#2E1A1A',
          'neg-text': '#E24B4A',
          'neg-border': '#401F1F',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in forwards',
        'fade-out': 'fadeOut 150ms ease-out forwards',
        'float-up': 'floatUp 800ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'arena-enter': 'arenaEnter 300ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '15%': { opacity: '1', transform: 'translateY(0)' },
          '75%': { opacity: '1', transform: 'translateY(-4px)' },
          '100%': { opacity: '0', transform: 'translateY(-12px)' },
        },
        arenaEnter: {
          '0%': { opacity: '0', transform: 'translateX(4px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
