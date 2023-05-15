import mongoose from "mongoose"

const distributionHubs = ["District 1 Hub", "District 2 Hub", "District 7 Hub"]

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    }, 
    brand: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    }
})

const orderSchema = new mongoose.Schema({
    distributionHub: {
        type: String,
        required: true,
        enum: distributionHubs
    },
    products: {
        type: productSchema,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    userFullName: {
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Delivered", "Canceled"]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

export { Order }