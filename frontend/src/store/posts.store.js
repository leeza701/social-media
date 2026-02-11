import { create } from "zustand";
import axiosInstance from "../config/axios.js";
import toast from "react-hot-toast";

const usePostsStore = create((set) => ({
  posts: [],
  isPending: false,
  error: null,
  isDeleting: false,
  savedPosts:[],
  savePostLoading:false,

  fetchPosts:async(postId)=>{
    set({isLoading:true});
    try {
        const res=await axiosInstance.get("/post");
        set({posts:res.data,isLoading:false});
    } catch (error) {
        set({isLoading:false});
    }
  },

  createPost: async (postData) => {
    set({ isPending: true, error: null });
    try {
      const res = await axiosInstance.post("/post/create", postData);
      set((state) => ({
        posts: [res.data.post, ...state.posts],
        isPending: false,
      }));
      toast.success("Post created successfully!");
    } catch (error) {
      set({
        error: error.response?.data?.message || "Something went wrong",
        isPending: false,
      });
      toast.error("Failed to create post");
    }
  },

  deletePost: async (postId) => {
   try {
    set({ isDeleting: true});
    await axiosInstance.delete(`/post/delete/${postId}`);
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
      isDeleting: false,
    }));
    toast.success("Post deleted successfully!");
   } catch (error) {
    set({
        error: error.response?.data?.message || "Something went wrong",
        isDeleting: false,
    })
    toast.error("Failed to delete post");

   }
  },
likeOnPost: async (postId) => {
  try {
    set({ isLiking: true });

    const res = await axiosInstance.post(`/post/like/${postId}`);

    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId ? res.data.post : post
      ),
      isLiking: false,
    }));
  } catch (error) {
    set({
      error: error.response?.data?.message || "Something went wrong",
      isLiking: false,
    });
  }
},

commentOnPost: async (postId, text) => {
  try {
    set({ isPending: true, error: null });
    const res = await axiosInstance.post(`/post/comment/${postId}`, { text });
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId ? res.data : post
      ),
      isPending: false,
    }));
    toast.success("Comment added successfully!");
  } catch (error) {
    set({
      error: error.response?.data?.message || "Something went wrong",
      isPending: false,
    });
    toast.error("Failed to add comment");
  }
},

fetchLikedPosts:async()=>{
    set({isLoading:true});
    try {
        const res=await axiosInstance.get("/post/likes");
        set({posts:res.data,isLoading:false});
    } catch (error) {
        set({isLoading:false});
    }
  },

  fetchFollowingPosts:async()=>{
    set({isLoading:true});    
    try {
        const res=await axiosInstance.get("/post/following");
        set({posts:res.data,isLoading:false});
    } catch (error) {
        set({isLoading:false});
    }
  },

  fetchUserPosts:async(username)=>{
    set({isLoading:true});  
    try {
      const res=await axiosInstance.get(`/post/user/${username}`);
      set({posts:res.data,isLoading:false});  
    } catch (error) {
        set({isLoading:false});
    }
  },

  savePosts: async (postId) => {
  try {
    set({ savePostLoading: true });

    const res = await axiosInstance.post(`/post/save/${postId}`);

    set({
      savedPosts: res.data.savedPosts
    });
    toast.success("Post saved successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to save post");
  } finally {
    set({ savePostLoading: false });
  }
  },
 getSavedPosts: async () => {
   set({ isLoading: true });
   try {
     const res = await axiosInstance.get("/post/saved");
     set({ savedPosts: res.data, isLoading: false });
   } catch {
     set({ isLoading: false });
   }
 }

}));

export default usePostsStore;