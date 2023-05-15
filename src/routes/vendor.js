import express from "express";
export const vendorRouter = express.Router();
import { Product } from "../models/productSchema.js";
import { Vendor } from "../models/User.js"
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


vendorRouter.get('/profile', (req, res) => {
    console.log("Redirecting to my account page")
    res.render("my_account")
})

vendorRouter.post('/profile/update-picture', (req, res) => {
    const user = req.user
    const profilePicture = req.body.profilePicture

    if (profilePicture != null) {
        Vendor.findById(user.id)
        .then(vendor => {
            saveUserCover(vendor, profilePicture)
            const updatedVendor = new Vendor(vendor)
            return updatedVendor.save()
        })
        .then(() => {
            res.redirect('/users/vendor/profile')
        })
        .catch(e => {
            console.error(e)
        })
    } else {
        res.redirect('/users/vendor/profile')
    }

})


function saveUserCover(user, coverEncoded) {
    if (coverEncoded == null) return
    const profilePicture = JSON.parse(coverEncoded)
    if (profilePicture != null && imageMimeTypes.includes(profilePicture.type)) {
        user.profilePicture = new Buffer.from(profilePicture.data, 'base64')
        user.profilePictureType = profilePicture.type
    }
}