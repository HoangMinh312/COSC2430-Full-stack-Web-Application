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

//Authentication modules
import bcrypt from "bcrypt";
import { router as userRoute } from './src/routes/_users.js';
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
app.use(express.urlencoded({ extended: true}));

app.set('views','./src/views');
app.set("view engine", "ejs");

// Routers
// app.use("/", ensureAuthenticated,indexRouter);
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/users", userRoute);

app.listen(PORT, () => {
    console.log("Loaded website")
  console.log(`App listening on port ${PORT}: http://localhost:${PORT}`)
})
