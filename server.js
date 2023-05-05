// Express modules
import express from "express";

// Flashing messages and session
import flash from "connect-flash";
import session from "express-session";

// Passport config
import passport from "passport"
import { initializePassport } from './passport.js'
initializePassport(passport)

// Mongoose + MongoDB
const MONGODB_URI = "mongodb+srv://user:s3977773@fullstack-database.3im5ftq.mongodb.net/?retryWrites=true&w=majority"
import mongoose from "mongoose";
mongoose.connect(MONGODB_URI, { useNewURLParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


//Authentication modules
import bcrypt from "bcrypt";
import { router as userRoute } from './src/routes/_users.js';
import { ensureAuthenticated } from "./auth.js";


//Browsersync modules
import browserSync from "browser-sync";
import { config } from "./bs-config.js";
const app = express();
const PORT = process.env.PORT || 6900;


// BrowserSync
const bs = browserSync.create();
bs.init({
  ...config,
  watch: true
});


// Bodyparser
app.use(express.urlencoded({ extended: false }))


// Flash and session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()  
})



// Views middleware and setup
app.use(express.static("./public"))
app.set('views','./src/views');
app.set("view engine", "ejs");

app.get("/", ensureAuthenticated,(req, res) => {
    console.log("Loaded website")
    res.render("index")
})

// Routes 
app.use('/users', userRoute)


app.listen(PORT)
