# DOM
### Document Object Model
###### 140. Adding Javascript to Websites
Assim como CSS, tem o inline e o external javascript
```
<body onload="alert('Helto')">
  ch1>Hello</h1>
</body>
```
pontos baixos do js inline: nao é modular, dificil de debugar e não é boa prática

internal script pode ser inicado com a tag
`<script src="index.js<!--é o local odne ta o javascript-->" charset="utf-8"></script>`

a tag do script vai no final do body

###### 141. Introduction to the Document Object Model (DOM)
escrever `document;` no console de uma pagina retorna o html inteiro
extenção html tree generator pra ver o que ta sendo usado em uma arvore

num documento de exemplo
HTML -------HEAD
     |------BODY
`document.FirstElementChild.FirstElementChild;`

retorna o codigo do Head que é o primeiro filho (Head) do primeiro filho (HTML)
usando lastElementChild seria o ultimo

variável pode armazenar o codigo HTML das sessões da pagina
`var heading = document.FirstElementChild.FirstElementChild;`
`heading.style.color = "red"` mudaria a cor do heading para vermelho
pode usar `document.querySelector("input").click;`

para clicar um campo por meio do código
pode contar propriedades e métodos

###### 142. Solution to the DOM Challenge
solução pra selecionar um elemento específico
`document.firstElementChild.lastElementChild.lastElementChild.lastElementChild.innerHTML = "Angela"`
###### 143. Selecting HTML Elements with Javascript
dando exemplos de selecionar tags html
`document.getElementsByTagName("li");`
vai pegar todos os elementos li pq tem elementS<< nao, Element
`document.getElementsByTagName("li")[2].style.color = "purple"; `
`[2]` pq tinham 3 li's e retornou um array de li no getElementsById
pode-se usar a combinação de classes assim como no css
`document.querySelector("li.item")`
pegaria uma `<li class="item">`
caso fosse uma tag dentro da lista seria da mesma forma  como no css
`document.querySelector("li a")`
para um `<li><a>teste</a></li>`

###### 144. Manipulating and Changing Styles of HTML Elements with Javascript
https://www.w3schools.com/jsref/dom_obj_style.asp
###### 145. The Separation of Concerns: Structure vs Style vs Behaviour
falou sobre usar o dom para adicionar classes as tags, ao inves de ficar mudando o CSS diretamente pq é uma prática ruim
`docunent.queryselector("h1").classList.add("huge");`
diferença de innerHtml para textContent
o inner da tudo que ta dentro da tag, inclusive outras tags como `<strong>` o textContent so daria o escrito, até mesmo dentro do `<strong>`
###### 147. Manipulating HTML Element Attributes
atributos de tags sao tudo que vao dentro de <>
como href, type e etc
###### 148. Tip from Angela - The 20 Minute Method
motivacional
