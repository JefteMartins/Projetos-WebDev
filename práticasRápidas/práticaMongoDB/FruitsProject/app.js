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
  //cria uma nova fruta

  Fruit.find((err, fruits) => {
    if (err) {
      console.log(err);
    } else {
      fruits.map((fruit) => console.log(fruit.name));
      mongoose.connection.close();
    }
  });
}
