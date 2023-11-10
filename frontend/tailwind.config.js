/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}" ],
  theme: {
    extend: {
      backgroundImage: {
        gradientPrimary:
          "radial-gradient(50% 50% at 50% 50%, #005BEC 0%, #0049BE 12%, #003385 30%, #002155 46%, #001330 62%, #000816 77%, #000206 90%, #000 100%)",
      },
      colors: {
        textPrimary: "#79FDFF",
        textSecondary: "#CFCFCF",
        textTertiary: "#28DBD1",
      },
      backgroundColor: {
        backgroundPrimary: "#030B15",
        backgroundSecondary: "#28DBD1",
        backgroundTertiary: "#09202F",
      },
      fontFamily: {
        fontPrimary: [ "Oxanium", "cursive" ],
        fontSecondary: [ "Outfit", "sans-serif" ],
      },
    },
  },
  plugins: [],
};
