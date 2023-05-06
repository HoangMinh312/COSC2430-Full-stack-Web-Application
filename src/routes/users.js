import express from "express";
export const userRouter = express.Router();

// users/customer
userRouter.get("/customer", (req, res) => {
    res.render("customer_shopping");
})
