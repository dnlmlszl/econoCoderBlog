/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        dynamich1: 'clamp(1.5rem, 3vw, 3rem)',
        dynamich2: 'clamp(1.25rem, 2.5vw, 2.5rem)',
        dynamich3: 'clamp(1rem, 2vw, 2rem)',
        dynamich4: 'clamp(1rem, 1.5vw, 1.25rem)',
        dynamicp: 'clamp(0.875rem, 1vw, 1rem)',
        dynamicsmall: 'clamp(0.75rem, 0.875vw, 0.875rem)',
        dynamiccaption: 'clamp(0.75rem, 0.875vw, 0.875rem)',
        dynamicbtn: 'clamp(0.875rem, 1vw, 1rem)',
      },
    },
  },
  plugins: [],
};
