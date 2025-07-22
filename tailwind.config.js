/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Colors for light mode
        'primary': '#3B82F6',
        'secondary': '#64748B',
        'accent': '#0EA5E9',
        'background': '#F8FAFC',
        'surface': '#FFFFFF',
        'error': '#EF4444',
        'success': '#10B981',
        'warning': '#F59E0B',
        'info': '#3B82F6',
        
        // Dark mode colors
        dark: {
          'primary': '#3B82F6',
          'secondary': '#9CA3AF',
          'accent': '#60A5FA',
          'background': '#111827',
          'surface': '#1F2937',
          'border': '#374151',
          'text': '#E5E7EB',
          'text-secondary': '#9CA3AF',
          'header': '#1E3A8A',
          'card': '#1F2937',
          'button-primary': '#2563EB',
          'button-primary-hover': '#1D4ED8',
          'button-secondary': '#EF4444',
          'button-secondary-hover': '#DC2626',
          'button-default': '#3B82F6',
          'button-default-hover': '#2563EB',
          'input': '#374151'
        }
      },
      // Custom shadows for dark mode
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.6)',
      },
      // Add animation keyframes
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: 0.6 },
          '25%': { transform: 'translateY(-30px) rotate(90deg) scale(1.1)', opacity: 0.8 },
          '50%': { transform: 'translateY(-60px) rotate(180deg) scale(0.9)', opacity: 0.5 },
          '75%': { transform: 'translateY(-30px) rotate(270deg) scale(1.05)', opacity: 0.7 }
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(147, 197, 253, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(147, 197, 253, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)' }
        },
        particleFloat: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100px) translateX(50px)', opacity: 0 }
        }
      },
      // Add animations
      animation: {
        float: 'float 20s infinite ease-in-out',
        glow: 'glow 2s ease-in-out infinite alternate',
        particleFloat: 'particleFloat 15s infinite linear'
      }
    },
  },
  plugins: [],
}