module.exports = {
  purge: process.env.NODE_ENV === 'production' ? ['./src/**/*.ts'] : [],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
