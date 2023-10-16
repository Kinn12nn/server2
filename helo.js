const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = 2854;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Mock database

app.use(express.static(path.join(__dirname, "public")));
// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/login", (req, res) => {
  res.send("Trang đăng nhập");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/products", (req, res) => {
  res.send("Trang sản phẩm");
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Xin chào, ${req.user.username}! Đây là trang profile của bạn.`);
  } else {
    res.redirect("/login");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});