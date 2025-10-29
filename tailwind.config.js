module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00501f',
        'primary-dark': '#003b1a',
      },
      width: {},
      screens: {
        '2xl': '1366px',
        '3xl': '1601px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}