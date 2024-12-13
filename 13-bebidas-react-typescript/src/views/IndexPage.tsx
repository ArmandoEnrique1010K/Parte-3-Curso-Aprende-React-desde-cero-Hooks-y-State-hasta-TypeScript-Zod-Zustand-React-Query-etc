// Dentro de una carpeta llamada views o pages contiene los componentes que representan paginas web (una pagina esta compuesta por varios componentes)

import Header from "../components/Header";

// Pagina principal
export default function IndexPage() {
    return (
        <>
            {/* Renderiza el componente Header */}
            <Header />
        </>
    )
}
