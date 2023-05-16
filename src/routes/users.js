import express from "express";
export const userRouter = express.Router();
import { Product } from "../models/productSchema.js";
import { vendorRouter } from "./vendor.js";
import { shipperRouter } from "./shipper.js";
import { customerRouter } from "./customer.js";

// Checking userTypes

const checkCustomer = (req, res, next) => {
    const userType = res.locals.userType
    if (userType !== "Customer") {
        res.status(403).send("You do not have access to this resource")
    } else {
        next()
    }
}

const checkVendor = (req, res, next) => {
    const userType = res.locals.userType
    if (userType !== "Vendor") {
        res.status(403).send("You do not have access to this resource")
    } else {
        next()
    }
}

const checkShipper = (req, res, next) => {
    const userType = res.locals.userType
    if (userType !== "Shipper") {
        res.status(403).send("You do not have access to this resource")
    } else {
        next()
    }
}




// Customer route
userRouter.use("/customer", checkCustomer, customerRouter)

// Vendor route
userRouter.use("/vendor", checkVendor, vendorRouter)

// Shipper route
userRouter.use("/shipper", checkShipper, shipperRouter)
