import { useEffect, useState } from "react"
import "./Products.css"

const App2 = () => {
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setNewProduct((prevValue) => ({
            ...prevValue,
            [name]: value
        }))
    }

    const handleSubmit = async (evento) => {
        evento.preventDefault()

        try {
            const response = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...newProduct,
                    price: Number(newProduct.price),
                    headers: {"Content-Type": "application/json"}
                })
            })

            const createdProduct = await response.json()

            console.log("Producto enviado:")
            console.log(createdProduct)

            setProducts((prevProducts) => [
                createdProduct,
                ...prevProducts
            ])

            setNewProduct({
                title: "",
                price: "",
                description: "",
                category: "",
                image: ""
            })
        } catch (error) {
            console.error("Error al crear producto:", error)
        }
    }

    useEffect(() => {
        const fetchingProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json()
            setProducts(data)
        }

        fetchingProducts()
    }, [])

    return (
        <div className="container">
            <h2>Productos</h2>

            <div className="grid">
                {products.map((product) => (
                    <div className="card" key={product.id ?? crypto.randomUUID()}>
                        <h2>{product.title}</h2>
                        <img src={product.image} alt={product.title} />
                        <p>${product.price}</p>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>

            <section className="add-product">
                <h2 className="h2Form">** --- Añadir producto --- **</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Nombre del producto"
                        value={newProduct.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Categoría"
                        value={newProduct.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="URL de la imagen"
                        value={newProduct.image}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción del producto"
                        value={newProduct.description}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        -- Agregar producto --
                    </button>
                </form>
            </section>
        </div>
    )
}

export { App2 }
