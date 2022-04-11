const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//mongoose catch error
main().catch((err) => console.log(err));

async function main() {
  mongoose.connect("mongodb://localhost:27017/wikiDB");
  //schema
  const articleSchema = {
    title: String,
    content: String,
  };
  //model
  const Article = mongoose.model("Article", articleSchema);

//////////////////////////////////ROTAS GERAIS/////////////////////////////////////////////////
app.route("/articles")



.get((req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post((req, res) => {
  console.log(req.body.title);
  console.log(req.body.content);
  //new article
  const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
  });
  newArticle.save((err) => {
      if (!err) {
          res.send("Successfully added a new article");
      } else {
          res.send(err);
      }
  });
})

.delete((req, res) => {
  Article.deleteMany({}, (err) => {
    if (!err) {
      res.send("Successfully deleted all articles");
    } else {
      res.send(err);
    }
  });
});
//////////////////////////////////ROTAS ESPECÍFICAS/////////////////////////////////////////////////
app.route("/articles/:articleTitle")
.get((req, res) => {
  Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
    if (!err) {
      res.send(foundArticle);
    } else {
      res.send(err);
    }
  });
})
.put((req, res) => {
  Article.updateOne( 
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    (err) => {
      if (!err) {
        res.send("Successfully updated article");
      } else {
        res.send(err);
      }
    }
  )
})
.patch((req, res) => {
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    (err) => {
      if (!err) {
        res.send("Successfully updated article");
      } else {
        res.send(err);
      }
    }
  )
})
.delete((req, res) => {
  Article.deleteOne(
    {title: req.params.articleTitle},
    (err) => {
      if (!err) {
        res.send("Successfully deleted article");
      } else {
        res.send(err);
      }
    }
  )
});




  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}
