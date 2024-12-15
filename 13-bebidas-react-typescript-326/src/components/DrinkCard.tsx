// Componente para mostrar una bebida

// Importa el type de Drink
import { Drink } from "../types"

// type para las props
type DrinkCardProps = {
    drink: Drink
}

// No olvidar asignar el type para la prop drink
export default function DrinkCard({ drink }: DrinkCardProps) {
    return (
        <div className="border shadow-lg">
            {/* La clase overflow-hidden evita el desbordamiento del elemento hijo (que se sobresalga del elemento como las transiciones) */}
            <div className="overflow-hidden">
                {/* Muestra la imagen de la bebida */}
                <img
                    // Esa propiedad contiene la ruta de la imagen
                    src={drink.strDrinkThumb}
                    alt={`Imagen de ${drink.strDrink}`}
                    // Cambia el tamaño de la imagen a un 125% cuando el cursor se coloque sobre la imagen, transition-transform aplica una transición y rotate-2 gira la imagen unos 2°
                    className="hover:scale-125 transition-transform hover:rotate-2"
                />
            </div>
            <div className="p-5">
                {/* Imprime el nombre de la bebida */}
                {/* La clase truncate acorta el texto en el caso de que sea muy largo */}
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>

                {/* Botón para mostrar la receta, aun no funcional */}
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
                >Ver receta</button>
            </div>
        </div>
    )
}
