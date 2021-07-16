module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Montserrat'],
      'serif': ['Montserrat'],
      'mono': ['Montserrat'],
      'display': ['Montserrat'],
      'body': ['Montserrat']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
