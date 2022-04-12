require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongooose = require("mongoose");
const encrypt = require("mongoose-encryption");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//main mongoose
main().catch((err) => console.log(err));

async function main() {
  mongooose.connect("mongodb://localhost:27017/userDB");
  const userSchema = new mongooose.Schema({
    email: String,
    password: String
  });

  userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

  const User = mongooose.model("User", userSchema);

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
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          if (foundUser.password === password) {
            res.render("secrets");
          }
        }
      }
    });
  });
        

  //register route
  app.route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password,
    });
    newUser.save(
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.render("secrets");
        }
      }
    );
  });

  app.listen(3000, () => {
    console.log("listening on 3000");
  });
}
