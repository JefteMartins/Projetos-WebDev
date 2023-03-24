# Mongoose

## 336. Introduction to Mongoose

criando um banco com mongoose

```js

//cria a constante que recebe o mongoose
const mongoose = require("mongoose");
//função main com retorno de erro
main().catch((err) => console.log(err));

async function main() {
  //conexão com o banco de dados e nome do banco de dados "fruitsDB"
  await mongoose.connect("mongodb://localhost:27017/fruitsDB");
  console.log("connected to mongoose");
  //cria o schema e os parametros
  const fruitsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
  });
  //cria o modelo e passa o schema dizendo o nome da tabela e o schema
  //mesmo com a constante "Fruit" no singular ele deixa tudo minúsculo e bota no flural no BD
  const Fruit = mongoose.model("Fruit", fruitsSchema);
  //cria uma nova fruta
  const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid"
  });
  //salva o documento
  fruit.save();
}

```

inserindo mais de um objeto

```js
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Best stuff"
  });
const orange = new Fruit({
    name: "Orange",
    rating: 5,
    review: "Too sour"
  });
const banana = new Fruit({
    name: "Banana",
    rating: 7,
    review: "Weird texture"
  });
  Fruit.insertMany([kiwi, orange, banana], (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved all fruits");
    }
  });
```

sem o Fruits.save() pq salva com uma callback

## 337. Reading from Your Database with Mongoose

```js
//chamar o nome de todas as frutas
Fruit.find((err, fruits) => {
    if (err) {
      console.log(err);
    } else {
      fruits.map((fruit) => console.log(fruit.name));
      mongoose.connection.close();
    }
  });
```

## 338. Data Validation with Mongoose

Validation

```js
const fruitsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "name is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
    },
    review: String,
  });
```

## 339. Updating and Deleting Data Using Mongoose

update

```js
Fruit.updateOne({_id: "5bc0854dd6ec7ad010738bc7"}, {name: "Peach"}, function(err){
  if (err){
    console.log (err);
   } else {
    console. log("Succes fully updated the document.");
  }
);
```

Delete

```js
Fruit.deleteOne({name: "Peach"}, function(err){
  if (err){
    console.log (err);
   } else {
    console. log("Succes deleted the document.");
  }
);
```

## 340. Establishing Relationships and Embedding Documents using Mongoose

```js
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);
const pineapple = new Fruit ({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});

const person = new Person({
    name: "Amy",
    age: 12
    favouriteFruit: pineapple
})
```

