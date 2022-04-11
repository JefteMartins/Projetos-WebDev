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
  //get articles
  app.get("/articles", function (req, res) {
    Article.find((err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  });
  app.post("/articles", function (req, res) {
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
    });


  app.listen(3000, function () {
    console.log("Server started on port 3000");
  });
}
