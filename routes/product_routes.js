import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
    createProductController, deleteProductController,
    getProductById,
    getProducts, updateProductController,
} from "../controllers/product_controller.js";

const productRoute = express.Router();

productRoute.post("/create", expressAsyncHandler(createProductController))
productRoute.get("/getProducts", expressAsyncHandler(getProducts))
productRoute.get("/product/:id", expressAsyncHandler(getProductById))
productRoute.put("/product/:id", expressAsyncHandler(updateProductController))
productRoute.delete("/product/:id/delete", expressAsyncHandler(deleteProductController))

export default productRoute;