import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  extend: {
  animation: {
    "slide-in": "slideIn 0.5s ease-out",
    "scale-in": "scaleIn 0.4s ease-out",
  },
  keyframes: {
    slideIn: {
      "0%": { transform: "translateX(100%)", opacity: 0 },
      "100%": { transform: "translateX(0)", opacity: 1 },
    },
    scaleIn: {
      "0%": { transform: "scale(0.7)", opacity: 0 },
      "100%": { transform: "scale(1)", opacity: 1 },
    },
  },
},

})