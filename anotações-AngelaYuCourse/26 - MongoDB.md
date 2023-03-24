# MongoDB



## 327. Installing MongoDB on Windows

baixar o mongo, instalar, nao instalar o compass

criar o `.bash_prpfile` no `cd ~`

**VIM**

i + enter = inserção

`:wq!` pra sair

## 328. MongoDB CRUD Operations in the Shell: Create

` https://www.mongodb.com/docs/manual/crud/`

ir no diretorio raiz, `cd ~ `  e usar `mongod`  para iniciar o mongo

como o terminal fica ocupado, abre uma nova aba do terminal pra continuar usando comandos

usar `mongo` par aabrir o mongo shell 
Os comandos são dados no shell do mongo

`show dbs` - lista os banco de dados que tem
`use nomeDaBase` - cria uma base e muda pra ela
`db` mostra qual base vc está
`db.products.insertOne({_id:1, name: "Pen", price: 1.20})` adicionar 
há o `insernMany` para por varios itens
algo numa tabela produtos
`{ "acknowledged" : true, "insertedId" : 1 }` deu certo
`show collections` pedindo pra ver o que tem
`products` retorno 

## 329. MongoDB CRUD Operations in the Shell: Reading & Queries

`db.collection.find()` retorna tudo o que tiver
dentro do find pode se adicionar parametros, consultar documentação dos query operators

ex: ` db.products.find({name: "Pencil"})`
`$gt:` greater than

outro ex:
`db.products.find({_id:: 1}, {name: 1})` o name:1 quer dizer que é true que ele quer que retorne o campo name, caso nao quisesse, seria name:0 para false

## 330. MongoDB CRUD Operations in the Shell: Update

`db.products.updateOne({_id: 1}, {$set: {stock: 32}})`
vai no produtos, e onde tem _id == 1 ele vai setar o stock a 32

## 331. MongoDB CRUD Operations in the Shell: Delete

`db.products.deleteOne({_id:2})` deletar a tupla de _id==2

## 332. Relationships in MongoDB

## 333. Working with The Native MongoDB Driver

seguindo o w3schools

### Criando um banco de dados que armazena frutas

criando a base "mydb" que so aparece quando tem conteúdo

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
```

criando a collections

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("fruitsDB");
  dbo.createCollection("fruits", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
```

inserindo informações

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("fruitsDB");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("fruits").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
```

find

````js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
````

