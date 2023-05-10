import mongoose from "mongoose"
import { Customer } from "../models/User.js"

const distributionHubs = ["District 1 Hub", "District 2 Hub", "District 7 Hub"]

const orderSchema = new mongoose.Schema({
    distributionHub: {
        type: String,
        required: true,
        enum: distributionHubs
    },
    products: {
        type: Array,
        required: true,
    },
    user: {
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
    }
})

const Order = mongoose.model('Product', orderSchema)

export { Order }