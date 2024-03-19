if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const route = require("./routes/items");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const route2 = require("./routes/users");
const Product = require("./models/items");

mongoose
  .connect("mongodb://127.0.0.1:27017/e-auction")
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log(err));

const secretConfig = {
  secret: "thishouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(flash());
app.use(session(secretConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.get("/", async (req, res) => {
  const name = "Home";
  const products = await Product.find();
  products.sort((a, b) => a.basePrice - b.basePrice);
  res.render("home.ejs", { name, products });
});

app.use("/products", route);
app.use("/users", route2);

app.use((err, req, res, next) => {
  const { status = 500, message = "sorry something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...........");
});
