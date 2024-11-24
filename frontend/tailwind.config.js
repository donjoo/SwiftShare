/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all JS/TS/HTML files in the `src` folder
    "./public/index.html", // Include the `index.html` file if you're using React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
