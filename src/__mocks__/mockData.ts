import { Product } from "../types/types";

export const mockProduct: Product = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  basePrice: 1329,
  imageUrl:
    "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.png",
  description:
    "El Samsung Galaxy S24 Ultra es un smartphone de gama alta con una pantalla Dynamic AMOLED 2X de 6.8 pulgadas, procesador Qualcomm Snapdragon 8 Gen 3 for Galaxy, y un avanzado sistema de cámara con inteligencia artificial.",
  colorOptions: [
    { name: "Phantom Black", hexCode: "#000000", imageUrl: "black.png" },
    { name: "Cream", hexCode: "#fffdd0", imageUrl: "cream.png" },
  ],
  storageOptions: [
    { capacity: "128GB", price: 1329 },
    { capacity: "256GB", price: 1399 },
  ],
  similarProducts: [
    {
      id: "XMI-14",
      brand: "Xiaomi",
      name: "14",
      basePrice: 899,
      imageUrl:
        "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XIA-RN13-mint-green.png",
      similarProducts: [],
    },
  ],
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: "3120 x 1440 pixels",
    processor: "Qualcomm Snapdragon 8 Gen 3 for Galaxy Octa-Core",
    mainCamera:
      "200 MP (F1.7) Principal, OIS + 10 MP (F2.4) Zoom x2 + 12 MP (F2.2) Ultra gran angular + 50 MP (F3.4) Zoom x5, OIS",
    selfieCamera: "12 MP",
  },
  rating: 4.6,
};

export const mockCachedProduct: Product = {
  ...mockProduct,
  id: "SMG-S24U-cached",
  name: "Cached S24 Ultra",
  basePrice: 999,
};

export const mockAPIProduct: Product = {
  ...mockProduct,
  id: "SMG-S24U-api",
  name: "API Fetched S24 Ultra",
  basePrice: 1234,
};
