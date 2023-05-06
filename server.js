import express from "express";
import browserSync from "browser-sync";
import { config } from "./bs-config.js";
const app = express();
const port = 6900;

//Routers import
import { indexRouter }  from "./src/routes/index.js";
import { userRouter } from "./src/routes/users.js";

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
