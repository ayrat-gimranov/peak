module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: '#3D56B2',
        'purple-dark': '#14279B',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

// purple: #8B7FB6
// purple-dark: #7768ad

// purple: '#8267BE',
// 'purple-dark': '#502064',
