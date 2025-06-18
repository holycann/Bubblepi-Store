/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Poppins', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    extend: {
      colors: {
        'pink-soft': '#F4ABC4',
        'purple-dark': '#595B83',
        'navy': '#333456',
        'blue-dark': '#060930',
      },
      backgroundColor: {
        'dark': '#121212',
        'dark-card': '#1E1E1E',
        'dark-elevated': '#2D2D2D',
      },
      textColor: {
        'dark-primary': '#F9FAFB',
        'dark-secondary': '#D1D5DB',
        'dark-muted': '#9CA3AF',
      },
      ringColor: {
        'dark-accent': '#F4ABC4',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        'default': '150ms',
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
        'slower': '500ms',
        'animation': '1000ms',
      },
    },
  },
  plugins: [daisyui],
}; 