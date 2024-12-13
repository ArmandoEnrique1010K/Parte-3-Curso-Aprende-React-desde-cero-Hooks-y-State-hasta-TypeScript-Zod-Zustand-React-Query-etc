// Este componente contiene las rutas para la aplicación web
// Lleva la extensión "tsx" porque react router dom ofrece una serie de componentes

// Importa los componentes de React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import FavoritesPage from "./views/FavoritesPage"

// Puedes renombrar la función principal a AppRouter
export default function AppRouter() {
    return (
        // BrowserRouter habilita el sistema de rutas debe envolver los demás componentes
        <BrowserRouter>
            {/* Routes contiene las diferentes rutas, permite agrupar las rutas */}
            <Routes>
                {/* Dentro se define cada ruta */}
                <Route
                    // path es una prop que contiene la URL que el usuario va a visitar. Comienza con "/". En este caso representa la pagina principal
                    path="/"
                    // elemtent contiene el componente tipo pagina que se renderizara al acceder a la ruta
                    element={<IndexPage />}
                ></Route>
                {/* Puedes definir más paginas */}
                <Route path="/favoritos" element={<FavoritesPage />}></Route>
                {/* En el navegador, accede a "http:/localhost:5173/favoritos" y se renderiza el componente FavoritesPage */}
            </Routes>
        </BrowserRouter >
    )
}
