import express from "express";
export const customerRouter = express.Router();
import { Product } from "../models/productSchema.js";
import { Customer } from "../models/User.js"
const imageMimeTypes = ['image/png', 'image/jpeg']

// Customer route
// users/customer
customerRouter.get("/", async (req, res) => {
    let productQuery = Product.find()
    if (checkQuery(req.query.category)) {
        productQuery = productQuery.regex('category', new RegExp(req.query.category, 'i'))
    }
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
            searchOption: req.query,
            category: req.query.category
        })
    } catch (error) {
        res.redirect("/")
    }
})

customerRouter.get('/profile', (req, res) => {
    console.log("Redirecting to my account page")
    res.render("my_account")
})

customerRouter.post('/profile/update-picture', (req, res) => {
    const user = req.user
    const profilePicture = req.body.profilePicture

    if (profilePicture != null) {
        Customer.findById(user.id)
        .then(customer => {
            saveUserCover(customer, profilePicture)
            const updatedCustomer = new Customer(customer)
            return updatedCustomer.save()
        })
        .then(() => {
            res.redirect('/users/customer/profile')
        })
        .catch(e => {
            console.error(e)
        })
    } else {
        res.redirect('/users/customer/profile')
    }

})

customerRouter.get("/:id", async (req, res) => {
    // res.send(`This is a product with id ${req.params.id}`)
    try {
        const product = await Product.findById(req.params.id)
        // res.send(product)
        res.render('productDetail', {product})
    } catch (error) {
        // Send users to the previous page in case sth wrong
        res.redirect(req.headers.referer).catch(err => {
            console.error(err);
            res.redirect('/'); // fallback URL
        });
    }
})

function checkQuery(query) {
    return query != null && query != '';
}


function saveUserCover(user, coverEncoded) {
    if (coverEncoded == null) return
    const profilePicture = JSON.parse(coverEncoded)
    if (profilePicture != null && imageMimeTypes.includes(profilePicture.type)) {
        user.profilePicture = new Buffer.from(profilePicture.data, 'base64')
        user.profilePictureType = profilePicture.type
    }
}