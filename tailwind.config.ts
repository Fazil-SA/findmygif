import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        accent: {
          400: '#f0abfc',
          500: '#e879f9',
          600: '#d946ef',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-accent': '0 0 20px rgba(217, 70, 239, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fadeInUp': 'fadeInUp 0.4s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
