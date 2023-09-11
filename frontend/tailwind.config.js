module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      },
      maxWidth: {
        inputs: '15.625rem',
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
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      fontSize: {
        xs: '0.625rem',
        h1: '4rem',
        h2: '3rem',
        h3: '2.25rem',
        h4: '1.875rem',
        h5: '1.5rem',
        h6: '1.25rem',
        'body-large': '1.125rem',
        'body-default': '1rem',
        'body-small': '0.875rem',
        'body-default-medium': '1rem',
        line: '0.875rem',
        field: '0.8125rem',
        placeholder: '0.625rem',
      },
      boxShadow: {
        dropdown: '0px 4px 16px rgba(0, 0, 0, 0.10)',
        header: '9px 4px 18px rgba(0, 0, 0, 0.10);',
        shad: '0px 4px 18px 0px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
  plugins: [require("tailwindcss-animate")],
};
