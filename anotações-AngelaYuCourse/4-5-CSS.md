# CSS
### Cascading Style Sheets
## 31. Introduction  to CSS
História rpida de pq o html foi criado
usava propriedades do HTML
menos código e mais fácil de ajeitar as coisas
## 32. Inline CSS
colocando style nas tags

```html
<body style="background-color: blue;"></body>
```

colorhunt.co (site para procurar paletas de cores)
## 33. Internal CSS
falando sobre a tag 

```html
<style></style>
```

e que as edições nele valem para as tags do codigo todo
 <style>
    body {
      background-color: #effffd;
    }
</style>
mudar as linhas horizontais usa-se 
`hr{`
`}`
pra mudar `<h1></h1>` usa-se
`h1{`
`}`
e por aí vai

## 35. how debug css
falando sobre usar o chrome dev tools
## 36. CSS Syntax
Selector {property: value;}
selector: quem vc vai mudar. Body, H1, HR etc
property: o que do selector vc vai mudar?
value: como? o valor daquilo que vc quer mudar

## 37. CSS selector
criando classes pra chamar no CSS
tag{}
.class{}
' #id{} ' (sem os '')
## 38. Classes vs. Id's
Id usa pra identificar um elemento específico, tu usa 1x
classes sao de usos multiplos 
da pra por mais de uma classe num elemento
class="classe1 classe2"


pseudo classes - diferentes estados
img:hover{
	background-color: gold;
}deixar background da imagem dourado quando tiver o mouse em cima

## 41. What We'll Make - Stylised Personal Site
um vídeo sobre o que criaremos e pedindo para criar um projeto novo com as tags basicas do html e um external css ja linkado
## 42. What are Favicons?
criando favicon em favicon.co
## 43. HTML Div's
criação de Div's e como sao usadas para dividir o site
## 44. the box model of website styling
de dentro pra fora
conteúdo - > padding - > border -> margin
## 45.CSS Display Property
usar `<span></span>` pra ter coisas na mesma linha
<p>Te<span>s</span>te</p>
sairia Teste ao invés de TE
                         s
                         te
os elementos que sao inline pode alterar o display para block no CSS assim como os block para inline. Abrindo mão de propriedades como width. O inline pega somente o espaço necessário
>Block
>inline
>inline-block
>none tira o elemento  Pode usar visibility: hidden, mas esse deixa o espaço
## 46. Sem vídeo
## 47. CSS Static and Relative Positioning
>Static -> default
>Relative
>Absolute
>Fixed

## 48. Absolute positioning
localiza o elemento de acordo com o elemento pai que ele está inserido
###### 49. The Dark Art of Centering Elements with CSS
nao sei o que falar sobre isso vou ter que estudar todo dia ate entender bem
## 50. Font styling in our personal website
estilização de fonte
## 51. Learn More About Typography
link para sessão do curso com aulas de tipografia
## 52. Adding content to our website
colocando umas imagens que ela disponibilizou
## 53. CSS Sizing
usando font size e etc
## 54. 55. 56. CSS challenges
challenges
## 58. Css Float and clear
usando o float da img para left e deixar eles (imagem e texto abaixo) alinhados horizontalmente.
clear left vai fazer a imagem ficar acima do texto a esquerda
## 59. CSS Challenge
outro challenge
## 60. Stylised Personal Site Solution Walkthrough
resolução de como estilizar o site resolvendo o challenge anterior
## 61. practice
replicar essa landing page aqui
https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3
## 62. Tip from Angela - Nothing Easy is Worth Doing!
motivacional



