# Putting everything together

## 342. Let's take the ToDoList Project to the Next Level and Connect it with Mongoose

```js
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
  
  Item.insertMany(defaultItems, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved default items to DB");
    }
  });
}
```

## 343. Rendering Database Items in the ToDoList App

```js
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
```



## 344. Adding New Items to our ToDoList Database

```js
 app.post("/", (req, res) => {
    const itemName = req.body.todo;
    const item = new Item({
      name: itemName,
    });
   item.save();
   res.redirect("/");
  });
```

## 345. Deleting Items from our ToDoList Database

```ejs
<% newListItem.map((item) =>{ %>

  <form action="/delete" method="post">
    <div class="item">
      <input type="checkbox" name="checkbox" value="<%=item._id%>" onChange="this.form.submit()"/>
      <p><%=item.name%></p>
    </div>
  </form>

  <% }) %>
```



```js
app.post("/delete", (req, res) => {
    const checkedItemID = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemID, (err) => {
      if (!err) {
        console.log("Successfully deleted checked item");
        res.redirect("/");
      }
    }
    );
  });
```

## 346. Creating Custom Lists using Express Route Parameters