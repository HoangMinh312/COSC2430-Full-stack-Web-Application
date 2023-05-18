// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

// Modules import
import express from "express";
import mongoose from "mongoose";

// Flashing messages and session
import flash from "connect-flash";
import session from "express-session";

// Passport config
import passport from "passport"
import { initializePassport } from './src/configs/passport-config.js'
initializePassport(passport)

// User models
import { Customer , Vendor, Shipper } from "./src/models/User.js"

//Authentication modules + route
import { router as register_loginRoute } from './src/routes/authentication.js';
import { ensureAuthenticated } from "./src/middlewares/auth.js";

//Browsersync modules
import browserSync from "browser-sync";
import { config } from "./src/configs/bs-config.js";

//Routers import
import { indexRouter }  from "./src/routes/index.js";
import { userRouter } from "./src/routes/users.js";

const app = express();
const PORT = process.env.PORT || 6900;

// Mongoose + MongoDB
const MONGODB_URI = "mongodb+srv://user:s3977773@fullstack-database.3im5ftq.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI, { useNewURLParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

// BrowserSync
const bs = browserSync.create();
bs.init({
  ...config,
  watch: true
});

// Flash and session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));
app.use(flash())

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Global Variables 
app.use((req, res, next) => {
    let userType = ""
    if (req.user instanceof Customer) {
        userType = "Customer"
    } else if (req.user instanceof Vendor) {
        userType = "Vendor"
    } else if (req.user instanceof Shipper) {
        userType = "Shipper"
    }
    
    res.locals.cart = req.session.cart || [];
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user
    res.locals.userType = userType
    next()  
})

// Views middleware and setup
app.use(express.static("./public"))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({  limit: '10mb' , extended: true}));

app.set('views','./src/views');
app.set("view engine", "ejs");

// Routers
app.use('/auth', register_loginRoute);
app.use("/users", ensureAuthenticated, userRouter);
app.use("/", indexRouter);

app.listen(PORT)
