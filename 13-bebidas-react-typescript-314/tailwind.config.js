/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Aqui tu puedes crear tus propias clases de TailwindCSS, se conoce como theming de Tailwind, puedes cambiar los colores o agregar nuevas clases como una imagen de fondo
  theme: {
    extend: {
      // Utiliza sintaxis de JavaScript porque las clases no llevan guión (-)
      backgroundImage: {
        // Al definir un nombre para la clase, se podra integrar la siguiente clase: "bg-header" para utilizarla en el codigo HTML

        // En este caso, el valor contiene la URL hacia la imagen de fondo definido en la carpeta public
        header: "url('/bg.jpg')",

        // Reinicia el servidor (vuelve a ejecutar la aplicación) para aplicar los cambios
      },
    },
  },
  plugins: [],
};
