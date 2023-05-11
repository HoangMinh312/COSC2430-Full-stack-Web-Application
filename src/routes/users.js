import express from "express";
export const userRouter = express.Router();
import { Product } from "../models/productSchema.js";
import { vendorRouter } from "./vendor.js";

// Customer route
// users/customer
userRouter.get("/customer", (req, res) => {
    res.render("customer_shopping");
})

// Vendor route
userRouter.use("/vendor", vendorRouter)
