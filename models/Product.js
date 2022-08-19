import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        default: []
    }
})

export default mongoose.model('Product', ProductSchema)