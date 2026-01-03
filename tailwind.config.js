/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        surface: "#111114",
        primary: {
          light: "#c084fc",
          DEFAULT: "#9333ea",
          dark: "#7e22ce",
        },
        secondary: {
          light: "#f472b6",
          DEFAULT: "#db2777",
          dark: "#be185d",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
