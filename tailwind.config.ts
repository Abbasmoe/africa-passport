import tailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  theme: {
    fontFamily: {
      body: ["Montserrat"],
    },
    extend: {
      zIndex: {
        "-1": "-1",
      },
    },
  },

  plugins: [
    tailwindTypography,
  ],
  content: []
} satisfies Config;
