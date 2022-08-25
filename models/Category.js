import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    miniImageUrl: {
        type: String
    },
    imageUrl: {
        type: String
    }
})

export default mongoose.model('category', CategorySchema)