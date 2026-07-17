import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ed1d24",
        "primary-dark": "#c8161c",
        secondary: "#14336c",
        "secondary-dark": "#0e2550",
        "dark-bg": "#0a0a0a",
        "dark-surface": "#111111",
        "dark-elevated": "#1a1a1a",
        "dark-border": "#2a2a2a",
        muted: "#8a8a8a",
        "off-white": "#f5f0eb",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      animation: {
        "bounce-slow": "bounceSlow 1.5s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-red": "pulseRed 2s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(237,29,36,0)" },
          "50%": { boxShadow: "0 0 0 8px rgba(237,29,36,0.3)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      spacing: {
        section: "120px",
        "section-mobile": "64px",
      },
    },
  },
  plugins: [],
};

export default config;
