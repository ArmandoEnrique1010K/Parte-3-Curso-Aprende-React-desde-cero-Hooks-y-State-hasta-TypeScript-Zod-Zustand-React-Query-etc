import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useAppStore } from "../stores/useAppStore"

export default function Layout() {

    // Extrae la función loadFromStorage del store
    const loadFromStorage = useAppStore((state) => state.loadFromStorage)

    // Recuerda que este layout se ejecuta en cualquiera de las 2 páginas
    useEffect(() => {
        // Llama a loadFromStorage
        loadFromStorage()

        // Ahora se mantienen los favoritos en localStorage
    }, [])
    return (
        <>
            <Header />

            <main className="container mx-auto py-16">
                <Outlet />
            </main>

            <Modal />
        </>
    )
}
