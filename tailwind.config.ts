import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#03180F',
          900: '#052A1D',
          800: '#073B29',
          700: '#0A5238',
          600: '#0D6A48',
          500: '#12855A',
          400: '#2FA274',
          300: '#6FC3A0',
          200: '#A9DCC5',
          100: '#D8F0E5',
          50: '#EEF9F4',
        },
        gold: {
          900: '#6B5312',
          800: '#8C6D18',
          700: '#A9851E',
          600: '#C29A28',
          500: '#D4AF37',
          400: '#E0C25F',
          300: '#EBD48F',
          200: '#F3E5BE',
          100: '#F9F2DC',
        },
        ivory: {
          DEFAULT: '#FBF9F4',
          100: '#FDFCF9',
          200: '#F6F2E9',
          300: '#EDE7D9',
        },
        charcoal: {
          DEFAULT: '#2E3130',
          light: '#565B59',
          muted: '#7C817F',
          dark: '#1A1C1B',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
        wide2: '0.08em',
      },
      maxWidth: {
        container: '80rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(3,24,15,0.04), 0 12px 32px -12px rgba(3,24,15,0.16)',
        cardHover: '0 2px 4px rgba(3,24,15,0.06), 0 28px 60px -20px rgba(3,24,15,0.28)',
        gold: '0 10px 30px -12px rgba(212,175,55,0.55)',
      },
      backgroundImage: {
        'emerald-deep':
          'linear-gradient(135deg, #03180F 0%, #052A1D 45%, #073B29 100%)',
        'gold-sheen':
          'linear-gradient(100deg, #A9851E 0%, #D4AF37 40%, #F3E5BE 55%, #D4AF37 70%, #A9851E 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'draw-line': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.9s ease-out both',
        'slow-zoom': 'slow-zoom 18s ease-out forwards',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
