import express from "express";
import { Product } from "../models/productSchema.js";
export const indexRouter = express.Router();

indexRouter.get("/", async (req, res) => {

    try {
        const products = await Product.find().sort({ createdAt: 'desc'}).limit(4)

        res.render("index", {products});
        // res.send(products)
    } catch(e) {

    }
    
})
