# Bootstrap
###### 63. What is bootstrap
explicando bootstrap e um pouco de historia
###### 64. Instaling bootstrap
dizendo como usar, e que preferencialmente o uso será com a tag do metadado
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
colocar antes de **TODOS** os stylesheets
###### 65. Web Design 101 - Wireframing
uso de wireframe e pq criamos
###### 66. The Bootstrap Navigation Bar
exemplo de estrutura
<nav class="navbar"> usando a classe nabar
	<ul class="navbar-nav"> a navegação (conjunto dos itens da lista)
		<li class="nav-item"> item de navegação
			<a class="nav-link">item</a> item em si
		</li>
	</ul>
</nav>
dessa forma os itens vao ficar
item1
item2
item3

para deixar alinhado horizontalmente precisa usar o navbar-expand que possui os tamanhos 
sm small
md medium
lg large
xl extra large
xxl extra extra large
ex: navbar navbar-expand-lg (no item <nav></nav>)
use o bg-light para dar um background branco ao item nav, assim como outros bx-x

navbar com menu sanduiche quando fica pequeno
usa um botao de navbar collpase com uma div de navbarcollpase que tem dentro todos os itens que podem "colapsar"
exemplo completo
```
<nav class="navbar bg-dark navbar-expand-lg navbar-dark">
    <a class="navbar-brand" href="">Tindog</a>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" href="">Contact</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="">Pricing</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="">Download</a>
        </li>
    </ul>
 </div>
</nav>
```
###### 67. Wha We'll Make: TinDog
falando sobre o projeto de agora
###### 68. Download the Starting Files
link para download dos arquivos que vao ser usados
###### 69. Setting Up Our New Project
abrindo os arquivos ja criados e colocando o bootstrap no codigo
e mostrando que precisa colocar o javascript pra ter o menu sanduiche funcionando
###### 70. Boostrap Grid Layout System
**Reponsividade**
sistema de grid, exemplo
<div class="row">
	<div class="col-6">col-6</div> <!--- so vai pegar metade da tela pq ela é dividida em 12 e nesse caso vai pegar 6 de 12 partes --->
</div>

<div class="row">
	<div class="col-md-6">col-md-6</div>
	<div class="col-md-6">col-md-6</div>
</div>
nesse caso ao invés de ter 2 partes que ocupariam a mesma coisa independente do tamanho da tela, quando ficasse pequena demais =elas ficariam em formato de coluna, não de linha
- 
-  ao invés de - -

para ficar com 3 unidades de tamanho em tela larga, 4 em média e etc
utilizatia a classe `col-lg-3 col-md-4 col-sm-6`
<div class="row">
	<div class="col-lg-3 col-md-4 col-sm-6">col-md-6</div>
	<div class="col-lg-3 col-md-4 col-sm-6">col-md-6</div>
</div>
###### 72. Adding Grid Layouts to Our Website
prático
###### 73. A note about css link order
falando sobre os impactos da ordem de da tag link no header
###### 74. Bootstrap Conteiners
diferença da classe conteiner e conteiner-fluid
ambos ja sao responsivos independente do tamanho da tela mas o fluid pega a tela toda
###### 75. Bootstrap Buttons & Font Awesome
adicionando botoes do bootstrap e indo no site fontawesome.com pra pegar os icons
###### 76. Styling Our Website Challenges and Solutions
prática de estilização do site
###### 77. Bootstrap Challenge 1
passando o desafio
###### 78. Solution to Bootstrap Challenge 1
resolvendo o desafio
###### 79. Tip from Angela- How to Deal with Procrastination
motivacional
###### 80. The Bootstrap Carousel Part 1
estilizalção simples
###### 81. The bootstrap Carousel 2
uso de carousel, classe do bootstrap
###### 82. Bootstrap Cards
uso de card com a classe card, tendo um card-header e um card body 
###### 83. The CSS Z-Index and Stacking Order
tem que ter posicionamento
0 é o default o 1 fica em cima e o -1 embaixo
se o item que vai ficar em cima vem depois, voce pode nao precisar usar z-index. Ja que com um absolute ficando embaixo um outro relative poderia sobrepor

######  84. Media Query Breakpoints
basicamente sobre media query, que são "gatilhos" para mudar algo no código
`@media screen and (max-width: 1024px){
	tananana: 328913671; /* vai acontecer o tanana quando a tela tiver menos que 1024 píxels/*
}`
###### 85. Bootstrap Challenge 2
passando desafio
###### 86. Bootrstrap Challenge 2 Solution
resolvendo o desafio da 85.
###### 87. How to become a Better Programmer - Code Refactoring
Code refactoring
1. Readability
2. Modularity
3. Efficiency
4. Length
###### 88. Put it into Practice - Refactor our Website Part 1
`{h1, h2, h3{
 /*exemplo para taggear várias tags de uma vez só*/
} #title .conteiner-fluid {
  padding: 3% 15% 7%;  /* Pega o conteiner fluid que ta dentro de title*/
}
`
###### 89. Advanced CSS - Combining Selectors
`#title .conteiner-fluid`¹
lê-se da direita pra esquerda, entao todo conteiner fluid dentro de title vai sofrer a alteração. Se fosse algo com `#title` dentro de um conteiner fluid o código seria
`.cointeiner-fluid #title`
¹
<div id="title">
	<div class="conteiner-fluid">
</div></div>
²
<div class="conteiner-fluid">
	<div id="title">
</div></div>

outra forma seria sem o espaço
`h1#title`
seria o h1 com #title, nao o #title que está em um H1
só funciona no msm level
como em 
`<div id="title">
	<h1>teste</h1>
</div>`
e não em 
`<div id="title">
	<h1>teste</h1>
</div>`
###### 90. Refactoring our Website Part 2
refatorando o codigo
###### 91. Advanced CSS - Selector Priority
inline css tem prioridde em cima de external css
inline> external (id > class > tag)
###### 92. Completing the Website
revendo o site e finalizando
