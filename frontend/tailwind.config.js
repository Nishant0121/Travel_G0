/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#EEEEEE",
        dark: "#0F0F0F",
        primary: "#00ADB5",
        secondary: "#FFCB00",
      },
    },
  },
  plugins: [],
};
