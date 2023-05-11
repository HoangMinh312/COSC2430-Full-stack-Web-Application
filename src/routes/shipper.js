import express from "express"
export const router = express.Router();

import { Shipper } from "../models/User.js"

router.get('/', (req, res) => {
    const user = req.session.user 
    res.render('loggedin-shipper', { user })
})