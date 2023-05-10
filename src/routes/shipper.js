import express from "express"
export const router = express.Router();

import { Shipper } from "../models/User.js"
import { Order } from "../models/Orders.js"


// router.get('/', (req, res) => {
//     const user = req.user 
//     res.render('loggedin-shipper', { user })
// })

router.get('/:id', (req, res) => {
    const user = req.user
    res.render("shipper_page", { user })
})

router.get('/profile', (req, res) => {
    const user = req.user
    res.render("my_account", { user })
})