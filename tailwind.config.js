/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors:{
        lightPrimary:"#00B28A",
        light:"#CFFCF2",
        lightSecondary:"#35495E",
        dark:"#18191A",
        darkPrimary:"#242526",
        darkSecondary:"#3A3B3C"
      }
    },
  },
  darkMode:"class",
  mode:"jit",
  plugins: [],
}

