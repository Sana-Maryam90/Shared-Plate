/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        lato: ['"Lato"', "sans-serif"],
        notoSans: ['"Noto Sans"', "sans-serif"],
      },
      colors: {
        white: "#fffff3",
        // green: "#C75B7A",
        green: "#789DBC",
        red: "#D9ABAB",
        deepBlue: "#35374B",
        skyblue: "#F0EBE3",
        bgwhite: "#F6F5F2",
        violet: "#D9ABAB",
      },
      animation: {
        fadeIn: "fadeIn 2s ease-out",
        zoomIn: "zoomIn 1.5s ease-out",
        slideInBottom: "slideInBottom 2s ease-out",
        bounceIn: "bounceIn 2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        slideInBottom: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        bounceIn: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "60%": { opacity: 1, transform: "translatX(-30%)" },
          "80%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
