import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff", // Pure white for clean corporate look
                foreground: "#1f2937", // Slate-800 for high readability
                cielo: {
                    light: "#009cde",      // Cielo Secondary Blue
                    DEFAULT: "#004b87",    // Cielo Primary Blue
                    dark: "#002b4e",       // Deep corporate contrast
                },
                maturity: {
                    elite: "#059669",      // Emerald-600
                    alta: "#0ea5e9",       // Sky-500
                    media: "#f59e0b",      // Amber-500
                    baixa: "#dc2626",      // Red-600
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
