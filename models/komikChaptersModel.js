import mongoose from "mongoose";

const komikChaptersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    endpoint: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    relative: [{
        relative_title: {
            type: String,
            required: true
        },
        relative_endpoint: {
            type: String,
            required: true
        }
    }],
    images: [{
        image_link: {
            type: String,
            required: true
        },
        image_alt: {
            type: String,
            required: true
        }
    }]
})


export default mongoose.model('komikchapters', komikChaptersSchema)