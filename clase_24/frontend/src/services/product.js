const BASE_API = "http://localhost:1234/api";

const getProducts = async () => {
    const response = await fetch(BASE_API + "/products");
    return response;
};

export { getProducts };
