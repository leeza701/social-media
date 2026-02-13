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


}));

export default useUserStore;