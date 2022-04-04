# **Blog Challenge**

## 274. A New Challenge Format and What We'll Make: A Blog

falando sobre o desafio e como vai ser o formato dos vídeos nessa seção.

## 275. Setting Up the Blog Project

baixando os arquivos iniciais e dando `npm install` 

## 276 & 277. Challenge 1

redirecionar o "/" pro .ejs home e retornando um h1 escrito home

## 278 & 279. Challenge 2

adicionar um paragrafo recebendo uma variavel do app.js usar a tag <=% %>

## 280 & 281. Challenge 3

linkar o .ejs header e footer nas paginas 

usar
`<%- include("header") -%> `

## 282 & 283. Challenge 4

criar uma pasta chamada partials e botar os .ejs header e footer dentro

`<%- include("partials/header") -%>` fica assim com a pasta

## 284 & 285. Challenge 5

fazer o redirect pro /contact e /about com os include e o texto que ta no app.js

## 286 & 287. Challenge 6

fazer os botoes da navbar redirecionar pras abas rfeitas no 284 e 285

## 288 & 289. Challenge 7

fazer uma pagina chamada compose que tenha um input e um botao

## 290 & 291. Challenge 8

pegar o que escreveu no input e exibir no console

## 292 & 293. Challenge 9

fazer um form melhor com text area e colocar as classes do bootstrap

## 294 & 295. Challenge 10

passando o title e o body num bojeto js

## 296 & 297. Challenge 11

criar um array posts, colocar o objeto dentro do array quando der submit e mostrar os posts armazenados no console

## 298 & 299. Challenge 12

passar o array de listas como console log na aba home

## 300 & 301. Challenge 13

mostrar o titulo de todos os posts criados no console

## 302. Challenge 14 and Solution

trocar o for por foreach, mas eu ja usava

## 303 & 304. Challenge 15

fazer o post aparecer com h1 e p

## 305. Express Routing Parameters

`app.get("/posts/:postName", (req, res)`

o `:postName` pode ser chamado depois com
`res.params.postName`

## 306 & 307. Challenge 16

```java
app.get("/posts/:postName", (req, res) => {
  console.log(req.params.postName);
});

```

## 308 & 308. Challenge 17

```javascript
posts.forEach((post) => {
    if (post.title.toLowerCase() === req.params.postName.toLowerCase()) {
      console.log("Match Found!");
    }
  });
```

## 310 & 311. Challenge 18

usar lodash

`const _ = requires("lodash");`

`if (_.lowerCase(post.title) === _.lowerCase(req.params.postName))`

## 312 & 313. Challenge 19