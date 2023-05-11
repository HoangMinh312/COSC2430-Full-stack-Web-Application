import mongoose from "mongoose";

export const category = ['Electronic and Appliances', 'Clothes', 'Food and Beverages']
// tags
const ageTags = ['young adult', 'middle-aged', 'senior']
const priceRangeTags = ['budget-friendly', 'luxury']
const genderTags = ['male', 'female']
export const tags = [].concat(...[ageTags, priceRangeTags, genderTags]) 

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
    stock: {
        type: Number,
        required: true,
        min: 1
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
        enum: tags,
        default: []
    }
})

// create models for each user type
const Product = mongoose.model('Product', productSchema)

export { Product }
