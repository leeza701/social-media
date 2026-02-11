import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost , deletePost,commentOnPost,likeOnPost,getAllPosts, getLikedPosts,getFollowingPosts,getUserPosts, savePosts, getSavedPosts} from "../controllers/post.controller.js";
const router=express.Router();

router.get("/",protectRoute,getAllPosts);
router.get("/following",protectRoute,getFollowingPosts);
router.get("/likes",protectRoute,getLikedPosts);
router.get("/user/:username",protectRoute,getUserPosts);
router.get("/saved",protectRoute,getSavedPosts);
router.post("/create",protectRoute,createPost);
 router.delete("/delete/:id",protectRoute,deletePost);
 router.post("/comment/:id",protectRoute,commentOnPost);
router.post("/like/:id",protectRoute,likeOnPost);
router.post("/save/:id",protectRoute,savePosts)

export default router;