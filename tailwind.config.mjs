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
          DEFAULT: "#7DB6E8", // Main blue from logo
          light: "#B3D6F5", // Lighter blue
          dark: "#3A7CB8", // Darker blue
        },
        accent: {
          DEFAULT: "#E3F1FB", // Very light blue/sky
        },
        background: {
          DEFAULT: "#F8FAFC", // Very light gray/white
        },
        foreground: {
          DEFAULT: "#1A2233", // Dark navy for text
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
