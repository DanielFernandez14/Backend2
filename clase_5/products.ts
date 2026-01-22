interface Product {
    id: string,
    name: string,
    price: number,
    stock: boolean,
}



// UUID -> universal unique identifier
// 8f3c9b2a-7d41-4f6e-a8b9-2e5c1a7d93e4

// Un id tiene que teneer las siguientes caracteristicas
// Debe ser único, no se puede cambiar



const createProduct = (id: string, name: string, price: number, stock: boolean): Product => {
    return {id, name, price, stock}
}

const pc = createProduct(crypto.randomUUID(), "PC", 1000, true)
const mobile = createProduct(crypto.randomUUID(), "xiaomi", 2000, false)
const table = createProduct(crypto.randomUUID(), "mesa", 3000, true)

const product4 = {
    id: crypto.randomUUID(),
    name: "mouse",
    price: 45,
    stock: true,
    colors: ["red", "blue"]
}

const products: Product[] = [pc, mobile, table, product4]


const foundProduct = products.find(product => product.name === "PC")

if (foundProduct) {
    console.log(`La ${foundProduct?.name}, tiene un costo de $${foundProduct.price}.`)
} else {
    console.log("Producto no existente...")
}