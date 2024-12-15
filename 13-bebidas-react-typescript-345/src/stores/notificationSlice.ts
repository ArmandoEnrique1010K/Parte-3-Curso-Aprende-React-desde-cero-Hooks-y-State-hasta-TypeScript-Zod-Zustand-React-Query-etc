// Slice para las notificaciones
import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

// Type para una notificación
type Notification = {
    // El mensaje como un string
    text: string
    // Mensaje de error o de exito
    error: boolean
    // Mostrar u ocultar la notificación
    show: boolean
}

// Contiene el type para este slice de notificaciones
export type NotificactionSliceType = {
    notification: Notification
    // Para la función de showNotificacion, requiere un payload, toma el type de Notification, pero solamente los campos text y error
    showNotificaction: (payload: Pick<Notification, 'text' | 'error'>) => void
    // Type para la función de cerrar notificación
    hideNotification: () => void
}


// Utiliza la definición del slice de favorite para 
// export const createFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({


// Se utiliza dos types conectados
export const createNotificationSlice: StateCreator<NotificactionSliceType & FavoritesSliceType, [], [], NotificactionSliceType> = (set, get) => ({
    // Estado inicial para notification
    // notification: {} as Notification
    // Puedes optar por establecer valores iniciales cada propiedad de manera individual
    notification: {
        text: '',
        error: false,
        show: false,
    },

    // Función para mostrar notificación
    showNotificaction: (payload) => {
        // Establece en el state de notificatión lo siguiente en base al type asignado
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                // Siempre sera true, de lo contrario no se muestra
                show: true
            }
        })

        // Luego de 5 segundos llamara a hideNotification para cerrar la notificación
        setTimeout(() => {
            get().hideNotification()
        }, 5000)
    },

    // Función para cerrar la notificación
    hideNotification: () => {
        // Establece los valores iniciales en el state notification
        set({
            notification: {
                text: '',
                error: false,
                // no muestra la notificación
                show: false,
            },
        })
    }
})