
import express from 'express';
import dbConn from "../config/db_connect.js";
import dotenv from "dotenv";
import userRoutes from "../routes/user_routes.js";
import {globalErrorHandler, notFoundHandler} from "../middlewares/global_error_handler.js";

// initialize environment variable
dotenv.config()

// connect to db
dbConn()

// initialize express
const app = express();

// pass incoming data, allow apps to receipt json format data
app.use(express.json())

// routes
app.use('/', userRoutes)

// err middleware
app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;
