# jQuery
###### 175. What is jQuery?
Uma biblioteca JS, a mais famosa
uma diferença
```
// o codigo muda pra vermelho um h1 quando clicado
//JS Puro
for (i = 0; i < document.querySelectorAll("button").length; i++) {
 document.querySelectorAll("button")[i].addEventListener ("click", function () {
    document.querySelector ("hl").style.color = "red";
 });
}
//jQuery
$( "button").click(function() {
 $ ( "h1").css ("color", "red");
} )

document.querySelector("h1") === $("h1")
```
###### 176. How to Incorporate jQuery into Websites
usando cdn
`<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>`
deve ser colocado em cima da tag que incorpora o javascript
###### 177. How Minification Works to Reduce File Size
falando sobre os minify arquivos pra diminuir o tamanho dos arquivos
###### 178. Selecting Elements with jQuery
`$("h1")`
`$("h1 . title")`
assim como as outras combinações de seletores
e ja seleciona todos, nao rpecisando do selectAll

se der `console.log($("h1").css("color"));`
vai pegar a cor do h1
assim como pode pegar outras propriedades do css
`.addClass();`
para adicionar uma classe a um item html

`.addClass("casse1 classe2");`
adicionaria 2 calsses

`.hassClass()`
para ver se possui classe

###### 180. Manipulating Text with jQuery
`$("h1").text("novo texto);"`
mudando texto do elemnto com jquery

`$("button").text("mudou todos os botoes");`
`$("button").text("<em>tambem adiciona tags</em>");`

###### 181. Manipulating Attributes with jQuery
pegando o atributo
`console.log($("img").attr("src"));`
pegando o source da image

`console.log($("img").attr("src","novodiretório"));`
mudando o atributo

###### 182. Adding Event Listeners with jQuery
``$("h1").click(funcion(){
$("h1").css("color","purple");
})``

###### 183. Adding and Removing Elements with jQuery

` $("h1").before("sbutton>New</button>");`
tambem tem o `.after()`,`.prepend()` e `.append()`.
como ficaria em um codigo
``<div>
	.before()
		<h1>
			.prepend()
				elemento
			.append()
		</h1>
	.after()
</div>``

###### 184. Website Animations with jQuery
``$("h1").click(funcion(){
$("h1").hide(); //ou .show();
})``
para esconder ou fazer aparecer
fadeIn
fadeOut
fadeToggle
slideUp
slideDown

`$("button").on("click", function() {
 $("h1").animate({opacity: 0.5});
});` 
muda a opaciadade pra 50% do valor anterior
ou trocar opacidade por qualquer outra propriedade de css como margin, padding e etc

e da  pra colocar ações em fila como
``slideUp().slideDown().animate({codigo css})`` e etc


