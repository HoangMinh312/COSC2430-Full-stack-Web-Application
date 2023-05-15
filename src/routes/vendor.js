import express from "express";
export const vendorRouter = express.Router();
import { Product } from "../models/productSchema.js";
const imageMimeTypes = ['image/png', 'image/jpeg']
import { categories, tags } from "../models/productSchema.js";

// Variables

// Vendor route
// users/vendor
vendorRouter.get("/", (req, res) => {
    res.send('This is vendor page')
})

// users/vendor/addproduct
vendorRouter.get("/addproduct", (req, res) => {
    res.render("vendorAddProduct", {categories, tags});
})

vendorRouter.post("/newproduct", async (req, res) => {
    // const {productName, price, description, brand, category} = req.body;
    const productData = req.body;
    const publisher = req.user;
    // console.log(publisher)

    // error checking
    let errors = []

    if (!productData.productName) {
        errors.push({ msg: "Product name cant be empty" })
    }

    if (!productData.price) {
        errors.push({ msg: "Price cant be empty" })
    }

    if (productData.price < 0) {
        errors.push({ msg: "Price cant be a negative number" })
    }

    if (!productData.description) {
        errors.push({ msg: "Description cant be empty" })
    }

    if (!productData.stock) {
        errors.push({ msg: "Stock cant be empty" })
    }

    if (productData.stock < 1) {
        errors.push({ msg: "There must be at least 1 item in stock" })
    }

    // console.log(publisher);

    // Create new product
    try {
        if (errors.length > 0) throw new Error("Failed creating new product")
        const newProduct = await Product.create({
            name: productData.productName,
            price: productData.price,
            description: productData.description,
            stock: productData.stock,
            publisher: publisher,
            brand: productData.brand,
            category: productData.category,
            tags: []
        })
        saveProductCover(newProduct, productData.image)
        await newProduct.save()

        res.redirect("/users/vendor")
        // console.log(newProduct);
    } catch (e) {
        // console.log(e.message)
        errors.splice(0, 0, { msg: e.message })
        res.render("vendorAddProduct", {
            productData,
            categories,
            tags,
            errors
        })
    }
})

function saveProductCover(product, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        product.coverImage = new Buffer.from(cover.data, 'base64')
        product.coverImageType = cover.type
    }
}

vendorRouter.get('/profile', (req, res) => {
    console.log("Redirecting to my account page")
    res.render("my_account")
})