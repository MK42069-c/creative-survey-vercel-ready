/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background colors
        background: {
          primary: '#ffffff',
          surface: '#fafafa',
          divider: '#e5e5e5',
        },
        // Dark mode backgrounds
        'dark-background': {
          primary: '#0a0a0a',
          surface: '#1a1a1a',
          divider: '#2a2a2a',
        },
        // Text colors
        text: {
          primary: '#1a1a1a',
          secondary: '#525252',
          tertiary: '#a3a3a3',
        },
        // Dark mode text
        'dark-text': {
          primary: '#f5f5f5',
          secondary: '#a3a3a3',
          tertiary: '#737373',
        },
        // Brand colors
        brand: {
          primary: '#000000',
          hover: '#1a1a1a',
        },
        // Dark mode brand
        'dark-brand': {
          primary: '#f5f5f5',
          hover: '#e5e5e5',
        },
        // CTA colors
        cta: {
          primary: '#000000',
          hover: '#1a1a1a',
        },
        // Semantic colors
        semantic: {
          success: '#10b981',
          warning: '#f59e0b',
          info: '#3b82f6',
          danger: '#dc2626',
        },
        // Badge colors
        badge: {
          bg: '#f5f5f5',
          border: '#e5e5e5',
          text: '#525252',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-sm': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'price-lg': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.5' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'button-lg': ['16px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }],
        'button-md': ['15px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }],
        'badge': ['12px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '96px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'modal': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
      maxWidth: {
        'container': '1400px',
        'content': '800px',
        'hero': '1200px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}