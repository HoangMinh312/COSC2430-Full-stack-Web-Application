import express from "express";
export const vendorRouter = express.Router();
import { Product } from "../models/productSchema.js";
import { categories, tags } from "../models/productSchema.js";
import { Vendor } from "../models/User.js"
const imageMimeTypes = ['image/png', 'image/jpeg']

// Variables

// Vendor route
// users/vendor
vendorRouter.get("/", async (req, res) => {
    const user = req.user
    try {
        const products = await Product.find({publisher: user})
        res.render("vendor_page", { products })
    } catch (error) {
    }
})

// users/vendor/addproduct
vendorRouter.get("/addproduct", (req, res) => {
    res.render("add_new_product", {categories, tags});
})

vendorRouter.post("/newproduct", async (req, res) => {
    const productData = req.body;
    const publisher = req.user;

    // error checking
    let errors = []

    if (!productData.name) {
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

    // Create new product
    try {
        if (errors.length > 0) throw new Error("Failed creating new product")
        const newProduct = await Product.create({
            name: productData.name,
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
    } catch (e) {
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





// Update and Delete Product
vendorRouter.post("/:id/update", async (req, res) => {
    const productData = req.body;
    const productId = req.params.id;
    const publisher = req.user;

    // error checking
    let errors = []

    if (!productData.name) {
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

    try {
        if (errors.length > 0) throw new Error("Failed updating product")
        
        const product = await Product.findById(productId)
        
        
        if (!product) {
            errors.push({ msg: "Product not found" })
            throw new Error("Failed updating product")
        }

        // Update the product
        product.name = productData.name
        product.price = productData.price
        product.description = productData.description
        product.stock = productData.stock
        product.brand = productData.brand
        product.category = productData.category
        product.publisher = publisher

        if (productData.image) {
            saveProductCover(product, productData.image)
        }
        await product.save()

        res.redirect(`/users/vendor/${productId}`)
    } catch (e) {
        errors.splice(0, 0, { msg: e.message })
        res.render("vendorUpdateProduct", {
            productData,
            categories,
            tags,
            errors
        })
    }
})

vendorRouter.get("/:id/delete", async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findOneAndDelete({ _id: productId });
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      res.redirect("/users/vendor");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

vendorRouter.get('/profile', (req, res) => {
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
        })
    } else {
        res.redirect('/users/vendor/profile')
    }

})


// Vendor Accessing their products page
vendorRouter.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.render("vendorProductDetail", { productData: product , categories })
    } catch (error) {
        res.send(error.message)
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