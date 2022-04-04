# Advanced JS and DOM
###### 160. What We'll Make: Drum Kit
mostrando que vamos fazer um site com uma bateria tocável

###### 161. Download the Starting Files
download dos arquivos iniciais

###### 162. Adding Event Listeners to a Button
colocando um alerta quando clica
**SÓ FUNCIONA COM O PRIMEIRO BOTAO**
com função normal
```javascript
document.querySelector("button").addEventListener("click", handleClick);

function handleClick(){
    alert("I got clicked!");
}
```
com função anonima
```javascript
document.querySelector("button").addEventListener("click",function (){
    alert("I got clicked!");
} );
```

**Funcionando com todos os botões**

```javascript
for(var i=0; i<document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        alert("I got clicked!");
        //alert when the button is clicked
    } );
}
```

###### 163. Higher Order Functions and Passing Functions as Arguments
passando funções como parametros
```javascript
function add(num1, num2) {
    return num1 + num2;
function multiply(num1, num2) {
    return numl * num2;
function calculator(num1, num2, operator) {
    return operator(num1, num2):
```
pode-se usar a função 
`debugger;`
código abaixo

no console para debugar o código

###### 164. Higher Order Function Challenge Solution
uma calculadorazinha
```javascript
function add(num1, num2) {
return num1 + num2;
}
function subtract(num1, num2) {
return num1 - num2;
}
function multiply(num1, num2) {
return num1 * num2;
}
function divide(num1, num2) {
return num1 / num2;
}
function calculator(num1, num2, operator) {
return operator(num1, num2);
}
```


###### 165. How to Play Sounds on a Website
usando o this para pegar as infos do botao que foi clicado e entrou na função
```javascript
for(var i=0; i<document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        this.style.color = "white";
    } );
}

```

###### 166. A Deeper Understanding of Javascript Objects
construtor
```javascript
function Housekeeper (years0fExperience, name, cleaningRepertoire) {
    this.yearsofExperience yearsofExperience;
    this.name = name;
    this.cleaningRepertoire = cleaningRepertoire;
```
inicializando
`var housekeeper1 = new Housekeeper(9, "Ton", ["lobby", "bedroon"]); 
`

###### 167. How to Use Switch Statements in Javascript
codigo construido com switch case
```javascript
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;
    switch (buttonInnerHTML) {
      case "w":
        var tom1 = new Audio("sounds/tom-1.mp3");
        audio.play();
        break;
      case "a":
        var tom2 = new Audio("sounds/tom-2.mp3");
        audio.play();
        break;
      case "s":
        var tom3 = new Audio("sounds/tom-3.mp3");
        audio.play();
        break;
      case "d":
        var tom4 = new Audio("sounds/tom-4.mp3");
        audio.play();
        break;
      case "j":
        var snare = new Audio("sounds/snare.mp3");
        audio.play();
        break;
      case "k":
        var crash = new Audio("sounds/crash.mp3");
        audio.play();
        break;
      case "l":
        var kick = new Audio("sounds/kick-bass.mp3");
        audio.play();
        break;
      default:
        console.log(buttonInnerHTML);
    }
  });
}

// var tom1 = new Audio("sounds/tom-1.mp3");
// tom1.play();
```

###### 168. Objects, their Methods and the Dot Notation
```javascript
function Housekeeper (yearsofExperience, name, cleaningRepertoire) {
    this. years0fExperience = yearsofExperience;
    this.name = name;
    this.cleaningRepertoire = cleaningRepertoire;
    this.clean = function () {
        alert("Cleaning in progress...");
```
###### 169. A quick note about the next lesson
falando pra usar `keydown` ao inves de `keypressed` 

###### 170. Using Keyboard Event Listeners to Check for Key Presses
```javascript
document.addEventListener("keydown", function(event){
    console.log(event.key);
})
```

###### 171. Understanding Callbacks and How to Respond to Events
o codigo acima seria uma callback function, pq ele espera uma coisa acontecer pra chamar uma função
```javascript
$0. addEventListener("click", function(event) {
   console. log(event);
});
```
