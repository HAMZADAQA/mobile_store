import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

const isDevelopment = import.meta.env.VITE_ENV === "development";

export const getProducts = async (search = "", limit = 20, offset = 0) => {
  if (isDevelopment)
    try {
      const response = await api.get("/products", {
        params: { search, limit, offset },
      });
      if (!response.data || response.data.length === 0) {
        console.warn("Warning: API returned an empty product list.");
        return [];
      }

      if (isDevelopment) return response.data;
    } catch (error) {
      console.error("Error fetching from API:", error);
      return [];
    }
};

export const getProductById = async (id: string) => {
  if (isDevelopment)
    try {
      const response = await api.get(`/products/${id}`);

      if (!response.data) {
        console.warn(`Warning: No product found for ID ${id}`);
        return null;
      }

      if (isDevelopment) return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
};

export default api;
