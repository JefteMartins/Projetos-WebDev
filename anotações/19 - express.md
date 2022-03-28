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

