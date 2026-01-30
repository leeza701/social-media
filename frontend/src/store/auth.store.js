import  {create}  from "zustand";
import axiosInstance from "../config/axios.js";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    authUser: null,
    isPending: false,
    error: null,
    signup: async (formData) => {
        try {
            set({ isPending: true , error: null });
            const res = await axiosInstance.post('/auth/signup' , formData);
            set({ authUser: res.data });
            toast.success("Signup successful!");
        } catch (error) {
            const message =
                error.response?.data?.error || "Signup failed!";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ isPending: false });
        }
    },
    login: async (formData) => {
        try {
            set({ isPending: true , error: null });
            const res = await axiosInstance.post('/auth/login' , formData);
            set({ authUser: res.data });
            toast.success("Login successful!");
        } catch (error) {
            const message =
                error.response?.data?.error || "Login failed!";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ isPending: false });
        }
    },
  logout: async () => {
        try {
            set({ isPending: true, error: null });
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logout successful!");
        } catch (error) {
            const message = error.response?.data?.error || "Logout failed!";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ isPending: false });
        }
    }
}));

export default useAuthStore;