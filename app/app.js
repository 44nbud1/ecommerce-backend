
import express from 'express';
import dbConn from "../config/db_connect.js";
import dotenv from "dotenv";
import userRoutes from "../routes/user_routes.js";
import {globalErrorHandler, notFoundHandler} from "../middlewares/global_error_handler.js";
import productRoute from "../routes/product_routes.js";

const apiV1Path = "/api/v1"

// initialize environment variable
dotenv.config()

// connect to db
dbConn()

// initialize express
const app = express();

// pass incoming data, allow apps to receipt json format data
app.use(express.json())

// routes
app.use(apiV1Path + '/users', userRoutes)
app.use(apiV1Path +'/product', productRoute)

// err middleware
app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;
