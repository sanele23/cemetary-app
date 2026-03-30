import { Config } from "tailwindcss";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3CB3B3", // Teal from new logo
          light: "#b2e3e3", // Lighter teal
          dark: "#1a7a7a", // Darker teal
        },
        accent: {
          DEFAULT: "#e6f7f7", // Very light teal/sky
        },
        background: {
          DEFAULT: "#ffffff", // White background
        },
        foreground: {
          DEFAULT: "#22292f", // Dark gray for text
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.625rem",
      },
    },
  },
  plugins: [],
};

export default config;
