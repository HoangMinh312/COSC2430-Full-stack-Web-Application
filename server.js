import express from "express";
import browserSync from "browser-sync";
import { config } from "./src/configs/bs-config.js";
import mongoose from "mongoose";
//Routers import
import { indexRouter }  from "./src/routes/index.js";
import { userRouter } from "./src/routes/users.js";

const app = express();
const port = 6900;

// Database setup
mongoose.connect("mongodb://localhost/testProductDB", { useNewUrlParser: true, useUnifiedTopology: true })
const database = mongoose.connection
database.on("error", (e) => console.error(e))
database.once("open", () => console.log("Connected to MongoDB"))

// BrowserSync
const bs = browserSync.create();
bs.init({
  ...config,
  watch: true
});

// App setup
app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true}));

app.set('views','./src/views');
app.set("view engine", "ejs")

// Routers
app.use("/", indexRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}: http://localhost:${port}`)
})
