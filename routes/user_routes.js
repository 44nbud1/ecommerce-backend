import express from "express";
import {
    getUserProfileController,
    loginUserController,
    registerUserController
} from "../controllers/users_controller.js";
import {isLoggedIn} from "../middlewares/is_logged_in.js";

const userRoutes = express.Router();

userRoutes.post('/register',registerUserController)
userRoutes.post('/login',loginUserController)
userRoutes.get('/profile',isLoggedIn, getUserProfileController)

export default userRoutes;