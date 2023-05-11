import express from "express";
export const userRouter = express.Router();
import { Product } from "../models/productSchema.js";
import { vendorRouter } from "./vendor.js";
import { shipperRouter } from "./shipper.js";
import { customerRouter } from "./customer.js";

// Customer route
// users/customer
userRouter.use("/customer", customerRouter)
userRouter.get("/customer", (req, res) => {
    res.render("customer_shopping");
})

// Vendor route
userRouter.use("/vendor", vendorRouter)


// Shipper route
userRouter.use("/shipper", shipperRouter)
