# EJS

### ***Embedded JavaScript***

## 263. What We'll Make: A ToDoList

falando que vamos aprender sobre partials e que faremos uma todo list

## 264. Linter Errors with EJS

recado rapido pra quem ta tendo erro no atom, to usando vscode

## 265. Templates? Why Do We Need Templates?

começou falando sobre ter os codigos inciais padrão do server express
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

um codigo pra ver o dia
```javascript
var today = new Date();

  if (today.getDay() == 0 || today.getDay() == 6) {
    res.send('WEEKEND BABY');
  } else {
    res.send('oh no');
  }
```

falando sobre criar um código padrao pra ir substituindo em paginas que vao se repetir muito

## 266. Creating Your First EJS Templates

fazendo template com ejs
ejs.co

`npm i ejs` instalar no projeto
` app.use("view engine", "ejs");`

o app.use tem que ficar sempre abaixo da constante que chama o express

ele carrega arquivos dentro das `views`que estão dentro de uma pasta com esse mesmo nome que vc cria

esses arquivos sao html e vc passa parametros pra esse arquivo html usando
`<%= variavel %>` coo uma tag html

`<h1>It's a <%= kindOfDay %>!</h1>` 

para passar o parametro no .js vc deve usar 

```javascript
day = "Weekend";
res.render("list", {kindOfDay: day});
```

sendo render a nova função, passando o nome do arquivo dentro do views e um objeto javascript passando a informação que será transferida.

## 267. Running Code Inside the EJS Template

usando a tag <% codigo %> em cada linha de JS que escrever

## 268. Passing Data from Your Webpage to Your Server

Com form normal usando body parse

## 269. The Concept of Scope in the Context of Javascript

falando sobre escopo, sobre como variaveis podem ser usadas em uns lugares mas em outros nao

diferença de var, let e const

> var 
>
> > locais em funções, globais em estrutura de condições
>
> let
>
> > locais em funções e condições
>
> const
>
> > não alterável, locais em funções e condições 

## 270. Adding Pre-Made CSS Stylesheets to Your Website

tem que falar pro express onde pegar esse css, ja que roda o arquivo do servidor `app.js` e ele so encontra as views e o html
entao usa-se o `app.use(express.static("public"));` 

ver os css selector reference

## 271. Understanding Templating vs. Layouts

templating com arquivos guardando pedaços de html

da pra colocar a parte do header dentro de arquivo .ejs e chamar de `header.ejs`

e chamar no codigo como `<%- include("header") -%>`

entao pode ser

```html
<%- include("header") -%>
    <body>
        <!-- conteúdo do body -->
    </body>
```

## 272. Understanding Node Module Exports: How to Pass Functions and Data between Files

cria um arquivo js com as funções que desejar
No começo do arquivo js tem que ter `module.exports.getDate = getDate;`

no app.js tem que fazer a requisição como os packages npm, mas com o __dirname ja que é um package local

`const date = require(__dirname + "/date.js");`

com arrow function e shortcut sem o nome module ficaria:

```javascript
exports.getDate = () => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return (day = today.toLocaleDateString("pt-BR", options));
};
```

