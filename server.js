import express from "express";
import bcrypt from "bcrypt";
import browserSync from "browser-sync";
import { config } from "./bs-config.js";
const app = express();

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json())
// BrowserSync
const bs = browserSync.create();
bs.init({
  ...config,
  watch: true
});

// app
app.use(express.static("./public"))


app.set('views','./src/views');
app.set("view engine", "ejs")

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
