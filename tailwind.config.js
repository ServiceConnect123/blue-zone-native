/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./shared/components/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
    "./shared/components/*.{js,jsx,ts,tsx}",
    "./shared/hooks/**/*.{js,jsx,ts,tsx}",
    "./shared/context/**/*.{js,jsx,ts,tsx}",
    "./shared/constants/**/*.{js,jsx,ts,tsx}",
    "./shared/utils/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
