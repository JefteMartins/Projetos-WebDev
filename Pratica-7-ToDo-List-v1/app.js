const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["um", "dois", "tres"];
let workItems = [];

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("pt-BR", options);
  res.render("list", { listTitle: day, newListItem: items });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

app.post("/", (req, res) => {
  let item = req.body.todo;
  
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  };
  console.log(req.body);
});



app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work", newListItem: workItems });
});