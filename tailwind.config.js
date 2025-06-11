/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "rgb(240, 58, 58)",
        "secondary": "rgb(247, 109, 109)",
        "forgeground": "rgb(58, 62, 77)",
        "component": "rgba(241, 237, 237, 50%)",
        "font-primary": "rgba(24, 28, 47, 50%)"
      }
    },
  },
  plugins: [],
}