/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 添加深色模式支持
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        content: "rgb(var(--color-foreground))",
        foreground: "rgb(var(--color-content))",
        card: "rgba(103, 103, 103, 0.6)",
        hovered: "rgb(80 80 80)"
      },
      textColor: {
        primary: "rgb(var(--color-text-primary))"
      },
      boxShadow: {
        super: "0 20px 50px rgba(0,0,0, 0.10)"
      },
      fontFamily: {
        mukta: ["Mukta", "Helvetica", "Arial", "sans-serif"],
        title: "MrsSheppards"
      },
      width: {
        sidebar: "100px"
      },
      height: {
        header: "4rem"
      },
      margin: {
        sidebar: "100px"
      }
    }
  },
  plugins: []
};
