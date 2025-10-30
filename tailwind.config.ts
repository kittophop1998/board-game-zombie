import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['var(--font-bebas)', 'sans-serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
        'bebas': ['var(--font-bebas)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Zombie theme colors
        'zombie': {
          'dark': 'var(--bg-base)',
          'container': 'var(--bg-container)',
          'primary': 'var(--color-primary)',
          'secondary': 'var(--color-secondary)',
        },
      },
      boxShadow: {
        'zombie': 'var(--shadow-primary)',
      },
      borderColor: {
        'zombie': 'var(--border-base)',
      },
    },
  },
  plugins: [],
}

export default config