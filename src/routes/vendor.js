import express from "express";
export const vendorRouter = express.Router();
import { Product } from "../models/productSchema.js";
import fs from "fs"
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
    // const imgPicture = req.file;
    // console.log(imgPicture)
    const fileData = fs.readFileSync(req.file.path);
    const contentType = req.file.mimetype;
    // let errors = []

    // error checking

    // Create new product
    try {
        const newProduct = await Product.create({
            name: productData.productName,
            image: {
                data: fileData,
                contentType: contentType
            },
            price: productData.price,
            description: productData.description,
            brand: productData.brand,
            category: productData.category,
            tags: []
        })
        // console.log(newProduct);
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