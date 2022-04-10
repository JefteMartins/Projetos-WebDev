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