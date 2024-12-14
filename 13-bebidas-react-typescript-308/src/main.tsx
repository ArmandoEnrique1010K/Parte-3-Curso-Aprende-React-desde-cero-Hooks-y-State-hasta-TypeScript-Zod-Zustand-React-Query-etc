import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* No existe el componente App, porque se ha eliminado */}
    {/* <App /> */}

    {/* Comandos para crear el proyecto */}
    {/*
      cd <<Ruta de la carpeta>>
      npm create vite@latest
      13-bebidas-react-typescript
      React
      TypeScript + SWC
      cd 13-bebidas-react-typescript
      npm install
      npm run dev
    */}

    {/* Limpieza del proyecto */}
    {/*
      Elimina la carpeta assets, el archivo vite.svg que se encuentra en la carpeta public, el archivo App.css.

      Limpia el contenido de App.tsx, elimina todo el contenido de index.css
    */}

    {/* Comandos para instalar tailwind */}
    {/* npm i -D tailwindcss postcss autoprefixer */}
    {/* npx tailwindcss init -p */}

    {/* REACT ROUTER */}

    {/* Aplicaciones en React con múltiples páginas */}

    {/* Es una librerias más comunes a la hora de crear aplicaciones de múltiples páginas y navegación */}

    {/* React Router es de los creadores de Remix Run */}

    {/* En las últimas versiones es prácticamente un framework de React */}

    {/* CARACTERISTICAS DE REACT ROUTER */}

    {/* React Router te permitirá crear secciones con diferentes urls tales como /tienda, /productos, /login, etc. */}

    {/* En versiones recientes agregaron la posibilidad de consultar API'S y procesar formularios pero estas características son opcionales */}

    {/* INSTALAR REACT ROUTER */}

    {/* Se instala la libreria con el comando "npm i react-router-dom"*/}

    {/* El paquete de React Router provee las funcionalidades para React Router Dom y React Router Native (aplicaciones moviles) */}

    {/* https://www.npmjs.com/package/react-router */}
    {/* https://www.npmjs.com/package/react-router-dom */}

    {/* */}

    {/* Renderiza el componente AppRouter (sistema de rutas definido en el archivo router.tsx) en lugar de App */}
    <AppRouter />
  </StrictMode>,
)
