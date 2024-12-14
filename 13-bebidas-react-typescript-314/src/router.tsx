import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import FavoritesPage from "./views/FavoritesPage"
import Layout from "./layouts/Layout"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Se tiene un Route sin la prop path, renderiza componente Layout  */}

                {/* Si un componente Route tiene una etiqueta de apertura y cierre, puede agrupar unas rutas */}
                <Route element={<Layout />}>
                    {/* Coloca aqui las demás rutas, utiliza Layout para el diseño principal de las paginas */}

                    {/* Agrega la prop index (no tiene valor, se asume que es true) al componente que representa la pagina principal o de inicio */}
                    <Route
                        path="/"
                        element={<IndexPage />}
                        index
                    />
                    <Route
                        path="/favoritos"
                        element={<FavoritesPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}
