import { create } from "zustand";

const API = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      set({ user: data.user, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      set({ user: data.user, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  logout: async () => {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Logout failed:", err.message);
    }
    set({ user: null });
  },

  getProfile: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${API}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        set({ user: data.user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (err) {
      console.warn("Unable to restore session.");
      set({ user: null, loading: false });
    }
  },
}));
