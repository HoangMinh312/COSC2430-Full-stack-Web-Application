import express from "express";
export const userRouter = express.Router();
import { Product } from "../models/productSchema.js";
import { vendorRouter } from "./vendor.js";
import { customerRouter } from "./customer.js";

// Customer route
userRouter.use("/customer", customerRouter)

// Vendor route
userRouter.use("/vendor", vendorRouter)
