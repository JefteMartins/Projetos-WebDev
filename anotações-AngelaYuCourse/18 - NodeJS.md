#NodeJS

###### 218. What is Node.js?
usar node pois ja esta trabalhando com Js no front, entao trabalhará com js no backend também

###### 219. Install Node.js on Mac
Nao uso Mac

###### 220. Install Node.js on Windows
baixar em https://nodejs.org/en/

###### 221. The Power of the Command Line and How to Use Node
node + nome do arquivo
executa o arquivo no terminal com node

###### 222. The Node REPL (Read Evaluation Print Loops)
usar para rodar linhas de codigo como na ferramente de desenvolvedor
so dar `node` e esperar a aparecer o > na tela
para sair é só usar ``.exit`` ou ``control+c`` 2x
###### 223. How to Use the Native Node Modules
nodejs.org/api/
`//jshint esversion:6`
pra falar que ta usando a versão 6 do js e parar de dar erro
`const fs = require('fs');
fs.copyFileSync("file.txt", "file2.txt");`
primeiro o requerimento do filesystem, depois ele copia o conteúdo do primeiro campo pra um segundo campo. Como o segundo ainda nao existia, ele cria um novo.

###### 224. The NPM Package Manager and Installing External Node Modules
**Node Package Manager**
um packager manager para módulos externos

git init pra instalar o node na pasta

usar www.npmks.com para packages

usando como exemplo o package superheroes
install
`npm install --save superheroes
npm install superheroes`
usando
`var superheroes = require("superheroes");

var mySuperHeroName =  superheroes.random();

console.log(mySuperHeroName);`

