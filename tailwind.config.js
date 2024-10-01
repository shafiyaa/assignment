/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      stix: ['STIX Two Text', 'serif'],
    },
    extend: {
      colors: {
        maroon: '#800000',
        creme: '#FFFDD0',
        sage: '#BCB88A',
        oak: '#D8B589',
        blush: '#ffaaaa',
      },
    },
  },
  plugins: [],
};
