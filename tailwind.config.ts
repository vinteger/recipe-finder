import type { Config } from "tailwindcss";

const config: Config = {
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
      colors: {
        "ut-orange": "#fb8500ff",
        "selective-yellow": "#ffb703ff",
        "sky-blue": "#8ecae6ff",
        "prussian-blue": "#023047ff",
        "blue-green": "#219ebcff",
      },
    },
  },
  plugins: [],
};
export default config;
