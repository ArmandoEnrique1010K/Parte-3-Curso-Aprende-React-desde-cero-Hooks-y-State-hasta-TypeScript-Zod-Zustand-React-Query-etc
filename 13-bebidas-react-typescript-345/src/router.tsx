// Importa la función lazy y el componente Suspense
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import IndexPage from "./views/IndexPage"
// import FavoritesPage from "./views/FavoritesPage"
import Layout from "./layouts/Layout"

// Se realiza un performance en este componente para generar multiples archivos JS en lugar de uno solo, luego de hacer un deploy del proyecto

// Al introducir el comando "npm run build" para hacer un deploy, se generan 3 archivos principales: index.html, una hoja de estilos y un archivo javascript que contiene todo el codigo fuente de la aplicación, aparte del contenido embebido (como las imagenes estaticas)

// Si el usuario visita la pagina de inicio, estara visualizando el proyecto completo porque es muy pesado y trae información innecesaria porque aun no ha visitado las demás paginas

// Cambia la sintaxis, llama a la función lazy, recibe un callback que procede a importar el componente FavoritesPage
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

// Realiza el mismo procedimiento para la pagina de inicio
const IndexPage = lazy(() => import('./views/IndexPage'))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {/* Repite el mismo procedimiento para utilizar el componente Suspense */}

                    <Route
                        path="/"
                        // element={<IndexPage />}
                        element={
                            <Suspense fallback="Cargando...">
                                <IndexPage />
                            </Suspense>
                        }
                        // Recuerda que esta prop establece la pagina de inicio
                        index
                    />

                    <Route
                        path="/favoritos"
                        // Elimina el componente que se renderiza en element y en su lugar llama al componente Suspense
                        // element={<FavoritesPage />}

                        element={
                            // Lleva una propiedad fallback para mostrar un contenido mientras se carga el componente
                            <Suspense fallback="Cargando...">
                                {/* Renderiza el componente FavoritesPage */}
                                <FavoritesPage />
                            </Suspense>
                        }
                    />
                </Route>


            </Routes>
        </BrowserRouter >
    )
}

// En el archivo package.json se tiene una propiedad llamada script que dice "preview": "vite preview", luego de generar la carpeta dist, ejecuta el comando "npm run preview" para previsualizar el proyecto que se encuentra en la carpeta dist (simula el entorno de producción cuando ya se ha subido al servidor). Muestra una url: http://localhost:4173/

// Pulsa F12 en Chrome, ve a la pestaña "Network", puedes filtrar los archivos de tipo JS y luego vuelve a cargar la pagina para ver los archivos javascript que se utilizan para mostrar el contenido web

// Tambien se muestra el componente DrinkCard porque es uno de los componentes que se renderiza en ambas paginas

// Nota adicional: Antes de subir el proyecto a Netlify, en la carpeta public crea el archivo "_redirects" (sin extensión) y escribe el codigo que se tiene en ese archivo
// https://answers.netlify.com/t/support-guide-i-ve-deployed-my-site-but-i-still-see-page-not-found/125?utm_source=404page&utm_campaign=community_tracking