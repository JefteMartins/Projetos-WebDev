# Updating blog

## 354. Challenge: Give your Blog a Database

mostrando como vai ficar

## 355. Step 0 - Download the Starting

nao precisei pq ja tinha feito

## 356. Step 1 - Save Composed Posts with MongoDB

criar bd
criar schaema, model e adicionar os itens do compose la

```js
mongoose.connect("mongodb://localhost:27017/blogDB");
  const postSchema = {
    title: String,
    content: String,
  };
const Post = mongoose.model("Post", postSchema);

app.post("/compose", (req, res) => {
    const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postBody
    });
  
    post.save(res.redirect("/"));
  });
```

## 357. Step 2 - Get the Home Page to Render the Posts

```js
app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
      res.render("home", {
        paragraphContent: homeStartingContent,
        posts: posts,
      });
    });
  });
```

## 358. Step 3 - Fix the bug

```js
post.save(res.redirect("/"));
//ou
 post.save(function(err){
   if (!err){
     res.redirect("/");
   }
 });
```

## 359. Step 4 - Render the correct blog post based on post _id

```ejs
<a href="/posts/<%=post._id%>">Read More</a>
```

```js
 app.get("/posts/:postId", (req, res) => {
    const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  });
```

