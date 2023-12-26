import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },category: {
            type: String,
            ref: "Category",
            required: false,
        },size: {
            type: [String],
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true,
        },colors: {
            type: [String],
            required: true,
        },user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
        },images: [
            {
                type: String,
                default: "",
            }

        ],reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            }
        ],

        price: {
            type: Number,
            required: true,
        },

        totalQty: {
            type: Number,
            required: true,
        },

        totalSold: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: {virtuals: true}
    }
);

// module.exports = mongoose.model("Product", ProductSchema);
export default mongoose.model("Product", ProductSchema);

// const dataSchema = new mongoose.Schema({
//     name: {
//         required: true,
//         type: String
//     },
//     age: {
//         required: true,
//         type: Number
//     }
// })
//
// module.exports = mongoose.model('Data', dataSchema)