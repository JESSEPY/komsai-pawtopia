/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF9300",
        customBlue: "#25567B",
        secondary: "#FDE6C7",
        customBorderColor: "#63241D",
        link: "#4270CC",
        formBg: "#F5F5F5",
        sectionBg: "#FCFCFC",
        radioForm: "#5C5C5C",
        hoverColor: "#FFEFD9",
        tagColor: "#D6A53F",
        tagBg: "#FFF2D7",
        suggestedBg: "#FFFBF6",
        donateColor: "#FAD5A3",
        profileNavBg: "#F6F6F6",
        profileNavBorder: "#F1F1F1",
        adoptableCardBorder: "#E5E5E5",
        sidebarBg: "#FCFCFC",
        eventCardBg: "#DFEBFF",
        lostPetBg: "#F7AA41",
        listBorderBg: "#E5E5E5",
        listInputBorder: "#C9C9C9",
        altTagColor: "#FDB622",
        iconHoverColor: "#25567b",
        altTagBorder: "##C98E25",
        altTagBg: "#F6D497",
        listProfileBg: "#FCE0A5",
      },
      boxShadow: {
        stroke: "0 0 0 0.8rem rgba(255, 255, 255, 0.30)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        arpona: ["ArponaSans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },

      fontWeight: {
        black: "900",
        medium: "400",
      },
      container: {
        center: true,
      },

      fontSize: {
        xxs: "0.625rem", // 10px
        xs: "0.75rem", // 12px
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
