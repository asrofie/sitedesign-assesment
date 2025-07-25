import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "neutral-n0": "var(--Neutral-N0, #FFFFFF)",
        "neutral-n10": "var(--Neutral-N10, #FAFAFB)",
        "neutral-n20": "var(--Neutral-N20, #F5F5F6)",
        "neutral-n30": "var(--Neutral-N30, #ECECEE)",
        "neutral-n40": "var(--Neutral-N40, #E0E0E3)",
        "neutral-n50": "var(--Neutral-N40, #C3C3C9)",
        "neutral-n70": "var(--Neutral-N40, #A9A9B1)",
        "neutral-n100": "var(--Neutral-N100, #7E7E8A)",
        "neutral-n500": "var(--Neutral-N500, #474758)",
        "neutral-n700": "var(--Neutral-N700, #2A2A3E)",
        "neutral-n900": "var(--Neutral-N900, #101026)",

        "primary-p50": "var(--Primary-P50, #EDEDF8)",
        "primary-p75": "var(--Primary-P75, #B6B6E1)",
        "primary-p100": "var(--Primary-P100, #9898D5)",
        "primary-p200": "var(--Primary-P200, #6B6BC2)",
        "primary-p300": "var(--Primary-P300, #4D4DB6)",
        "primary-p400": "var(--Primary-P400, #36367F)",
        "primary-p500": "var(--Primary-P500, #2F2F6F)",

        "secondary-s300": "var(--Secondary-S300, #0080CC)",

        "success-s300": "var(--Success-S300, #4BB543)",

        "warning-w50": "var(--Warning-W50, #FFF2E7)",
        "warning-w200": "var(--Warning-W200, #FF9138)",

        "error-e300": "var(--Error-E300, #CF2B30)",
      },
      fontSize: {
        base: '14px', // Change default `text-base` to 14px
        xs: "var(--font-xs)", //11px
        sm: "var(--font-sm)", //12px
        md: "var(--font-md)", //14px
        lg: "var(--font-lg)", //16px
        xl: "var(--font-xl)", //18px
        xxl: "var(--font-xxl)", //20px
        h1: "var(--font-h1)", //32px
        h2: "var(--font-h2)", //28px
        h3: "var(--font-h3)", //25px

        "error-e300": "var(--Error-E300, #CF2B30)",
        "error-e500": "var(--Error-E500, #7E1A1D)",

        "icon-md": "var(--font-icon-md)",
        "icon-xl": "var(--font-icon-xl)",
        "icon-xxl": "var(--font-icon-xxl)",
      },
      fontFamily: {
        "semi-bold": ["var(--wit_font_sb)"],
        medium: ["var(--wit_font_md)"],
        light: ["var(--wit_font_l)"],
        reg: ["var(--wit_font_r)"],
        thin: ["var(--wit_font_t)"],
        bl: ["var(--wit_font_bl)"],
        bold: ["var(--wit_font_bo)"],
      },
    },
  },
  plugins: [animate],
};
