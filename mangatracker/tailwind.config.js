const colors = require('tailwindcss/colors')

module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
