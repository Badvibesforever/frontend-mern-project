import { create } from "zustand";

const API = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create product");

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch(`${API}/api/products`, {
        credentials: "include",
      });

      const data = await res.json();
      set({ products: data.data || [] });
    } catch (err) {
      console.error("Fetch products failed:", err);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`${API}/api/products/${pid}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
}));
