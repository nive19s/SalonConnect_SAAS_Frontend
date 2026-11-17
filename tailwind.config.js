/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        paper: '#ffffff',
        bone: '#f5f5f5',
        ash: '#737373',
        line: '#e5e5e5',
      },
      fontFamily: {
        display: ['Italiana', 'Didot', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 8vw, 7.5rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        display: ['clamp(2.1rem, 5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.005em' }],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 40s linear infinite' },
    },
  },
  plugins: [],
};
