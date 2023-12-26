
import expressAsyncHandler from "express-async-handler";
import Product from "../model/product.js";
import product from "../model/product.js";


// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/admin

//Post Method
export const createProductController = async (request, response) => {

    const {name, description, category, sizes, colors, user, images,price, totalQty, brand} = request.body;

    // prepare data
    const productEntity = new Product({
        name: name,
        description: description,
        category: category,
        sizes: sizes,
        colors:colors,
        user: user,
        images: images,
        price: price,
        totalQty:totalQty,
        brand: brand,
    })

    const productExist = await Product.findOne({name}, undefined,undefined)

    if (productExist) {
        throw new Error("product already exist")
    }

    await productEntity.save()

    response.status(201).json({
        status: "success",
        message: "Product created",
        data: productEntity,
    })
}

// @desc    Get all products
// @route   POST /api/v1/products
// @access  public

export const getProducts = async (req, res)  => {

    let productQuery = Product.find(undefined, undefined, undefined)

    // search by name
    if (req.query.name) {
        productQuery = productQuery.find({
            name: {$regex: req.query.name, $options: "i"}
        })
    }

    // search by brand
    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: {$regex: req.query.brand, $options: "i"}
        })
    }

    // search by category
    if (req.query.category) {
        productQuery = productQuery.find({
            category: {$regex: req.query.category, $options: "i"}
        })
    }

    // search by color
    if (req.query.color) {
        productQuery = productQuery.find({
            colors: {$regex: req.query.color, $options: "i"}
        })
    }

    // search by size
    if (req.query.size) {
        productQuery = productQuery.find({
            // ignore case-sensitive with regex
            size: {$regex: req.query.size, $options: "i"}
        })
    }

    // filter by price range
    if (req.query.price) {
        const priceRange = req.query.price.split("-")

        // filter by price range
        productQuery = productQuery.find({
            price: {$gte:priceRange[0], $lte: priceRange[1]}
        })
    }

    // pagination
    // page
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

    // limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    // startIdx
    const startIndex = (page-1) * limit;

    // endIndex
    const endIndex = page * limit;
    // total product
    const  total = await Product.countDocuments()

    productQuery = productQuery.skip(startIndex).limit(limit)

    const products = await productQuery;

    res.status(201).json({
        status: "success",
        data: products,
        page: page ,
        results: products.length,
        total,
        limit,
    })
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id, undefined, undefined)
    if (!product) {
        throw new Error("Product not found")
    }

    res.json({
        msg: "successfully",
        product,
    })
}

export const updateProductController = async (req, res) => {
    const {name, description, category, sizes, colors, user, images,price, totalQty, brand} = req.body;

    const id = req.params.id;
    const updatedData = req.body;

    const prod = await Product.findByIdAndUpdate(id,
        {
                name: name,
                description: description,
                category: category,
                sizes: sizes,
                colors:colors,
                user: user,
                images: images,
                price: price,
                totalQty:totalQty,
                brand: brand,
            },
        {new: true})

    res.json({
        msg: "successfully",
        prod,
    })
}


export const deleteProductController = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id, undefined)
    if (!product) {
        throw new Error("Product not found")
    }

    res.json({
        msg: "deleted product",
        product,
    })
}