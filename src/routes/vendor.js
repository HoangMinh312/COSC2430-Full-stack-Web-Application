import express from "express";
export const vendorRouter = express.Router();
import { Product } from "../models/productSchema.js";
import fs, { rmSync } from "fs"
const imageMimeTypes = ['image/png', 'image/jpeg']

// Vendor route
// users/vendor
vendorRouter.get("/", (req, res) => {
    res.send('This is vendor page')
})

// users/vendor/addproduct
vendorRouter.get("/addproduct", (req, res) => {
    res.render("vendorAddProduct");
})

vendorRouter.post("/newproduct", async (req, res) => {
    // const {productName, price, description, brand, category} = req.body;
    const productData = req.body;


    // error checking
    let errors = []

    // Create new product
    try {
        const newProduct = await Product.create({
            name: productData.productName,
            price: productData.price,
            description: productData.description,
            stock: productData.stock,
            brand: productData.brand,
            category: productData.category,
            tags: []
        })
        saveProductCover(newProduct, productData.image)
        await newProduct.save()

        res.redirect("/users/vendor")
        // console.log(newProduct);
    } catch (e) {
        console.log(e.message)
        errors.push({msg: e.message})
        res.render("vendorAddProduct", {
                productData,
                errors
            })
    }
    // res.send(newProduct)
    // res.render("testProductPage", newProduct)
})

function saveProductCover(product, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        product.coverImage = new Buffer.from(cover.data, 'base64')
        product.coverImageType = cover.type
    }
}
