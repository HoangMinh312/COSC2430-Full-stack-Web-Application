import express from "express";
export const customerRouter = express.Router();
import { Product } from "../models/productSchema.js";

// Customer route
// users/customer
customerRouter.get("/", async (req, res) => {
    let productQuery = Product.find()
    if (checkQuery(req.query.name)) {
        productQuery = productQuery.regex('name', new RegExp(req.query.name, 'i'))
    }
    if (checkQuery(req.query.minPrice)) {
        productQuery = productQuery.gte('price', req.query.minPrice)
    }
    if (checkQuery(req.query.maxPrice)) {
        productQuery = productQuery.lte('price', req.query.maxPrice)
    }

    try {
        const products = await productQuery.exec()
        // res.send(products)
        res.render("customer_shopping", {
            products,
            searchOption: req.query
        })
    } catch (error) {
        res.redirect("/")
    }
})

function checkQuery(query) {
    return query != null && query != '';
}
