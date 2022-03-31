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
