# EJS

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