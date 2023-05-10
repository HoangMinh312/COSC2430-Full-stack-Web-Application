import express from "express";
export const userRouter = express.Router();
import { Product } from "../models/productSchema.js";

// Customer route
// users/customer
userRouter.get("/customer", (req, res) => {
    res.render("customer_shopping");
})

// Vendor route
// users/vendor
userRouter.get("/vendor", (req, res) => {
    res.send('This is vendor page')
})

// users/vendor/addproduct
userRouter.get("/vendor/addproduct", (req, res) => {
    res.render("vendorAddProduct");
})

userRouter.post("/vendor/newproduct", async (req, res) => {
    // const {productName, price, description, brand, category} = req.body;
    const productData = req.body;
    // let errors = []

    // error checking

    // Create new product
    try {
        const newProduct = await Product.create({
            name: productData.productName,
            image: undefined,
            price: productData.price,
            description: productData.description,
            brand: productData.brand,
            category: productData.category,
            tags: []
        })
        console.log(newProduct);
    } catch (e) {
        console.log(e.message)
        res.render("vendorAddProduct", {
                productName: productData.productName,
                image: undefined,
                price: productData.price,
                description: productData.description,
                brand: productData.brand,
                category: productData.category,
                tags: [],
                errors: [{msg: e.message}]
            })
    }
        // if (err) {
        //     res.render("vendorAddProduct", {
        //         productData,
        //         errors: err
        //     });
        // } else {

        // }{hasjha: ahsajs, {asgasg: ahsja, sjhdjd: kjaak}}

    // res.send(newProduct)
    // res.render("testProductPage", newProduct)
})