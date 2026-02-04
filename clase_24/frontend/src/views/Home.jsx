import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { getProducts } from "../services/product";
import "../styles/home.css";



const Home = () => {
    const [user, setUser] = useState(true)

    // realizar la peticion fetch
    // mostrar en el home la lista de productos
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        
        
        const response = await getProducts()
        const responseToJson = await response.json()

        setProducts(responseToJson.data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Layout>
            <h1>Listado de Productos</h1>
            <p>
                En esta sección se muestran los productos disponibles del sistema.
            </p>
            <section>
    {products.map((product) => (
        <div key={product._id}>
            <p><strong>ID:</strong> {product._id}</p>
            <p><strong>Nombre:</strong> {product.name}</p>
            <p><strong>Precio:</strong> {product.price}</p>
            <p><strong>Categoría:</strong> {product.category}</p>

            {
                user && <div>
                    <button>Actualizar</button>
                    <button>Borrar</button>
                </div>
            }

        </div>
    ))}
</section>



        </Layout>
    );
};

export { Home };
