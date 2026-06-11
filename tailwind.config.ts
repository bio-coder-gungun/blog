import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        'arm-math': '#4338CA',
        'arm-bio': '#0F766E',
        'arm-tools': '#E11D48',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#f1f5f9',
              borderRadius: '0.25rem',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              fontWeight: '400',
              fontSize: '0.875em',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
