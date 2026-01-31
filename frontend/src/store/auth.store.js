import { create } from "zustand";
import axiosInstance from "../config/axios.js";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: true,
  isPending: false,
  error: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      const userData = res.data.user || res.data;
      if (userData) {
        set({ authUser: userData, isLoading: false });
      } else {
        set({ authUser: null, isLoading: false });
      }
    } catch (error) {
      set({ authUser: null, isLoading: false });
      if (error.response?.status !== 401) {
        toast.error("Failed to fetch user data");
      }
    } finally {
      set((state) => {
        if (state.isLoading) {
          return { isLoading: false };
        }
        return {};
      });
    }
  },

  signup: async (formData) => {
    try {
      set({ isPending: true, error: null });
      const res = await axiosInstance.post("/auth/signup", formData);
      const userData = res.data.user || res.data;
      set({ authUser: userData, error: null, isLoading: false });
      toast.success("Signup successful!");
      return userData;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signup failed!";
      set({ error: message, authUser: null, isLoading: false });
      toast.error(message);
      throw error;
    } finally {
      set({ isPending: false });
    }
  },

  login: async (formData) => {
    try {
      set({ isPending: true, error: null });
      const res = await axiosInstance.post("/auth/login", formData);
      const userData = res.data.user || res.data;
      set({ authUser: userData, error: null, isLoading: false });
      toast.success("Login successful!");
      return userData;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed!";
      set({ error: message, authUser: null, isLoading: false });
      toast.error(message);
      throw error;
    } finally {
      set({ isPending: false });
    }
  },

  logout: async () => {
    try {
      set({ isPending: true, error: null });
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful!");
    } catch (error) {
      const message = error.response?.data?.error || "Logout failed!";
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isPending: false });
    }
  },
}));

export default useAuthStore;