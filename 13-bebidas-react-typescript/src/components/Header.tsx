// Componente para el menú de la cabecera
export default function Header() {
    return (
        <header className="bg-slate-800">
            <div className="mx-auto container px-5 py-16">
                {/* Diseño de caja con flex */}
                <div className="flex justify-between items-center">
                    <div>
                        {/* Recuerda que con w-32 se establece el ancho de la imagen en este caso */}
                        <img className="w-32" src="/logo.svg" alt="Logotipo" />
                    </div>
                    <nav>

                    </nav>
                </div>
            </div>
        </header>
    )
}
