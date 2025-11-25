import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px"
      }
    },
    extend: {
      colors: {
        background: "#0c1021",
        foreground: "#e5edff",
        muted: {
          DEFAULT: "#11162b",
          foreground: "#9aa9d7"
        },
        primary: {
          DEFAULT: "#5d5fef",
          foreground: "#f2f4ff"
        },
        secondary: {
          DEFAULT: "#1b1f3a",
          foreground: "#d1dbff"
        },
        accent: {
          DEFAULT: "#9f7aea",
          foreground: "#f8f7ff"
        },
        card: {
          DEFAULT: "#11162b",
          foreground: "#e5edff"
        }
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans]
      },
      boxShadow: {
        glow: "0 10px 60px rgba(93,95,239,0.25)",
        soft: "0 20px 70px rgba(0,0,0,0.45)"
      },
      backgroundImage: {
        'mesh-gradient':
          "radial-gradient(circle at 20% 20%, rgba(93,95,239,0.15), transparent 25%), radial-gradient(circle at 80% 0%, rgba(159,122,234,0.18), transparent 30%), radial-gradient(circle at 50% 80%, rgba(73,209,255,0.14), transparent 25%)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
