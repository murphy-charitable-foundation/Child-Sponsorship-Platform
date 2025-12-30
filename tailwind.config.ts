import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";


export default {
  //darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        border: "var(--divider)",
        focus: "var(--focus)",
        
        content1: "var(--content1)",
        content2: "var(--content2)",
        content3: "var(--content3)",
        content4: "var(--content4)",
      },
      borderRadius: {
        lg: "var(--rounded-large)",
        md: "var(--rounded-medium)",
        sm: "var(--rounded-small)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), heroui()],
} satisfies Config;
