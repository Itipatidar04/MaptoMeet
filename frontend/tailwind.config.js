/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0F14",
        surface: "#151B23",
        card: "#1D2633",
        border: "#2A3442",
        "text-primary": "#FFFFFF",
        "text-secondary": "#94A3B8",
        primary: "#3B82F6",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        input: "12px",
        card: "16px",
        button: "12px",
        modal: "20px",
      },
      boxShadow: {
        panel: "0 8px 24px rgba(0, 0, 0, 0.15)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      maxHeight: {
        suggestions: "280px",
      },
      width: {
        "search-card": "520px",
      },
    },
  },
  plugins: [],
};
