/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        primary: "#050816",

        secondary: "#0B1023",

        accent: "#00D1FF",

        purpleGlow: "#7B61FF",
      },

      boxShadow: {

        glow:
          "0 0 30px rgba(0,209,255,0.35)",
      },
    },
  },

  plugins: [],
};