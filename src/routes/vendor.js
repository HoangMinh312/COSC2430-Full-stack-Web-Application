import express from "express";
export const vendorRouter = express.Router();
import { Product } from "../models/productSchema.js";
import fs, { rmSync } from "fs"
import multer from "multer"
const upload = multer({ dest: 'uploads/' });

// Vendor route
// users/vendor
vendorRouter.get("/", (req, res) => {
    res.send('This is vendor page')
})

// users/vendor/addproduct
vendorRouter.get("/addproduct", (req, res) => {
    res.render("vendorAddProduct");
})

vendorRouter.post("/newproduct", upload.single("image"), async (req, res) => {
    // const {productName, price, description, brand, category} = req.body;
    const productData = req.body;

    if (req.file != undefined) {
        const fileData = fs.readFileSync(req.file.path);
        const contentType = req.file.mimetype;
    }

    // error checking
    let errors = []

    // Create new product
    try {
        const newProduct = await Product.create({
            name: productData.productName,
            // image: {
            //     data: fileData,
            //     contentType: contentType
            // },
            price: productData.price,
            description: productData.description,
            stock: productData.stock,
            brand: productData.brand,
            category: productData.category,
            tags: []
        })
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

vendorRouter.get('/profile', (req, res) => {
    const user = req.user
    console.log("Redirecting to my account page")
    res.render("my_account", { user })
})