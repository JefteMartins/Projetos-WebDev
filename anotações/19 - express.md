# **Express with NodeJS**

###### 226. What is Express?
express é um framework de node
escrfever menos codigos repetitivos, especialnmente para dev web

## 227. Creating Our First Server with Express

criando pasta - `mkdir`
criando arquivo - `touch`

**Instalando Express**
depois de inicializar a npm
`npm install express`
usando

```javascript
const express = require('express' 4.16.3)
const app = express()
app.get('/', (req, res) => res.send( 'Hello World!'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))

///// exemplo do curso

//jshint esversion:6
const express = require("express");
const app = express();
app.listen(3000, function(){
	console.log("server started on port 3000");
}
); //em qual porta vai "ouvir"
```

## 228. Handling Requests and Responses: the GET Request

```javascript
//jshint esversion:6
const express = require("express");
const app = express();
app.get("/", function(request, response){
    //request é a parte que pede a informação
    //response é o que é devolvido
    	//console.log(request);
    	//no console manda as infos da request
    	//response.send("hello");
    	//na pagina vai ter um hello como response
		response.send("<h1>Hello</h1>");
		//responde o Hello em um H1
	}
); //o que acontece quando tem um get na page

app.listen(3000, function(){
	console.log("server started on port 3000");
}
); //em qual porta vai "ouvir"
```

## 230. Understanding and Working with Routes

```javascript
app.get("/", function(request, response){
}
```

"/" =  rota, quando chegar nela vai ter a callback function, que é a seguinte 

>  uso de **Nodemon**

quando ta usando nodemon e salva o arquivo, ele reinicia automaticamente, como o live server

## 231. What We'll Make: A Calculator

falando que vamos começar a fazer coisas no server side com node e sobre o desafio do próx capitulo

## 232. Calculator Setup Challenge

passos para criar o express, rodar com nodemon e so retornar um hello wolrd

## 233. Calculator Setup: Challenge Solution

completando os passos anteriores

## 234. Responding to Requests with HTML Files

criando um arquivo html, boilerplate e 2 inputs de text. O `name="nome"` é a variável que vai ficar alocada o conteúdo do input

para enviar uma pagina HTML é diferente

```javascript
app.get("/", function(request, response){
    	res.sendFile("diretório");
	}
);
```

Para previnir erros de diretório,  existe a variável `__dirname` que retorna o local atual do arquivo. Uma boa forma de retornar no sendFile seria 
`res.sendFile(__dirname + "/indexhtml")`

### Final

```javascript
//jshint esversion:6
const express = require("express");
const app = express();
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
```

## 235. Processing Post Requests with Body Parser

passando informações do html para o servidor
quando da submit da um erro 404, pq no form o action ta tapontando pro proprio arquivo html, e nao o calculator.js

precisa de um post, então mudou o form action pra "/"

e fez um app.post com uma callback function retornando uma mensagem simples

para tratar essas informações vamos precisar do package `body-parser`

instalando `npm install body-parser`

para usar os dados vindos do html usaremos
```javascript
app.use(bodyParser.urlencoded({extended: true}));
```

Codigo final Js

```javascript
//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let result = num1 + num2;
    res.send("The result is " + result);
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

```

