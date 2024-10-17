/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#9fa3a9', // Define el color personalizado
        grisOscuro: '#393d42', // Color gris oscuro personalizado
      },
    },
  },
  plugins: [],
}