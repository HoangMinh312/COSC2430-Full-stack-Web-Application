import express from 'express';
import bcrypt from "bcrypt";
export const router = express.Router();
import passport from 'passport';
// User model
import { Customer , Vendor, Shipper } from "../models/User.js"

router.get('/', (req, res) => {
    res.render("users")
})
// Login page
router.get('/login', (req, res) => {
    res.render("login")
})
// Register page
router.get('/register', (req, res) => {
    res.render("register")
})
// Customer register page
router.get('/register/customer', (req, res) => {
    res.render("registerCustomer")
})
// Vendor register page
router.get('/register/vendor', (req, res) => {
    res.render("registerVendor")
})
// Shipper register page
router.get('/register/shipper', (req, res) => {
    res.render("registerShipper")
})


// Register Handle
router.post('/register/customer', (req,res) => {
    const { username, password , name, address} = req.body;
    let errors = []

    // Check required fields
    if (!username || !password || !name || !address) {
        errors.push({msg: "Please fill in all fields"})
    }

    // Check username length
    if (username.length < 8 || username.length > 15) {
        errors.push({msg: "Username should be between 8 and 15 characters long"})
    }

    // Check password length
    if (password.length < 8 || password.length > 20) {
        errors.push({msg: "Password should be between 8 and 20 characters long"})
    }

    // Check name length
    if (name.length < 8 || name.length > 20) {
        errors.push({msg: "Your full name should be at least 5 characters long"})
    }

    if (address.length < 8 || address.length > 20) {
        errors.push({msg: "Your address should be at least 5 characters long"})
    }

    // Regular Expressions for password requirements
    const hasUpperCase = new RegExp(/[A-Z]/);
    const hasLowerCase = new RegExp(/[a-z]/);
    const hasDigit = new RegExp(/\d/);
    const hasSpecialChar = new RegExp(/[!@#$%^&*]/);
    const noOtherChars = new RegExp(/^[A-Za-z0-9!@#$%^&*]*$/); 

    if (!hasUpperCase.test(password)) {
        errors.push({msg: "Password should have at least 1 uppercase letter"})
    }
    if (!hasLowerCase.test(password)) {
        errors.push({msg: "Password should have at least 1 lowercase letter"})
    }
    if (!hasDigit.test(password)) {
        errors.push({msg: "Password should have at least 1 digit"})
    }
    if (!hasSpecialChar.test(password)) {
        errors.push({msg: "Password should have at least 1 special character (!@#$%^&*)"})
    }
    if (!noOtherChars.test(password)) {
        errors.push({msg: "Password should have NO other characters"})
    }

    if (errors.length > 0) {
        res.render('registerCustomer', {
            errors,
            username,
            password,
            name,
            address
        })
    } else {
        // Validation passed
        Promise.all([
            Customer.findOne({ username: username}).exec(),
            Vendor.findOne({ username: username}).exec(),
            Shipper.findOne({ username: username}).exec(),
        ])
            .then(([customer, vendor, shipper]) => {
                if(customer || vendor || shipper) {
                    errors.push({msg : "User already exists with that username"})
                    res.render('registerCustomer', {
                        errors,
                        username,
                        password,
                        name,
                        address
                    })
                } else {
                    const newCustomer = new Customer({
                        username,
                        password,
                        name,
                        address
                    })
                    console.log(newCustomer)
                    newCustomer.save()   
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newCustomer.password, salt, (err, hashedPassword) => {
                            if (err) throw err
                            // Set the password to be hashed
                            newCustomer.password = hashedPassword
                            // Saving the Customer user
                            newCustomer.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }

})

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

// Logout Handle 
router.post('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/login')
})