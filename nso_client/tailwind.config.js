const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      },
      fontFamily: {
        "sans": ["Montserrat", "sans-serif"],
        "serif": ["IBM Plex Serif", "serif"],
        "mono": ["Roboto Mono", "monospace"],
      },
      width: {
        600: "600px",
      },
      minHeight: {
        "textarea": "100px",
      },
      minWidth: {
        "600": "600px",
      },
      flexGrow: {
        "4": 4,
      },
      flex: {
        "action": "0 0 65px",
      },
    },
  },
  plugins: [],
};
