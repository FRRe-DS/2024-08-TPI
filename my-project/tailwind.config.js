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
        grisBIENnegro: '#171718',
        GrisCasiClaro: '#6a6e73',
        GrisClaro: '#9fa3a9',
        GrisMuyOscuro : '#171718',
        GrisCasiOscuro: '#1f2124',
      },
    },
  },
  plugins: [],
}
