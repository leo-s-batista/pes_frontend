module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
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