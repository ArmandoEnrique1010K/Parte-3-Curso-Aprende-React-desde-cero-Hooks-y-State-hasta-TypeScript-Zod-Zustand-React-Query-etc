
// Importa el componente Outlet
import { Outlet } from "react-router-dom"
import Header from "../components/Header"

// Componente de tipo layout

// Tiene como objetivo mostrar el contenido en todas las paginas web definidas
export default function Layout() {
    return (
        <>
            {/* Renderiza header, este es el elemento comun entre todas las demás paginas */}
            {/* <div>Layout</div> */}
            <Header />

            {/* Renderiza el componente Outlet para mostrar el contenido de las demás paginas. Ten en cuenta que el contenido de las demás paginas se inyecta en el Outlet */}

            {/* Una buena practica es que el elemento main sirve para agrupar el contenido principal */}
            <main>
                <Outlet />
            </main>
        </>
    )
}
