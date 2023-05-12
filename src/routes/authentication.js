import express from 'express';
import bcrypt from "bcrypt";
export const router = express.Router();
import passport from 'passport';

// Multer + fs(Processing images)
import fs from "fs"
import multer from "multer"
const upload = multer({ dest: 'uploads/' });

// User model
import { Customer , Vendor, Shipper } from "../models/User.js"

router.get('/', (req, res) => {
    res.render("register_form")
})
// Login page
router.get('/login', (req, res) => {
    res.render("login_form")
})
// Register page
router.get('/register', (req, res) => {
    res.render("register_form")
})
// Customer register page
router.get('/register/customer', (req, res) => {
    res.render("register_customer")
})
// Vendor register page
router.get('/register/vendor', (req, res) => {
    res.render("register_vendor")
})
// Shipper register page
router.get('/register/shipper', (req, res) => {
    res.render("register_shipper")
})

// My account page
router.get('/profile', (req, res) => {
    const user = req.session.user
    res.render("my_account", { user })
}) 


// Register Customer Handle
router.post('/register/customer', upload.single('profilePicture'), (req,res) => {
    const { username, password , name, address} = req.body;
    let errors = []
    let fileData = null
    let contentType = null
    
    // Check required fields
    if (!username || !password || !name || !address) {
        errors.push({msg: "Please fill in all fields"})
    }

    // Check profile picture
    if (req.file) {
        fileData = fs.readFileSync(req.file.path);
        contentType = req.file.mimetype;
    } else {
        errors.push({msg: "Please upload a profile picture"})
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
    if (name.length < 5) {
        errors.push({msg: "Your full name should be at least 5 characters long"})
    }

    // Check address length
    if (address.length < 5) {
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
        res.render('register_customer', {
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
                    res.render('register_customer', {
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
                        profilePicture: {
                            data: fileData,
                            contentType: contentType
                        },
                        name,
                        address
                    })
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newCustomer.password, salt, (err, hashedPassword) => {
                            if (err) throw err
                            // Set the password to be hashed
                            newCustomer.password = hashedPassword
                            // Saving the Customer user
                            newCustomer.save()
                                .then(user => {
                                    console.log(user);
                                    req.flash('success_msg', 'You are now registered and can log in')
                                    res.redirect('/auth/login')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }

})

// Register Vendor Handle
router.post('/register/vendor', upload.single('profilePicture'), (req,res) => {
    const { username, password , name, address} = req.body;
    let errors = []
    let fileData = null
    let contentType = null

    // Check required fields
    if (!username || !password || !name || !address) {
        errors.push({msg: "Please fill in all fields"})
    }

    // Check profile picture
    if (req.file) {
        fileData = fs.readFileSync(req.file.path);
        contentType = req.file.mimetype;
    } else {
        errors.push({msg: "Please upload a profile picture"})
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
    if (name.length < 5) {
        errors.push({msg: "Your full name should be at least 5 characters long"})
    }

    // Check address length
    if (address.length < 5) {
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
        res.render('register_vendor', {
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
                    res.render('register_vendor', {
                        errors,
                        username,
                        password,
                        name,
                        address
                    })
                } else {
                    Vendor.findOne({ businessName: name }).then(userByName => {
                        if (userByName) {
                            errors.push({msg: "A vendor with this name already exists"})
                            res.render('register_vendor', {
                                errors,
                                username,
                                password,
                                name,
                                address
                            })
                        } else {
                            Vendor.findOne({ businessAddress: address }).then(userByAddress => {
                                if (userByAddress) {
                                    errors.push({msg: "A vendor with this address already exists"})
                                    res.render('register_vendor', {
                                        errors,
                                        username,
                                        password,
                                        name,
                                        address,
                                    })
                                } else {
                                    const newVendor = new Vendor({
                                        username: username,
                                        password: password,
                                        profilePicture: {
                                            data: fileData,
                                            contentType: contentType,
                                        },
                                        businessName: name,
                                        businessAddress: address
                                    })
                                    // Hash password
                                    bcrypt.genSalt(10, (err, salt) => {
                                        bcrypt.hash(newVendor.password, salt, (err, hashedPassword) => {
                                            if (err) throw err
                                            // Set the password to be hashed
                                            newVendor.password = hashedPassword
                                            // Saving the Vendor user
                                            newVendor.save()
                                                .then(user => {
                                                console.log(user)
                                                req.flash('success_msg', 'You are now registered and can log in')
                                                res.redirect('/auth/login')
                                            })
                                                .catch(err => console.log(err));
                                        })
                                    })
                                }
                            })
                        }
                    })
                }
            })
    }

})

// Register Shipper Handle
router.post('/register/shipper', upload.single('profilePicture'), (req,res) => {
    const { username, password , name, distributionHub} = req.body;
    let errors = []
    let fileData = null
    let contentType = null
    
    // Check required fields
    if (!username || !password || !name || !distributionHub) {
        errors.push({msg: "Please fill in all fields"})
    }

    // Check profile picture
    if (req.file) {
        fileData = fs.readFileSync(req.file.path);
        contentType = req.file.mimetype;
    } else {
        errors.push({msg: "Please upload a profile picture"})
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
    if (name.length < 5) {
        errors.push({msg: "Your full name should be at least 5 characters long"})
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
        res.render('register_shipper', {
            errors,
            username,
            password,
            name,
            distributionHub
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
                    res.render('register_shipper', {
                        errors,
                        username,
                        password,
                        name,
                        distributionHub
                    })
                } else {
                    const newShipper = new Shipper({
                        username,
                        password,
                        profilePicture: {
                            data: fileData,
                            contentType: contentType,
                        },
                        name,
                        distributionHub
                    })
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newShipper.password, salt, (err, hashedPassword) => {
                            if (err) throw err
                            // Set the password to be hashed
                            newShipper.password = hashedPassword
                            // Saving the Customer user
                            newShipper.save()
                                .then(user => {
                                    console.log(user);
                                    req.flash('success_msg', 'You are now registered and can log in')
                                    res.redirect('/auth/login')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }

})

// const testingUser = function(username, name, address) {
//     const newVendor = new Vendor({
//         username: username,
//         password: "DĂDAWFBUIUB",
//         businessName: name,
//         businessAddress: address
//     })
//     newVendor.save().then(data => console.log(data)).catch(err => console.log(err));
// }
// testingUser("hodfghjkl", "dfghjkl", "sdfghjklkjhg")


router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login',failureFlash: true}),
    (req, res) => {
        const user = req.user
        if (user instanceof Customer) {
            res.redirect(`/users/customer/`); // Redirect to the customer dashboard
        } else if (user instanceof Vendor) {
            res.redirect(`/users/vendor/`); // Redirect to the vendor dashboard
        } else if (user instanceof Shipper) {
            res.redirect(`/users/shipper/`); // Redirect to the shipper dashboard
        }
    })

// Logout Handle 
router.get('/logout', (req, res) => {
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     res.redirect('/auth/login'); // Redirect to the home page or any other page after logout
    // });
    req.logout( e => { 
        if (e) { return next(e) }
        res.redirect('/')
    })
    
})
