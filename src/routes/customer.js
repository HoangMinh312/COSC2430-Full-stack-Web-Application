import express from "express";
export const customerRouter = express.Router();
import { Product } from "../models/productSchema.js";

// Customer route
// users/customer
customerRouter.get("/", async (req, res) => {
    let searchOption = {}
    if (req.query.name != null && req.query.name != '') {
        searchOption.name = new RegExp(req.query.name, 'i')
    }

    try {
        const products = await Product.find(searchOption)
        // res.send(products)
        res.render("customer_shopping", {
            products,
            searchOption: req.query
        })
    } catch (error) {
        res.redirect("/")
    }
})

customerRouter.get('/profile', (req, res) => {
    const user = req.user
    console.log("Redirecting to my account page")
    res.render("my_account", { user })
})

