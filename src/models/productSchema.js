import mongoose from "mongoose";

const category = ['Electronic and Appliances', 'Clothes', 'Food and Beverages']

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        default: "no Brand"
    },
    category: {
        type: String,
        required: true,
        enum: category
    },
    tags: {
        type: [String],
        default: []
    }
})

// create models for each user type
const Product = mongoose.model('Product', productSchema)

export { Product }
