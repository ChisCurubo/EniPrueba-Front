/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}" // Escanea todos los archivos en "src"
  ],
  theme: {
    extend: {
      colors:{
        'blue-bg': '#13386e',
      }
    },
  },
  plugins: [],
}

