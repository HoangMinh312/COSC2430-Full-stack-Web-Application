// Express modules
import express from "express";

// Flashing messages and session
import flash from "connect-flash";
import session from "express-session";

// Passport config
import passport from "passport"
import { initializePassport } from './src/configs/passport-config.js'
initializePassport(passport)

// Mongoose + MongoDB
const MONGODB_URI = "mongodb+srv://user:s3977773@fullstack-database.3im5ftq.mongodb.net/?retryWrites=true&w=majority"
import mongoose from "mongoose";
mongoose.connect(MONGODB_URI, { useNewURLParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

// Multer configuration
import multer from "multer"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});


//Authentication modules + route
import { router as register_loginRoute } from './src/routes/authentication.js';
import { ensureAuthenticated } from "./src/middlewares/auth.js";

// User routes 
import { router as shipperRoutes } from './src/routes/shipper.js';

//Browsersync modules
import browserSync from "browser-sync";
import { config } from "./src/configs/bs-config.js";
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
app.use(express.json())


// Flash and session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash())

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Global Vars (For the messages.ejs in partials)
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
app.use('/auth', register_loginRoute)
app.use('/shipper', shipperRoutes)


app.listen(PORT)
