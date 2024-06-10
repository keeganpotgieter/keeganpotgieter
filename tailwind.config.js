/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,mdx}'],
  darkMode: true,
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      colors: {
        border: 'hsl(var(--sc-border))',
        input: 'hsl(var(--sc-input))',
        ring: 'hsl(var(--sc-ring))',
        background: 'hsl(var(--sc-background))',
        foreground: 'hsl(var(--sc-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--sc-primary))',
          foreground: 'hsl(var(--sc-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--sc-secondary))',
          foreground: 'hsl(var(--sc-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--sc-destructive))',
          foreground: 'hsl(var(--sc-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--sc-muted))',
          foreground: 'hsl(var(--sc-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--sc-accent))',
          foreground: 'hsl(var(--sc-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--sc-popover))',
          foreground: 'hsl(var(--sc-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--sc-card))',
          foreground: 'hsl(var(--sc-card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--sc-radius)',
        md: 'calc(var(--sc-radius) - 2px)',
        sm: 'calc(var(--sc-radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
