// Express modules
import express from "express";

//Authentication modules
import bcrypt from "bcrypt";
import { router as registrationRoutes } from './src/routes/_registration.js';

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

app.use("/register", registrationRoutes)

app.post('/login', async (req, res) => {
    const user = users.find(user => user.username = req.body.username)
    if (user == null) {
        return res.status(400).send("Cannot find user")
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success")
        } else {
            res.send("Not allowed")
        }
        
    } catch {
        res.status(500).send()
    }
})

app.listen(6900)
