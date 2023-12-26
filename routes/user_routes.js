import express from "express";
import {
    getUserProfileController,
    loginUserController,
    registerUserController
} from "../controllers/users_controller.js";
import {isLoggedIn} from "../middlewares/is_logged_in.js";
import expressAsyncHandler from "express-async-handler";

const userRoutes = express.Router();

userRoutes.post('/register',expressAsyncHandler(registerUserController))
userRoutes.post('/login',expressAsyncHandler(loginUserController))
userRoutes.get('/profile',isLoggedIn, expressAsyncHandler(getUserProfileController))

export default userRoutes;