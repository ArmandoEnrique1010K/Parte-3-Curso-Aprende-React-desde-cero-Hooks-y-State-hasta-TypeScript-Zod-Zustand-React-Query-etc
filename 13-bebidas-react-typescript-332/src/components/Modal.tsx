// HEADLESS UI

// Es un componente de tailwind que se utiliza en proyectos con VueJs y React, utiliza codigo para realizar los efectos y puedes personalizar el diseño con tailwindcss

// Documentación: https://headlessui.com/react/dialog
// Codigo obtenido de: https://gist.github.com/codigoconjuan/de54c2f3bbacd80f57359c09c79dba0f

// Comando para instarlo en el proyecto: npm install @headlessui/react

// Este componente contiene la ventana modal 
import { Dialog, Transition } from '@headlessui/react';
import { Fragment /*, useState*/ } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

    // State de prueba para mostrar u ocultar la ventana modal
    // puedes cambiarlo aqui a true para ver la ventana modal
    // const [modal, useModal] = useState(false)

    // Llama al state global de modal definido en recipeSlice
    const modal = useAppStore((state) => state.modal)

    // Llama a la acción (función) de cerrar la ventana modal
    const closeModal = useAppStore((state) => state.closeModal)

    // Extrae la información de la receta con el state de selectedRecipe
    const selectedRecipe = useAppStore((state) => state.selectedRecipe)

    // Función para renderizar los ingredientes
    const renderIngredients = () => {

        // Define un nuevo arreglo, se establece el type JSX.Element, porque el componente devolvera un arreglo de elementos HTML
        const ingredients: JSX.Element[] = []

        // Bucle for clasico para iterar (el indice se establece en 1 porq)
        for (let i = 1; i <= 6; i++) {

            // Puedes ver que en recipes-schema se definio RecipeAPIResponseSchema, un objeto que posee 6 ingredientes y 6 cantidades, el nombre para esas propiedades tienen una sintaxis en comun
            // strIngredient1, strIngredient2, strIngredient3, etc.

            // Propiedades dinamicas del objeto selectedRecipe (state), recuerda que se utiliza [] para buscar una propiedad dinamica y se añade un "as keyof Recipe" para que no sea un type any se establece un type Recipe, keyof utiliza cualquier llave de Recipe para establecer el tipo de dato para la propiedad (string o null)
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

            // Si posee un valor el ingrediente y la cantidad a la vez
            if (ingredient && measure) {
                // Utiliza el metodo push para inyectar o agregar un nuevo elemento al arreglo de ingredients

                // Como no se trata de un state, se puede utilizar push para mutar el arreglo original y llenarlo de información
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                )
            }

        }

        // El componente debe retornar elementos HTML, el arreglo de ingredients
        // return <p>Desde RenderIngredients</p>
        return ingredients
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10"
                    // La prop onClose es un evento que contiene una función para cerrar la ventana modal
                    // onClose={() => { }}
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
                                        {/* Muestra el titulo de la bebida */}
                                        {selectedRecipe.strDrink}
                                    </Dialog.Title>

                                    {/* Muestra la imagen */}
                                    <img
                                        src={selectedRecipe.strDrinkThumb}
                                        alt={`Imagen de ${selectedRecipe.strDrink}`}
                                        // Ancho de 24rem
                                        className='mx-auto w-96'
                                    />

                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredientes y Cantidades
                                        {/* Los ingredientes y cantidades son dinamicos (varian en numero) */}
                                    </Dialog.Title>

                                    {/* Llama a la función */}
                                    {renderIngredients()}

                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                    </Dialog.Title>

                                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}