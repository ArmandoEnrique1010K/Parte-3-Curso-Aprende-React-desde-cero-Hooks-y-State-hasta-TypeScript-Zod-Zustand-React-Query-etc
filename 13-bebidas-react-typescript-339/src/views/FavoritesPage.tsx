import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

    // Extrae el state de favorites
    const favorites = useAppStore((state) => state.favorites)

    // Comprueba de que haya al menos 1 favorito en el state de favorites, retorna true o false
    const hasFavorites = useMemo(() => favorites.length, [favorites])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>
            {
                // Verifica que exista al menos 1 favorito para mostrar la lista de favoritos
                hasFavorites ? (
                    // Diseño de cuadrilla (el mismo que utiliza la pagina de inicio con las recetas)
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                        {/* Itera con el state de favorites */}
                        {favorites.map(drink => (
                            // Renderiza el componente DrinkCard por cada elemento
                            <DrinkCard
                                key={drink.idDrink}
                                // Recuerda que se pasa la prop drink para mostrar los datos de la receta
                                drink={drink}
                            />
                        ))}
                        {/* Tambien se tiene los botonos para cerrar y eliminar favorito (no se muestra agregar porque todos son favoritos) al hacer clic en ver receta */}
                    </div>
                ) : (
                    // De lo contrario mostrara un mensaje
                    <p className="my-10 text-center text-2xl">
                        Los favoritos se mostrarán aqui
                    </p>
                )
            }
        </>
    )
}
