import express from "express";
import browserSync from "browser-sync";
import { config } from "./bs-config.js";
const app = express();

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

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(6900)
