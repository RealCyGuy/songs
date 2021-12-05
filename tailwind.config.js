module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Martel", "serif"],
      cursive: ["Parisienne", "cursive"],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
