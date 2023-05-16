import express from "express";
export const customerRouter = express.Router();
import { Product, tags } from "../models/productSchema.js";
import pagination from "../middlewares/pagination.js"
import { Customer } from "../models/User.js"
import { Order } from "../models/Orders.js"
const imageMimeTypes = ['image/png', 'image/jpeg']


// Customer route
// users/customer
customerRouter.get("/", pagination, async (req, res) => {
    let productQuery = Product.find()
    const minPrice = req.query.minPrice || 0;
    const { page: currentPage, limit: pageSize, skip } = req.pagination

    if (checkQuery(req.query.category)) {
        productQuery = productQuery.regex('category', new RegExp(req.query.category, 'i'))
    }

    if (checkQuery(req.query.name)) {
        productQuery = productQuery.regex('name', new RegExp(req.query.name, 'i'))
    }

    productQuery = productQuery.where('price').gte(minPrice)
    if (checkQuery(req.query.maxPrice)) {
        productQuery = productQuery.lte('price', req.query.maxPrice)
    }

    if (checkQuery(req.query.sort)) {
        if (req.query.sort == 'priceAsc') {
            productQuery = productQuery.sort('price')
        } else if (req.query.sort == 'priceDesc') {
            productQuery = productQuery.sort('-price')
        }
    }

    productQuery = productQuery.skip(skip).limit(pageSize)

    try {
        const products = await productQuery.exec()
        const numberOfProducts = await Product.countDocuments({})
        const totalPage = countPages(numberOfProducts, pageSize)
        res.render("customer_shopping", {
            products,
            tags,
            pageInfo: {currentPage, totalPage, pageSize, numberOfProducts},
            searchOption: req.query,
            category: req.query.category,
            minMaxPrice: [req.query.minPrice, req.query.maxPrice]
        })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving products.'});
        console.log(error);
        // res.redirect("/")
    }
})

customerRouter.get('/shopping-cart', async (req, res) => {
    try {
        const shoppingCart = req.session.cart || []
        let cartItems = []    

        for (const item of shoppingCart) {
            const productId = item[1]
            const product = await Product.findById(productId)
            cartItems.push([item[0], product])
        }

        res.render("shopping_cart", { cartItems })
    } catch (error) {
        console.error(error)
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

// Add product to cart
customerRouter.get("/:id/add", (req, res) => {
    // Getting productQuantity from query
    const productQuantity = req.query.productQuantity
    // Getting shopping cart from session
    req.session.cart = req.session.cart || []
    // Adds the product to cart with quantity first then the product ID
    let productWithQuantity = [productQuantity, req.params.id]
    req.session.cart.push(productWithQuantity)
    res.redirect(`/users/customer/${req.params.id}`)
})

// Remove product from cart 
customerRouter.get("/:id/remove", (req, res) => {
    req.session.cart = req.session.cart || []
    const productId = req.params.id

    const itemIndex = req.session.cart.findIndex(item => item[1] === productId)

    if (itemIndex !== -1) {
        req.session.cart.splice(itemIndex, 1)
    }
    res.redirect("/users/customer/shopping-cart")
})

// Checkout shopping cart
customerRouter.post("/checkout", async (req, res) => {
    // Getting user and order information
    const user = req.user
    const checkoutSummary = req.body 
    const productIds = checkoutSummary.productId
    const productQuantity = checkoutSummary.productQuantity

    // Creating a new order
    if (Object.keys(checkoutSummary).length !== 0) {
        let products = []
        console.log(productIds)
        console.log(Array.isArray(productIds));
        console.log(productQuantity)
        // Iterating over the products in the checkout form
        for (let i = 0; i <productIds.length; i++) {
            const productId = productIds[i]
            const quantity = productQuantity[i]

            console.log("Product Id: " + productId);
            console.log("Product Quantity: " + quantity);
            // Finding the product by id
            // const product = await Product.findById(productId)
            // console.log(product);

            // Copying the products details to the order
            // const productObject = {
            //     name: product.name,
            //     brand: product.brand,
            //     quantity: quantity,
            //     price: product.price,
            // }

            // Adding the product to the products list
            // products.push(productObject)
        }
        // const newOrder = await Order.create({
        //     user: user.username,
        //     userFullName: user.name,
        //     userAddress: user.address,
        //     status: "Active",
        //     products: products,
        // })
        req.session.cart = []
        res.redirect("/users/customer/shopping-cart")
        
    } else {
        res.redirect("/users/customer")
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
        try {
            res.redirect(req.headers.referer)
        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    }
})


function checkQuery(query) {
    return query != null && query != '';
}

function countPages(numberOfDatas, limit) {
    return Math.ceil(numberOfDatas / limit);
}

function saveUserCover(user, coverEncoded) {
    if (coverEncoded == null) return
    const profilePicture = JSON.parse(coverEncoded)
    if (profilePicture != null && imageMimeTypes.includes(profilePicture.type)) {
        user.profilePicture = new Buffer.from(profilePicture.data, 'base64')
        user.profilePictureType = profilePicture.type
    }
}