// Express modules
import express from "express";

//Authentication modules
import bcrypt from "bcrypt";
import { router as authenticationRoute } from './src/routes/_registration.js';

//Browsersync modules
import browserSync from "browser-sync";
import { config } from "./bs-config.js";
const app = express();

// BrowserSync
const bs = browserSync.create();
bs.init({
  ...config,
  watch: true
});

app.use(express.json())
app.use(express.static("./public"))

app.set('views','./src/views');
app.set("view engine", "ejs");


// Testing users database
const users = []




// Registration routes


app.get("/", (req, res) => {
    console.log("Loaded website")
    res.render("index")
})

app.use("/register", authenticationRoute)

app.listen(6900)
