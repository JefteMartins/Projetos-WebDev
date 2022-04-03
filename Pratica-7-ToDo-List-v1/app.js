const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let items = ["um", "dois", "tres"];

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("pt-BR", options);
  res.render("list", { kindOfDay: day, newListItem: items });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

app.post("/", (req, res) => {
  let item = req.body.todo;
  items.push(item);
  res.redirect("/");
});
