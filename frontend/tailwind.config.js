module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      },
      keyframes: {
        spinAround: {
          '0%': { transform: 'rotate(0deg) translate(2rem)' },
          '100%': { transform: 'rotate(360deg) translate(2rem)' },
        },
        spinAroundSm: {
          '0%': { transform: 'rotate(0deg) translate(1.5rem)' },
          '100%': { transform: 'rotate(360deg) translate(1.5rem)' },
        },
        spinAroundLg: {
          '0%': { transform: 'rotate(0deg) translate(3rem)' },
          '100%': { transform: 'rotate(360deg) translate(3rem)' },
        },
      },
      fontSize: {
        xs: '0.625rem',
      },
      boxShadow: {
        dropdown: '0px 4px 16px rgba(0, 0, 0, 0.10)',
      },
    },
    colors: {
      transparent: '#00000000',
      grey: '#BCC3CE',
      'dark-grey': '#4C5767',
      field: '#DBDBDB',
      inactive: '#DAE0E7',
      placeholder: '#BCC3CE',
      black: '#202020',
      background: '#FAFAFA',
      'green-2': '#26C485',
      blue: '#083D77',
      green: '#1B9AAA',
      orange: '#F87060',
      red: '#BB1128',
      white: '#FFFFFF',
      'dark-blue': '#052D58',
      hover: '#17569C',
      'red-2': '#F0544F',
      'input-disabled': '#F5F5F5',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
