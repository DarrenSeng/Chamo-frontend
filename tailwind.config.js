/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  
  /* By Angeline Dequit: lines 5-7 */
  //darkMode: when set to Media, elements are styled according to browser/system theme. when set to class, user can toggle dark mode with a button.
  darkMode: 'media', // or 'media' or 'class'

  theme: {
    extend: {
      /* By Angeline Dequit: lines 9-17 */
      colors: { //defining theme colors for use throughout code. to use, in className, use text-<color>. ex) text-dark-grey
        "nav-black": "#191919",
        "dark-grey": "#313131",
        "light-grey": "#474747",
        "lighter-green": "#f7fee7",
        "light-green": "#E1EACD",
        "med-green": "#BED292",
        "dark-green": "#466060",
        "off-white": "#eaeaea",
      },
      transitionProperty: {
        'height': 'height'
      },
      screens: {
          "ChamoApp-bp": "755px",
      }
      
    },
  },
  plugins: [],
}

