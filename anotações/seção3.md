# CSS

### Cascading Style Sheets

###### 31. Introduction  to CSS]
História rpida de pq o html foi criado
usava propriedades do HTML
menos código e mais fácil de ajeitar as coisas

###### 32. Inline CSS
colocando style nas tags
<body style="background-color: blue;"></body>
colorhunt.co (site para procurar paletas de cores)

###### 33. Internal CSS
falando sobre a tag <style></style>
e que as edições nele valem para as tags do codigo todo
 <style>
    body {
      background-color: #effffd;
    }
</style>
mudar as linhas horizontais usa-se 
hr{
}
pra mudar <h1></h1> usa-se
h1{
}
e por aí vai

###### 35. how debug css
falando sobre usar o chrome dev tools

###### 36. CSS Syntax
Selector {property: value;}
selector: quem vc vai mudar. Body, H1, HR etc
property: o que do selector vc vai mudar?
value: como? o valor daquilo que vc quer mudar

###### 37. CSS selector
criando classes pra chamar no CSS
tag{}
.class{}
' #id{} ' (sem os '')

###### 38. Classes vs. Id's
Id usa pra identificar um elemento específico, tu usa 1x
classes sao de usos multiplos 
da pra por mais de uma classe num elemento
class="classe1 classe2"

pseudo classes - diferentes estados
img:hover{
	background-color: gold;
}deixar background da imagem dourado quando tiver o mouse em cima

