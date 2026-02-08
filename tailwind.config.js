/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#000000",
          900: "#0a0a0a",
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3a3a3a",
        },
        cosmic: {
          purple: "#8b5cf6",
          blue: "#3b82f6",
          accent: "#a855f7",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite alternate",
        drift: "drift 20s linear infinite",
        "fade-in-logo": "fadeInLogo 2s ease-out forwards",
        "fade-in-text": "fadeInText 1.5s ease-out 2.5s forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        twinkle: {
          "0%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(-100px) rotate(0deg)" },
          "100%": { transform: "translateX(100vw) rotate(360deg)" },
        },
        fadeInLogo: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeInText: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        death: ["DeathMetal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
