require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongooose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//main mongoose
main().catch((err) => console.log(err));

async function main() {

  app.use(session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  mongooose.connect("mongodb://localhost:27017/userDB");

  const userSchema = new mongooose.Schema({
    email: String,
    password: String
  });

  userSchema.plugin(passportLocalMongoose);
  

  const User = mongooose.model("User", userSchema);

  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  

  // root route
  app.route("/")
  .get((req, res) => {
    res.render("home");
  });

  //login route
  app.route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    });
  });
        

  //register route
  app.route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    User.register({username: req.body.username}, req.body.password, (err, user) => {
      if(err){
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    });
  });

  //secrets route
  app.route("/secrets")
  .get((req, res) => {
    if(req.isAuthenticated()){
      res.render("secrets");
    }
    else{
      res.redirect("/login");
    }
  });

  //logout route
  app.route("/logout")
  .get((req, res) => {
    req.logout();
    res.redirect("/");
  });
  
  
  app.listen(3000, () => {
    console.log("listening on 3000");
  });
}
