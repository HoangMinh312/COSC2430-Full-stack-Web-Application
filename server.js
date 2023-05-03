// Express modules
import express from "express";

//Authentication modules
import bcrypt from "bcrypt";

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
app.set("view engine", "ejs")


// Testing users database
const users = []


app.get('/users', (req, res) => {
    res.json(users)
})

// Registration routes

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { username: req.body.username, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
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

app.get("/", (req, res) => {
    console.log("Loaded website")
    res.render("index")
})

app.listen(6900)
