/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,ejs}", "./src/**/*.{html,js,ejs}"],
  purge: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

