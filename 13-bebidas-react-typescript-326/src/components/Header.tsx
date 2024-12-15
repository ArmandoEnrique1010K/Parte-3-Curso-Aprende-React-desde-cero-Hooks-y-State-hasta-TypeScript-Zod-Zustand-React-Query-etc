import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    // Estado para los filtros de busqueda
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation();
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)

    // Llama a la función (acción) searchRecipes desde el slice recipeSlice
    const searchRecipes = useAppStore((state) => state.searchRecipes)


    useEffect(() => {
        fetchCategories()
    }, [])

    // Función para manejar el cambio, se especifica el type para el parametro e, se utiliza en ambos elementos: <input> y <select>
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            // Establece el texto introducido previamente y lo modifica por cada cambio en el campo del formulario
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    // Puedes revisar en React Developers Tools, en el componente Header el state actual de searchFilters

    // Función para manejar el envio del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Evita el comportamiento por defecto
        e.preventDefault()

        // Valida que ningun campo este en blanco (contiene un string vacio)
        if (Object.values(searchFilters).includes('')) {
            console.log('Todos los campos son obligatorios')

            // Detiene la ejecución actual de la función
            return
        }

        // Consulta las recetas, llama a la función searchRecipes, se tiene que pasar el state de searchFilters para que pueda el slice comunicarse con el servicio y obtener las recetas

        // Muestra un error porque requiere como argumento un objeto que contenga el ingrediente y la categoria (state de searchFilters)
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>

            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="Logotipo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Inicio</NavLink>

                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Favoritos</NavLink>
                    </nav>
                </div>

                {
                    isHome && (
                        <form
                            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                            // Evento onSubmit, se activa al enviar el formulario
                            onSubmit={handleSubmit}
                        >
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
                                    className="p-3 w-full rounded-lg focus:outline-none"
                                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                    // Establece el evento onChange con la función handleChange y el value con la propiedad del objeto definido en el state de searchFilters
                                    onChange={handleChange}
                                    value={searchFilters.ingredient}

                                />
                            </div>

                            <div className="space-y-4">
                                <label
                                    htmlFor="category"
                                    className="block text-white uppercase font-extrabold text-lg"
                                >
                                    Categoria
                                </label>

                                <select
                                    id="category"
                                    name="category"
                                    className="p-3 w-full rounded-lg focus:outline-none"
                                    // Repite el mismo procedimiento con este elemento
                                    onChange={handleChange}
                                    value={searchFilters.category}

                                >
                                    <option value="">-- Seleccione --</option>
                                    {
                                        categories.drinks.map(
                                            category => (
                                                <option
                                                    value={category.strCategory}
                                                    key={category.strCategory}
                                                >{category.strCategory} </option>
                                            )
                                        )
                                    }
                                </select>
                            </div>

                            <input
                                type="submit"
                                value="Buscar Recetas"
                                className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                            />
                        </form>
                    )
                }
            </div>
        </header>
    )
}
