import express from "express";
export const customerRouter = express.Router();
import { Product, tags } from "../models/productSchema.js";
import pagination from "../middlewares/pagination.js"

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

customerRouter.get('/profile', (req, res) => {
    console.log("Redirecting to my account page")
    res.render("my_account")
})

function checkQuery(query) {
    return query != null && query != '';
}

function countPages(numberOfDatas, limit) {
    return Math.ceil(numberOfDatas / limit);
}
