// import { create } from 'zustand';
// import axiosInstance from "../config/axios.js";

// const usePostsStore = create((set) => ({
//     posts: [],
//     isPending: false,
//     isError: null,
//     createPost: async (post) => {
//        try {
//            set({ isPending: true , isError: null });
//            const res = await axiosInstance.post("/posts/create", post);
//            if (res.status === 201) {
//                set((state) => ({ posts: [...state.posts, res.data], isPending: false }));
//            }
//        } catch (error) {
           
//            console.error("Error creating post:", error);
//            set({ isError: error.message, isPending: false });
//        }
//     },
//     deletePost: async (postId) => {
//         try {
//             set({ isPending: true, isError: null });
//             const res = await axiosInstance.delete(`/posts/${postId}`);
//             if (res.status === 200) {
//                 set((state) => ({
//                     posts: state.posts.filter((post) => post._id !== postId),
//                     isPending: false
//                 }));
//             }
//         } catch (error) {
//             console.error("Error deleting post:", error);
//             set({ error: error.message, isPending: false });
//         }
//     },
//     commentPost: async (postId, comment) => {
//         try {
//             set({ isPending: true, isError: null });
//             const res = await axiosInstance.post(`/posts/${postId}/comments`, { text: comment });
//             if (res.status === 201) {
//                 set((state) => {
//                     const updatedPosts = state.posts.map((post) => {
//                         if (post._id === postId) {
//                             return { ...post, comments: [...post.comments, res.data] };
//                         }
//                         return post;
//                     });
//                     return { posts: updatedPosts, isPending: false };
//                 });
//             }
//         } catch (error) {
//             console.error("Error commenting on post:", error);
//             set({ error: error.message, isPending: false });
//         }
//     }
// }));


// export default usePostsStore;











import { create } from "zustand";
import axiosInstance from "../config/axios.js";
import toast from "react-hot-toast";

const usePostsStore = create((set) => ({
  posts: [],
  isPending: false,
  error: null,
  isDeleting: false,

  fetchPosts:async(postId)=>{
    set({isLoading:true});
    try {
        const res=await axiosInstance.get("/post");
        set({posts:res.data,isLoading:false});
    } catch (error) {
        set({error:error.message,isLoading:false});
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

}));

export default usePostsStore;