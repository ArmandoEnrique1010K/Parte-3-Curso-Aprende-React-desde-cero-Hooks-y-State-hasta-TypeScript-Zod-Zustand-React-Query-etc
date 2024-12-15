// Componente para mostrar una notificación
// El codigo se ha obtenido de: https://gist.github.com/codigoconjuan/1d5338590a7c7857bd2a4673830a2a86
// Instala hero icons con el comando "npm i @heroicons/react"
// Recuerda que HeroIcons y HeadlessUI solamente se utilizan en tecnologias de React y Vue.js

import { Fragment } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'
import { useAppStore } from '../stores/useAppStore'

export default function Notification() {

    // Establece que la notificación se mostrara
    // const notification = {
    //     show: true
    // }

    // En lugar de utilizar un objeto notification, se llama al state de notification definido en notificationSlice
    const notification = useAppStore((state) => state.notification)

    // Llama a la función para cerrar u ocultar la notificación
    const hideNotification = useAppStore((state) => state.hideNotification)

    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                <Transition
                    show={notification.show}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {/* Inyecta un icono, camia el icono dependiendo del la propiedad error del state notificacion */}
                                    {notification.error ? (
                                        // La prop aria-hidden se utiliza por un tema de compatibilidad
                                        <XCircleIcon className='h-6 w-6 text-red-400' aria-hidden="true" />
                                    ) : (
                                        <CheckCircleIcon className='h-6 w-6 text-green-400' aria-hidden="true" />
                                    )}
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">Notificación</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {/* Muestra el texto del state notification */}
                                        {notification.text}
                                    </p>
                                </div>
                                <div className="ml-4 flex flex-shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        // Evento, llama a la función para cerrar el botón al hacer clic en el icono de "X"
                                        onClick={hideNotification}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}
