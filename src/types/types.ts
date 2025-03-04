export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  description?: string;
  basePrice: number;
  imageUrl: string;
  rating?: number;
  specs?: { [key: string]: any };
  colorOptions?: ColorOption[];
  storageOptions?: StorageOption[];
  similarProducts?: Product[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  selectedStorage: string;
  price: number;
  image?: string;
}
