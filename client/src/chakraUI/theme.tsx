import { extendTheme } from "@chakra-ui/react";

export const myNewTheme = extendTheme({
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Raleway', sans-serif`,
      },
    colors: {
        alpha: {
            50: "RGBA(0, 0, 0, 0.04)",
            100: "RGBA(0, 0, 0, 0.06)",
            200: "RGBA(0, 0, 0, 0.08)",
            300: "RGBA(0, 0, 0, 0.16)",
            400: "RGBA(0, 0, 0, 0.24)",
            500: "RGBA(0, 0, 0, 0.36)",
            600: "RGBA(0, 0, 0, 0.48)",
            700: "RGBA(0, 0, 0, 0.64)",
            800: "RGBA(0, 0, 0, 0.80)",
            900: "RGBA(0, 0, 0, 0.92)",
        },
        gray: {
            50: "#F7FAFC",
            100: "#EDF2F7",
            200: "#E2E8F0",
            300: "#CBD5E0",
            400: "#A0AEC0",
            500: "#718096",
            600: "#4A5568",
            700: "#2D3748",
            800: "#1A202C",
            900: "#171923",
        },
        blue: {
            50: "#EBF8FF",
            100: "#BEE3F8",
            200: "#90CDF4",
            300: "#63B3ED",
            400: "#4299E1",
            500: "#3182CE",
            600: "#2B6CB0",
            700: "#2C5282",
            800: "#2A4365",
            900: "#1A365D",
        },
    },
});