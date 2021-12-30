module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: '#8B7FB6',
        'purple-dark': '#7768ad',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
