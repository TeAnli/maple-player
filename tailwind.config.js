/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F4BA18",
        secondary: "#F86E13",
        background: "#343434",
        forgeground: "#222222",
        "font-primary": "rgba(24, 28, 47, 30%)",
        "hover-primary": "rgba(255, 255, 255, 20%)",
      },
      boxShadow: {
        super: "0 20px 50px rgba(0,0,0, 0.10)",
      },
      fontFamily: {
        mukta: ["Mukta", "Helvetica", "Arial", "sans-serif"],
        title: "MrsSheppards",
      },
      width: {
        sidebar: "120px",
      },
      margin: {
        sidebar: "120px",
      },
    },
  },
  plugins: [],
};
