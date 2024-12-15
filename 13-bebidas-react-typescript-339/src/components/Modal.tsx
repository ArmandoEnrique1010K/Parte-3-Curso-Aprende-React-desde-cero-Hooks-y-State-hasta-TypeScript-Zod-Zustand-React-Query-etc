import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state) => state.closeModal)
    const selectedRecipe = useAppStore((state) => state.selectedRecipe)

    // Importa la función para agregar la receta (desde useAppStore, los slices se centralizan en useAppStore)
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)

    // Función para verificar que una receta exista en el state de favorites
    const favoriteExists = useAppStore((state) => state.favoriteExists)


    const renderIngredients = () => {
        const ingredients: JSX.Element[] = []

        for (let i = 1; i <= 6; i++) {

            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

            if (ingredient && measure) {
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                )
            }
        }

        return ingredients
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10"
                    onClose={closeModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {selectedRecipe.strDrink}
                                    </Dialog.Title>

                                    <img
                                        src={selectedRecipe.strDrinkThumb}
                                        alt={`Imagen de ${selectedRecipe.strDrink}`}
                                        className='mx-auto w-96'
                                    />

                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredientes y Cantidades
                                    </Dialog.Title>

                                    {renderIngredients()}

                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                    </Dialog.Title>

                                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                                    {/* Botones para cerrar la ventana modal y agregar receta a favoritos */}
                                    <div className='mt-5 flex justify-between gap-4'>
                                        <button
                                            type='button'
                                            className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500'
                                            // Evento onClick, llama a la función closeModal para cerrarlo, desde el store
                                            onClick={closeModal}
                                        >Cerrar</button>
                                        <button
                                            type='button'
                                            className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500'
                                            // Este evento debe tener un callback que llame a una función definida en el slide de favoritos (handleClickFavorite)

                                            // La receta seleccionada se encuentra en selectedRecipe, se le pasa a la función
                                            onClick={() => {
                                                handleClickFavorite(selectedRecipe)
                                                // Para cerrar la ventana modal al agregar o eliminar una receta, puedes llamar a la función closeModal, utiliza llaves en la función del evento onClick para agrupar el codigo de 2 lineas
                                                // closeModal()

                                                // Esa fue la forma más simple
                                            }}

                                        // // Al hacer clic en el botón, si se imprime recipe en la consola (desde favoritesSlice), se muestra un objeto que contiene los datos de la receta

                                        // Puedes hacer clic en ese botón para agregar o eliminar de favoritos (solamente si ya se encuentra la receta en el state favorites)
                                        >
                                            {/* Condición ternaria para mostrar el texto del botón, si favoriteExists es true o false */}
                                            {favoriteExists(selectedRecipe.idDrink) ? "Eliminar Favorito" : "Agregar a Favoritos"}
                                        </button>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}