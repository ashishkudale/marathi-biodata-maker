import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marathi: ['"Baloo Bhai 2"', 'cursive'],
        'marathi-formal': ['"Tiro Devanagari Marathi"', 'serif'],
        mukta: ['Mukta', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
