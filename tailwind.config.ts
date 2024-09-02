import { primaryColor, secondaryColor } from "./public/properties/colors";
import { primaryFont } from "./public/properties/fonts";

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryFont: primaryFont,
      },
      colors: {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
      },
    },
  },
  plugins: [],
};

export default config satisfies Config;
