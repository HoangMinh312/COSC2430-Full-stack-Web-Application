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
    console.log("Redirecting to my account page")
    res.render("my_account")
})

shipperRouter.post('/profile/update-picture', (req, res) => {
    
})

shipperRouter.get('/active-order/:id', (req, res) => {
    let order = null
    Order.findOne({ _id: req.params.id })
    .then(results => {
        order = results
        console.log("Active orders to be displayed ", results)
        res.render("active_order_details", { order })
    })
    .catch(err => {
        console.error(err)
    })
})


shipperRouter.get('/', (req, res) => {
    const user = req.user

    // Getting the shipper's distribution hub
    const distributionHub = user.distributionHub
    console.log(distributionHub)

    // TESTING ORDER (REMEMBER TO COMMENT)
    // const newOrder = new Order({
    //     distributionHub: "District 2 Hub",
    //     products: ["Gaming chair", "Alexa"],
    //     user: "randomuserwithtime",
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
        res.render("shipper_page", { orders })
    })
    .catch(err => {
        console.error(err)
    })
})

