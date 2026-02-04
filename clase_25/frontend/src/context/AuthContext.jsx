import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    // Recuperar sesión al cargar la app
    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if (!savedToken) return

        try {
            setToken(savedToken)
            setUser(jwtDecode(savedToken))
        } catch (error) {
            localStorage.removeItem("token")
            setToken(null)
            setUser(null)
        }
    }, [])

    // Se ejecuta SOLO cuando el login es correcto
    const handleToken = (newToken) => {
        if (!newToken) return

        try {
            const decoded = jwtDecode(newToken)

            localStorage.setItem("token", newToken)
            setToken(newToken)
            setUser(decoded)

            console.log("✅ LOGIN - token:", newToken)
            console.log("✅ LOGIN - user:", decoded)
        } catch (error) {
            console.error("❌ Token inválido:", error)
            localStorage.removeItem("token")
            setToken(null)
            setUser(null)
        }
    }

    // Se ejecuta SOLO al cerrar sesión
    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, handleToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de <AuthProvider>")
    }
    return ctx
}

export { AuthProvider, useAuth }
