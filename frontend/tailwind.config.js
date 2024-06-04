/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#EEEEEE",
        dark: "#0F0F0F",
        primary: "#1a8be0",
        secondary: "#FFCB00",
      },
    },
  },
  plugins: [],
};
