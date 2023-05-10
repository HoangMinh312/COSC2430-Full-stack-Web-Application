import express from "express"
export const router = express.Router();

import { Shipper } from "../models/User.js"

router.get('/:id', (req, res) => {
    const user = req.session.user 
    res.render('loggedin-shipper', { user })
}) 

router.get('/', (req, res) => {
    res.send("Shipper")
})