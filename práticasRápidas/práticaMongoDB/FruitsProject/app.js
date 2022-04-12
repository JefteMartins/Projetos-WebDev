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
  //cria o modelo e passa o schema dizendo o nome da tabela e o schema
  //mesmo com a constante "Fruit" no singular ele deixa tudo minúsculo e bota no flural no BD
  const Fruit = mongoose.model("Fruit", fruitsSchema);

  Fruit.find((err, fruits) => {
    if (err) {
      console.log(err);
    } else {
      fruits.map((fruit) => console.log(fruit.name));
      mongoose.connection.close();
    }
  });
}
//adding more than one
// const kiwi = new Fruit({
//     name: "Kiwi",
//     rating: 10,
//     review: "Best stuff"
//   });
// const orange = new Fruit({
//     name: "Orange",
//     rating: 5,
//     review: "Too sour"
//   });
// const banana = new Fruit({
//     name: "Banana",
//     rating: 7,
//     review: "Weird texture"
//   });
//   Fruit.insertMany([kiwi, orange, banana], (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully saved all fruits");
//     }
//   });


// updade one
// Fruit.updateOne({_id: "5bc0854dd6ec7ad010738bc7"}, {name: "Peach"}, function(err){
//   if (err){
//     console.log (err);
//    } else {
//     console. log("Succes fully updated the document.");
//   }
// );

// // delete one
// Fruit.deleteOne({name: "Peach"}, function(err){
//   if (err){
//     console.log (err);
//    } else {
//     console. log("Succes deleted the document.");
//   }
// );


// relashionship
// const personSchema = new mongoose.Schema ({
//   name: String,
//   age: Number,
//   favouriteFruit: fruitSchema
// });
// const Person = mongoose.model("Person", personSchema);
// const pineapple = new Fruit ({
//   name: "Pineapple",
//   score: 9,
//   review: "Great fruit."
// });

// const person = new Person({
//     name: "Amy",
//     age: 12
//     favouriteFruit: pineapple
// })

