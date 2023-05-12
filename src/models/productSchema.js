import mongoose, { Mongoose } from "mongoose";

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
    coverImage: {
        type: Buffer
        // contentType: String
    },
    coverImageType: {
        type: String
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
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendor",
        default: "no publisher"
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

productSchema.virtual('imageCoverData').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
    return undefined
})

// create models for each user type
const Product = mongoose.model('Product', productSchema)

export { Product }
