import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getNotifications , deletedNotification,deleteOneNotification} from "../controllers/notifications.controller.js";
const router=express.Router();

router.get("/",protectRoute,getNotifications);
router.delete("/",protectRoute,deletedNotification);
router.delete("/:id",protectRoute,deleteOneNotification);

export default router;