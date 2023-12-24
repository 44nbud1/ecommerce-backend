import express from "express";
import {createProductController} from "../controllers/product_controller.js";

const productRoute = express.Router();

productRoute.post("/create", createProductController)

export default productRoute;