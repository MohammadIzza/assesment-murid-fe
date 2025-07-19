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
      }
    },
  },
  plugins: [],
}