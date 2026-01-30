import { create } from 'zustand';
import axiosInstance from "../config/axios.js";

const usePostsStore = create((set) => ({
    posts: [],
    isPending: false,
    isError: null,
    createPost: async (post) => {
       try {
           set({ isPending: true , isError: null });
           const res = await axiosInstance.post("/posts/create", post);
           if (res.status === 201) {
               set((state) => ({ posts: [...state.posts, res.data], isPending: false }));
           }
       } catch (error) {
           
           console.error("Error creating post:", error);
           set({ isError: error.message, isPending: false });
       }
    },
    deletePost: async (postId) => {
        try {
            set({ isPending: true, isError: null });
            const res = await axiosInstance.delete(`/posts/${postId}`);
            if (res.status === 200) {
                set((state) => ({
                    posts: state.posts.filter((post) => post._id !== postId),
                    isPending: false
                }));
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            set({ error: error.message, isPending: false });
        }
    },
    commentPost: async (postId, comment) => {
        try {
            set({ isPending: true, isError: null });
            const res = await axiosInstance.post(`/posts/${postId}/comments`, { text: comment });
            if (res.status === 201) {
                set((state) => {
                    const updatedPosts = state.posts.map((post) => {
                        if (post._id === postId) {
                            return { ...post, comments: [...post.comments, res.data] };
                        }
                        return post;
                    });
                    return { posts: updatedPosts, isPending: false };
                });
            }
        } catch (error) {
            console.error("Error commenting on post:", error);
            set({ error: error.message, isPending: false });
        }
    }
}));


export default usePostsStore;