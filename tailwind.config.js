/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f8f9f7',
          100: '#f0f2ee',
          200: '#e1e5db',
          300: '#ccd4c2',
          400: '#b1bda3',
          500: '#9aab88',
          600: '#7d8b6f',
          700: '#647059',
          800: '#525c49',
          900: '#454d3d',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf8f4',
          200: '#f4f1ea',
          300: '#ebe6db',
          400: '#ddd5c6',
          500: '#ccc1ad',
          600: '#b5a690',
          700: '#968872',
          800: '#7a6e5c',
          900: '#65594a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}