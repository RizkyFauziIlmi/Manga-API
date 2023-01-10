import mongoose from "mongoose";

const komikListSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumb: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    warna: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    }
})

export default mongoose.model('komiklists', komikListSchema)