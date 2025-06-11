module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937", // grigio scuro
        secondary: "#4B5563", // grigio medio
        accent: "#F59E0B", // ambra
        light: "#F3F4F6", // quasi bianco
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
