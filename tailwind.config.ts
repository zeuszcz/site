import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF8F5',        // linen
        surface: '#FFFFFF',    // cards
        surface2: '#F5F2EC',   // subtle off-cream
        line: '#E8E4DE',       // hairline
        fg: '#141414',         // ink
        muted: '#5C5C5C',      // secondary
        accent: '#2B2B2B',     // graphite
        accent2: '#8B2F2F',    // warm warning (used sparingly)
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
