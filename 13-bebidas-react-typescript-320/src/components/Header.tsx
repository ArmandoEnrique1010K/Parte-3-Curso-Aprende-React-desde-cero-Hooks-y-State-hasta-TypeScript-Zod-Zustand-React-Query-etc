import { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const { pathname } = useLocation();
    const isHome = useMemo(() => pathname === '/', [pathname])

    // Llama a la acción de fetchCategories en el store
    const fetchCategories = useAppStore((state) => state.fetchCategories)

    // Llama al state de categories
    const categories = useAppStore((state) => state.categories)

    // Imprime las categorias
    console.log(categories)

    // Llama a la función fetchCategories cuando se renderice este componente
    useEffect(() => {
        fetchCategories()
    }, [])


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
                                >
                                    <option value="">-- Seleccione --</option>
                                    {
                                        // Itera con el state de categories
                                        categories.drinks.map(
                                            category => (
                                                <option
                                                    // Como solamente tiene una propiedad, se utiliza solamente su valor por cada categoria
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
