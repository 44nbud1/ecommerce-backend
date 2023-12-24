import product from "../model/product.js"
import expressAsyncHandler from "express-async-handler";
import Product from "../model/product.js";

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/admin

export const createProductController = expressAsyncHandler(async (req, res) => {
    const {name, description, category, sizes, colors, user, images,price, totalQty} = req.body;

    const productExist = await Product.findOne({name})
    if (productExist) {
        throw new Error("product already exist")
    }

    const product = Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user,
        images,
        price,
        totalQty,
    })

    res.status(201).json({
        status: "success",
        message: "Product created",
        data: product,
    })
})