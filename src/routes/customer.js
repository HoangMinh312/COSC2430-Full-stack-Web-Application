import express from "express"
export const customerRouter = express.Router();


customerRouter.get('/profile', (req, res) => {
    const user = req.user
    console.log("Redirecting to my account page")
    res.render("my_account", { user })
})

customerRouter.get('/:id', (req, res) => {
    const user = req.user
    res.render("customer_shopping", { user })
})
