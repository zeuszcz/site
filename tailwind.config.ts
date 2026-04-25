import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF8F5',
        surface: '#FFFFFF',
        surface2: '#F5F2EC',
        line: '#E8E4DE',
        fg: '#141414',
        muted: '#5C5C5C',
        accent: '#2B2B2B',
        accent2: '#8B2F2F',
        olive: '#8B9258',
        'olive-soft': '#EFEEC8',
        'olive-line': '#D8D6A8',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
