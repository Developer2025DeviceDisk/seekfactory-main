import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient, Product, CreateProductData } from "@/lib/api";

interface ProductContextType {
  products: Product[];
  myProducts: Product[];
  categories: string[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchMyProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createProduct: (data: CreateProductData, images?: File[]) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>; // ✅ Add this
}


const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getProducts();
      console.log("🔥 Raw response:", res);

      // adjust according to backend shape
      if (Array.isArray(res)) {
        setProducts(res);
      } else if (res.success && res.data) {
        setProducts(res.data);
      } else if (res.success && res.products) {
        setProducts(res.products);
      }
    } finally {
      setLoading(false);
    }
  };

  // Inside ProductProvider
const fetchProductById = async (id: string) => {
  setLoading(true);
  try {
    const res = await apiClient.getProduct(id); // This should call `/api/products/:id`
    console.log("🔥 Product by ID response:", res);

    if (res.success && res.data) {
      return res.data;
    } else if (res.data) {
      return res.data; // fallback if backend sends product directly
    } else {
      return null;
    }
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
  } finally {
    setLoading(false);
  }
};


  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getMyProducts();

      if (res.success) setMyProducts(res.products);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await apiClient.getCategories();
      if (res.success) setCategories(res.categories);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const createProduct = async (data: CreateProductData, images?: File[]) => {
    const res = await apiClient.createProduct(data, images);
    if (res.success) {
      await fetchMyProducts();
      await fetchProducts();
    }
  };


  const updateProduct = async (id: string, data: Partial<Product>) => {
    const res = await apiClient.updateProduct(id, data);
    if (res.success) {
      await fetchMyProducts();
      await fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    const res = await apiClient.deleteProduct(id);
    if (res.success) {
      await fetchMyProducts();
      await fetchProducts();
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        myProducts,
        categories,
        loading,
        fetchProducts,
        fetchMyProducts,
        fetchCategories,
        createProduct,
        updateProduct,
        deleteProduct,
         fetchProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
