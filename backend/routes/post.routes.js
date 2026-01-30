import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost , deletePost,commentPost,likeUnlikePost,getAllPosts, getLikedPosts,getFollowingPosts,getUserPosts} from "../controllers/post.controller.js";
import { get } from "mongoose";
const router=express.Router();

router.get("/all",protectRoute,getAllPosts);
router.get("/following",protectRoute,getFollowingPosts);
router.get("/likes/:id",protectRoute,getLikedPosts);
router.get("/user/:username",protectRoute,getUserPosts);
router.post("/create",protectRoute,createPost);
 router.delete("/delete/:id",protectRoute,deletePost);
 router.post("/comment/:id",protectRoute,commentPost);
router.post("/like/:id",protectRoute,likeUnlikePost);

export default router;