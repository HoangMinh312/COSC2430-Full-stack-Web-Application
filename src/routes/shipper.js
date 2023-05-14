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

shipperRouter.post('/active-order/:id/update-status', (req, res) => {
    const orderID = req.params.id
    const newStatus = req.body.status 
    Order.findByIdAndUpdate(orderID, {status: newStatus}, { new: true })
    .then(updatedOrder => {
        console.log(updatedOrder)
        res.redirect(`/users/shipper/active-order/${orderID}`)
    })
    .catch(err => {
        console.error(err)
    })
})

shipperRouter.get('/active-order/:id', (req, res) => {
    let order = null
    const orderID = req.params.id
    Order.findOne({ _id: orderID })
    .then(results => {
        order = results
        console.log("Active order to be displayed ", results)
        res.render("active_order_details", { order })
    })
    .catch(err => {
        console.error(err)
    })
})


shipperRouter.get('/', async (req, res) => {
    const user = req.user

    // Getting the shipper's distribution hub
    const distributionHub = user.distributionHub

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

    try {
        // let inactiveOrders = []
        const activeOrders = await Order.find({distributionHub: distributionHub, status: "Active"})
        const inactiveOrders = await Order.find({distributionHub: distributionHub, status: { $in: ['Cancelled', 'Delivered'] }})
        // inactiveOrders.push( await Order.find({distributionHub: distributionHub, status: "Cancelled"}))

        // console.log(inactiveOrders);
        res.render("shipper_page", { activeOrders, inactiveOrders })
        
    } catch (error) {
        console.log(error)
    }

})

