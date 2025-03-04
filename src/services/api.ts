import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

export const getProducts = async (search = "", limit = 20, offset = 0) => {
  try {
    const response = await api.get("/products", {
      params: { search, limit, offset },
    });
    const products = Array.isArray(response.data)
      ? response.data
      : response.data.products || [];
    if (products.length === 0) {
      console.warn("Warning: API returned an empty product list.");
    }
    return products;
  } catch (error) {
    console.error("Error fetching from API:", error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export default api;
