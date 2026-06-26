/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAFA',
        surface: '#FFFFFF',
        border: {
          DEFAULT: '#E5E5E5',
          hover: '#CBCBCB',
        },
        ink: {
          primary: '#0A0A0A',
          secondary: '#6B6B6B',
          muted: '#A1A1A1',
        },
        destructive: '#DC2626',
        success: '#16A34A',
        // legacy `primary` aliases kept grayscale so untouched pages stay on-system
        primary: {
          50: '#fafafa',
          100: '#f0f0f0',
          200: '#e5e5e5',
          300: '#cbcbcb',
          400: '#a1a1a1',
          500: '#6b6b6b',
          600: '#404040',
          700: '#1a1a1a',
          800: '#0a0a0a',
          900: '#0a0a0a',
          950: '#000000',
        },
        accent: {
          DEFAULT: '#0A0A0A',
          hover: '#1A1A1A',
          fg: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['64px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-sm': ['40px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        h1: ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['28px', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '500' }],
      },
      borderRadius: {
        none: '0px',
        sm: '10px',
        DEFAULT: '12px',
        md: '14px',
        lg: '20px',
        xl: '26px',
        '2xl': '32px',
        '3xl': '40px',
        btn: '16px',
        card: '28px',
        pill: '999px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        dropdown: '0 8px 32px rgba(0,0,0,0.12)',
        popover: '0 8px 32px rgba(0,0,0,0.12)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'chevron-pulse': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(4px)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 1.5s infinite linear',
        'chevron-pulse': 'chevron-pulse 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
