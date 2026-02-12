import {create} from 'zustand';
import axiosInstance from '../config/axios.js';
import toast from 'react-hot-toast';
import useAuthStore from './auth.store.js';
const useUserStore=create((set)=>({
   user:null,
   isLoading:true,
   isFollowLoading:false,
   error:null,
   suggestedUser:[],
   isUpdatingProfile:false,
   fetchSuggestedUser:async() => {
    set({isLoading:true});
    try {
        const res=await axiosInstance.get("/users/suggested");
        set({suggestedUser:res.data,isLoading:false});
    } catch (error) {
        set({error:error.message,isLoading:false});
        console.log("Error fetching suggested users:", error);
    }
   },

   followUnFollowUser:async(userId)=>{
    set({isFollowLoading:true});
    try {
        const res=await axiosInstance.post(`/users/follow/${userId}`);
        set({isFollowLoading:false});
        // Refresh suggested users after follow/unfollow
        const suggestedRes = await axiosInstance.get("/users/suggested");
        set({suggestedUser:suggestedRes.data});
    } catch (error) {
        set({error:error.message,isFollowLoading:false});
        console.log("Error in followUnFollowUser:", error);
    }
   },

   fetchNotifications:async()=>{
    set({isLoading:true});
    try {
        const res=await axiosInstance.get("/notification");
        set({notifications:res.data,isLoading:false});
    } catch (error) {
        set({error:error.message,isLoading:false});
    }
   },

   getLikedPosts:async(postId)=>{
    try {
        set({isLoading:true});
        const res=await axiosInstance.get(`/post/likes/${postId}`);
        set({likedPosts:res.data,isLoading:false});
    } catch (error) {
        set({error:error.message,isLoading:false});
    }
   },

//    updateProfile:async(profileData)=>{
//     set({isUpdatingProfile:true,error:null});
//     try {
//         const res=await axiosInstance.post("/users/update",profileData);
//         set({user:res.data,isUpdatingProfile:false});
//         toast.success("Profile updated successfully");
//     } catch (error) {
//         set({error:error.message,isUpdatingProfile:false});
//         console.log("Error updating profile:", error);
//     }
//    }

updateProfile: async (profileData) => {
  set({ isUpdatingProfile: true, error: null });
  try {
    const res = await axiosInstance.post("/users/update", profileData);

    // Update auth store directly 🔥
    useAuthStore.getState().setAuthUser(res.data);

    set({ isUpdatingProfile: false });
    toast.success("Profile updated successfully!");
  } catch (error) {
    set({ error: error.message, isUpdatingProfile: false });
    toast.error("Failed to update profile");
  }
},




}));

export default useUserStore;