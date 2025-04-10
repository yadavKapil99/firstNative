import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: String, required: true},
    discountedPrice: {type: Number},
    quantity: {type: String, required: true},
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    }
})

const Product = mongoose.model("Product", productSchema)

export default Product