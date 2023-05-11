import express from "express"
export const shipperRouter = express.Router();

import { Shipper } from "../models/User.js"
import { Order } from "../models/Orders.js"


// router.get('/', (req, res) => {
//     const user = req.user 
//     res.render('loggedin-shipper', { user })
// })

shipperRouter.get('/profile', (req, res) => {
    const user = req.user
    console.log("Redirecting to my account page")
    res.render("my_account", { user })
})

shipperRouter.get('/:id', (req, res) => {
    const user = req.user
    res.render("shipper_page", { user })
})

