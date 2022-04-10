const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect } = require("express/lib/response");
const app = express();
const _ = require("lodash");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//mongoose
main().catch((err) => console.log(err));

async function main() {
  mongoose.connect("mongodb://localhost:27017/todoDB");

  const itemSchema = {
    name: String,
  };
  const Item = mongoose.model("Item", itemSchema);
  const item1 = new Item({
    name: "Welcome to your todo list",
  });
  const item2 = new Item({
    name: "Hit the + button to add a new item",
  });
  const item3 = new Item({
    name: "<-- Hit this to delete an item",
  });
  const defaultItems = [item1, item2, item3];

  app.get("/", (req, res) => {
    Item.find({}, (err, foundItems) => {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully saved default items to DB");
          }
        });
        res.redirect("/");
      }
      res.render("list", { listTitle: "Today", newListItem: foundItems });
    });
  });

  //parte antiga

  app.get("/index.html", function (req, res) {
    res.redirect("/");
  });

  app.post("/", (req, res) => {
    const itemName = req.body.todo;
    const item = new Item({
      name: itemName,
    });
    item.save();
    res.redirect("/");
  });

  app.post("/delete", (req, res) => {
    const checkedItemID = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemID, (err) => {
      if (!err) {
        console.log("Successfully deleted checked item");
        res.redirect("/");
      }
    });
  });

  app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);
    console.log(customListName);
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
}
