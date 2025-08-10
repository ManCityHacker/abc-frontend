module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    "../../node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        merriweather: ["Merriweather", "serif"],
      },
      colors: {
        'abc-primary': '#D04A37',
        'abc-primary-red': '#D04A37',
        'abc-primary-dark': '#B73D2A',
        'abc-primary-light': '#E56B5A',
        'abc-accent': '#F0A500',
        'abc-accent-dark': '#E09400',
        'abc-accent-light': '#F5B800',
        'abc-gold': '#F0A500',
        'abc-red': '#D04A37',
        'abc-red-light': '#E56B5A',
        'abc-red-dark': '#B73D2A',
        'abc-green': '#359400',
        'abc-green-light': '#4ADE80',
        'abc-green-dark': '#2D7500',
      },
      keyframes: {
        "accordion-open": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-close": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-open": "accordion-open 0.3s ease-out",
        "accordion-close": "accordion-close 0.3s ease-out",
      },
    },
  },
}
