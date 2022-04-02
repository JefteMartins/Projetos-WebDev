# API

## 239. Why do we need API's?

falando sobre o que é uma API e que ela devolve informações requisitadas que estão disponíveis

## 240. API Endpoints, Paths and Parameters.

> Endpoints:
>
> > é o link que vc faz o get
> > Ex: kanye.rest. Uma API Rest para falas aleatorias do Kanye West
> > api.kanye.rest
>
> Paths:
>
> > a url que define parametros das infos que vc vai puxar da api
> > Ex: sv443.net/jokeapi/v2/joke/Programming
> > O Programming refere a piadas de programação.
>
> Parameters:
>
> > parametros vao no path pesquisando algum conteúdo na response da api
> > como um `contains=valorASerPesquisado`
>
> Authentication:
>
> > quando faz uma requisição na api vc tem que ser identificado como desenvolvedor
>
> 



## 241. API Authentication and Postman

> Authentication:
>
> >  quando faz uma requisição na api vc tem que ser identificado como desenvolvedor

Key para identificar quem é vc

**Uso do postman**

pegar o path e usar no get pra ter as infos

a infos vindas de uma api vem como json

## 242. What is JSON?

como se fosse um objeto que guarda informações.
//ja sei sobre, so ver mais exemplos depois

## 243. Making GET Requests with the Node HTTPS Module

primeiro o "boilerplate" do html5 e do express instalando o node e express na pasta e rodando com nodemon

o "boilerplate" do express abaixo

```javascript
const express = require('express');
const app = express();
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

começando com o nativo package https do node

> `const https = require("https");` 

## 244. How to Parse JSON

com express:

```javascript
app.get("/", (req, res) => {
    
    https.get(urlApi, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) =>{
            const weatherData = JSON.parse(data);
            console.log(weatherData);//ja retorna o json no 										terminal
        })
    });
    res.send("Hello World");
});
```

para voltar ao json normal, tem que pegar um objeto js e fazer 

`JSON.tringify(objeto);`

da pra usar json viwer pro pra copiar o path direto da tela

## 245. Using Express to Render a Website with Live API Data

response é o que mandariamos pro servidor

o res.send() é o que a gente envia pra nossa pagina

e só pode ter um .send();
mas res.write(); pode ter mais

## 246. Using Body Parser to Parse POST Requests to the Server

faz um form com action para a root recebendo informação no input text

no node faz um app.post() com callback function como sempre

precisará do body parser

`npm i body-parser`
e no código .js
`const bodyParser = require("body-parser");`
`app.use(bodyParser.urlencoded({ extended: true }));`

```html
<!--HTML-->
<form action="/" method="post">
      <label for="cityInput">City Name: </label>
      <input id="cityInput" type="text" name="cityName" />
      <button type="submit">Go</button>
    </form>
```



```javascript
//js
app.post("/", (req, res) => {
  console.log(req.body.cityName); // cityName é o id do inputTextt que a gente quer pegar a informação
  console.log("post received");
});
```

## 247. The Mailchimp API - What You'll Make

Falando sobre a prática de api, que vai ser  coletar emails e nomes pra uma newsletter usando MailChimp e fazendo deploy com Heroku.

## 248. Setting Up the Sign Up Page

mostrando como pegar codigo pronto do bootstrap

vca vai em examples, pega o que quer, clica na pagina e vai em codigo fonte
la vc pode copiar e colar no seu projeto.

Instala o bootstrap no projeto com o cdn do bootstrap

Depois disso tem que no código fonte pegar o link do css externo, ir lá, copiar e colar no seu css externo. 

quando rodou no nodemon o css externo nao funcionou nem a imagem, a mesma coisa quando so tinha colocado o bootstrap no codigo

tem que adicionar `app.use(express.static("public"));` no código

faz uma pasta chamada public e bota os assets e o css dentro

## 249. Posting Data to Mailchimp's Servers via their API

`https://mailchimp.com/developer/`
criar conta, pegar apikey, pegar audience id
ver esse vídeo `https://www.youtube.com/watch?v=Xkp1ZFnibfU&ab_channel=Bizix`

criar o objeto js e transformar em json
```javascript
app.post("/", (req, res) => {
  const firstNAme = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstNAme, lastName, email);

  const data = {
    members: [
      {
        email_adress: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstNAme,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
});

```



a aula ta muito desatualizada, ta dando dor de cabeça ir atras das coisas, vou so assistir o resto dessa.

lembrar que o request tem que ir numa constante
`const request = https.request(...){...}`

e após `request.write(data); requed.end();`

código completo resolvido pego nos comentários

```javascript
//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "1c4fe749d59d6060ab47296be1d1d5cc-us17",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us17"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {
//*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
const firstName = req.body.firstName;
const secondName = req.body.secondName;
const email = req.body.email;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "6709310fbe";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
```

## 250. Adding Success and Failure Pages

depois ver de novo, nao consegui enviar as infos

## 251. Deploying Your Server with Heroku

ajeitar uns arquivos pro heroku aceitar e commitar
