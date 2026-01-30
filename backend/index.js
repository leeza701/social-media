import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authUser from './routes/auth.route.js';
import userRoutes from './routes/user.routes.js';   
import connectDB from './lib/db.js';
import postRoutes from './routes/post.routes.js';
import notificationRoutes from './routes/notification.route.js';
import cors from 'cors';
dotenv.config();
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.json());
app.use(cors({
    orign:"http://localhost:5173",
    Credentials:true,
}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/auth",authUser);
app.use("/api/users", userRoutes);
app.use("/api/post",postRoutes);
app.use("/api/notification",notificationRoutes);
app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on http://localhost:${PORT}`);
});