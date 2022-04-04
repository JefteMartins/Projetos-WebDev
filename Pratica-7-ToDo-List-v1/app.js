const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["um", "dois", "tres"];
const workItems = [];

app.get("/", (req, res) => {
  const day  = date.getDate();
  res.render("list", { listTitle: day, newListItem: items });
});

app.post("/", (req, res) => {
  const item = req.body.todo;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  };
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work", newListItem: workItems });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
