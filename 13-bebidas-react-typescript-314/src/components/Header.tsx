import { useMemo } from "react";
import { /* Link, */ NavLink, useLocation } from "react-router-dom";

export default function Header() {

    // React Router Dom tambien ofrece unos hooks, como useLocation
    // const location = useLocation();

    // Observa que imprime un objeto que contiene las siguientes propiedades:
    // hash -> muestra el nombre de un ancla (cuando se tiene el caracter "#" en la URL)
    // key -> identifica la forma de navegación (por defecto muestra default)
    // pathname -> identifica la pagina en la que esta el usuario
    // search -> es comun cuando realizas una busqueda (cuando se tiene el caracter "?" en la URL), contiene query strings
    // state -> las rutas pueden llevar un state

    // console.log(location)

    // Identifica la URL de la pagina
    // console.log(location.pathname)

    // Segunda forma con desestructuración (crea la variable, lo extrae del hook)
    const { pathname } = useLocation();
    // console.log(pathname);

    // Función con useMemo para identificar si el usuario esta en la pagina de inicio, se obtiene el endpoint en el que esta el usuario
    const isHome = useMemo(() => pathname === '/', [pathname])

    // Debe imprimir true si esta en la pagina de inicio
    // console.log(isHome);

    return (
        // Una vez definida la nueva clase personalizada en el archivo tailwind.config.js, solamente queda utilizarla con la clase "bg-header", en este caso la imagen de fondo. El autocompletado funciona en VSCode.

        // Tambien se comprueba que el usuario se encuentra en la pagina de inicio para mostrar la imagen de fondo y se añaden las clases bg-center y bg-cover, de lo contrario solamente tendra un color de fondo (si esta en la pagina de favoritos)
        // <header className="bg-slate-800">
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>

            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="Logotipo" />
                    </div>

                    {/* Define los enlaces (menu de enlaces), añade un estilo de caja con un espaciado de 1rem */}
                    <nav className="flex gap-4">

                        {/* Para navegar entre enlaces, normalmente en HTML se hacia lo siguiente. Al realizar esto en React, lo que hace es que "flashea" o se ve una pantalla blanca por un breve momento al ir a la pagina definida */}
                        {/* <a href="/">Inicio</a> */}
                        {/* <a href="/favoritos">Favoritos</a> */}

                        {/* Con React Router, se tiene 2 opciones: utilizar Link o NavLink */}

                        {/* Link lleva la prop to en lugar de href para establecer el endpoint (debe estar definido en el componente que contiene las rutas), tambien se puede aplicar estilos */}

                        {/* Aparentemente NavLink realiza la misma acción que Link, pero la diferencia es que NavLink tiene acceso a un callback en el className para resaltar la pagina actual */}
                        <NavLink
                            // Utiliza este estilo si es con un componente Link
                            // className="text-white uppercase font-bold"

                            to="/"

                            // Utiliza codigo JS al definir un estilo, desestructura una propiedad llamada isActive (booleana) para aplicar unos estilos si el usuario se encuentra en la pagina activa
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Inicio</NavLink>

                        {/* Realiza el mismo procedimiento con el otro NavLink */}
                        <NavLink
                            // className="text-white uppercase font-bold"
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Favoritos</NavLink>

                        {/* En conclusión, si quieres resaltar la pagina actual utiliza NavLink, de lo contrario utiliza Link */}

                    </nav>
                </div>

                {
                    // El siguiente codigo se ejecuta si el usuario esta en la pagina de inicio
                    isHome && (
                        // Formulario con un campo para realizar una busqueda

                        // El estilo describe: en un ancho de pantalla menor que 768px, tendra un ancho del 50% del elemento padre, pero en un ancho de pantalla menor que 1536px tendra un ancho del 33%
                        <form
                            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        >
                            {/* Recuerda que esta clase aplica un espaciado a sus elementos hijos */}
                            <div className="space-y-4">
                                <label
                                    htmlFor="ingredient"
                                    className="block text-white uppercase font-extrabold text-lg"
                                >
                                    Nombre o Ingredientes
                                </label>

                                <input
                                    id="ingredient"
                                    type="text"
                                    name="ingredient"
                                    // La clase focus:outline-none evita que el campo de texto se pinte de un color azul o negro (por defecto)
                                    className="p-3 w-full rounded-lg focus:outline-none"
                                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                />
                            </div>

                            {/* Realiza el mismo procedimiento para el campo de categoria, utiliza un <select> en lugar de <input> */}
                            <div className="space-y-4">
                                <label
                                    htmlFor="category"
                                    className="block text-white uppercase font-extrabold text-lg"
                                >
                                    Categoria
                                </label>

                                {/* Nota: Typescript detecta los atributos que no corresponden al elemento HTML como type y placeholder */}
                                <select
                                    id="category"
                                    name="category"
                                    className="p-3 w-full rounded-lg focus:outline-none"
                                >
                                    <option value="">-- Seleccione --</option>
                                </select>
                            </div>

                            {/* Botón para enviar el formulario */}
                            <input
                                type="submit"
                                value="Buscar Recetas"
                                // La clase cursor-pointer, cambia el cursor cuando se coloca sobre el elemento
                                className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                            />
                        </form>
                    )
                }

                {/* Recuerda que el contenido del formulario se mostrara solamente en la pagina de inicio */}
            </div>
        </header>
    )
}
