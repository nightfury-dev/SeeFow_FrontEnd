const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
       maxWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
      fontFamily: {
        // sans: ["IBM Plex Mono", ...defaultTheme.fontFamily.sans]
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono]
      },
      boxShadow: {
        link: '0 -4px 0 0 rgba(227, 34, 39, .7) inset',
        linkhover: '0 -6px 0 0 rgba(227, 34, 39, .7) inset',
        titlelink: '0 -4px 0 0 rgba(227, 34, 39, .9) inset',
        titlehover: '0 -12px 0 0 rgba(227, 34, 39, .6) inset',
      },
      colors: {
        'theme-blue': '#40bbff',
        'theme-red': "#DF362D",
        'theme-body-back': 'rgb(235, 235, 235)',
      },
      backgroundImage: {
        'u_section1': "url('./images/14.jpg')",
        'u_section2': "url('./images/section-2.png')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
