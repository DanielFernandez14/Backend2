import { useState } from "react"
import { Layout } from "../components/Layout"
import { createProduct } from "../services/products"

const Dashboard = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Sin categoría")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setMessage(null)

        if (!name.trim() || !price.trim()) {
            setError("Debes completar los campos.")
            return
        }

        try {
            const response = await createProduct({ name, price, category })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || "Error del servidor")
            }

            const serverResponse = await response.json()
            console.log(serverResponse)

            setName("")
            setPrice("")
            setCategory("Sin categoría")
            setMessage("Producto agregado con éxito ID:" + serverResponse.data._id)

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Layout>
            <h1>Panel de Administración</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre del producto: </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="price">Precio del producto: </label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="category">Selecciona una categoria de producto: </label>
                <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Sin categoría">Sin categoría</option>
                    <option value="Almacén">Almacen</option>
                    <option value="Limpieza">Limpieza</option>
                </select>

                <button>Agregar Producto</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}
            </form>
        </Layout>
    )
}

export { Dashboard }
