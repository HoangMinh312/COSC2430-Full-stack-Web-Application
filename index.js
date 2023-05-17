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

// Multer configuration
// import multer from "multer"
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// });

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
import { testRouter } from "./src/routes/test.js";

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

// Bodyparser
// app.use(express.json())

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
<<<<<<< HEAD

=======
>>>>>>> 75122b8e3387dab124e927ce3f9518338aa287a3
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
app.use('/test', testRouter);
app.use("/users", ensureAuthenticated, userRouter);
app.use("/", indexRouter);


app.listen(PORT)
