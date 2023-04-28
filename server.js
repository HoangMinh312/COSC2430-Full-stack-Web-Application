import express from "express";
const app = express();

app.set('views','./src/views');
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    console.log("here")
    res.render("index", {text: "newbies"})
})

app.listen(6900)
