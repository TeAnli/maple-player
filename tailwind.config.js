/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 添加深色模式支持
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        content: "rgb(var(--color-content))",
        foreground: "rgb(var(--color-foreground))",
        card: "rgb(103 103 103)",
        hovered: "rgb(80 80 80)",
      },
      textColor: {
        primary: "rgb(var(--color-text-primary))",
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
      height: {
        header: "height: 2rem",
      },
      margin: {
        sidebar: "120px",
      },
    },
  },
  plugins: [],
};
