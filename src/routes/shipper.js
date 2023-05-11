import express from "express"
export const shipperRouter = express.Router();
import mongoose from "mongoose";

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

    // Getting the shipper's distribution hub
    const distributionHub = user.distributionHub
    console.log(distributionHub)

    // TESTING ORDER (REMEMBER TO COMMENT)
    // const newOrder = new Order({
    //     distributionHub: "District 2 Hub",
    //     products: ["Gaming chair", "Alexa"],
    //     user: "randomuser3",
    //     userFullName: "Hoang Thai Phuc",
    //     userAddress: "123124, District 7, Ho Chi Minh City",
    //     status: "Active"
    // })
    // newOrder.save()
    // .then(order => {
    //     console.log(order)
    // })
    // .catch(e => {
    //     console.error(e)
    // })
    // END OF TESTING ORDER
    let orders = []
    Order.find({distributionHub: distributionHub, status: "Active"})
    .then(results => {
        orders = results
        console.log("Active orders in the distribution hub: ", results)
        res.render("shipper_page", { user, orders})
    })
    .catch(err => {
        console.error(err)
    })
})

