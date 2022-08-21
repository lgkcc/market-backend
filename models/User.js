import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    purchaseHistory: {
        type: Array,
        default: []
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model('User', UserSchema)