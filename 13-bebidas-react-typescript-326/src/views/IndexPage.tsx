// Importa useAppStore para extraer los estados y acciones del store 
import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {

    // Extra el state drinks
    const drinks = useAppStore((state) => state.drinks)

    // Función para verificar que haya bebidas (si el numero de elementos del arreglo drinks del state drinks es mayor que 0)
    const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Recetas</h1>

            {/* Solamente si hay bebidas, se mostrara  */}
            {hasDrinks ? (
                // Aplica un diseño de cuadricula, cambia el numero de columnas segun el tamaño de la pantalla: por defecto 1 columna, mediano 2 columnas y grande 3 columnas
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                    {/* Itera con el state de drinks para mostrar cada bebida en el componente DrinkCard, pasa la prop drink con la bebida */}
                    {drinks.drinks.map((drink) => (
                        <DrinkCard
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}

                    {/* Realiza una busqueda en el formulario y mostrara la lista de las bebidas */}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    No hay resultados aún, utiliza el formulario para buscar recetas
                </p>
            )}
        </>
    )
}
