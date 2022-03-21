#Dicee-Game
### DOM

###### 149. Challenge: The Dicee Game
falando sobre o desafio que vai ser um "jogo" de rolar dados

###### 150. Dicee Challenge Step 0 - Download the skeleton project
download do início do projeto

###### 151. Dicee Chellenge Step 1 - Create an External Javascript file
criar o arquivo s cript.js

###### 152. Dicee Challenge Step 2 - Add Dice images
adicionar o diretório das imagens ao src da tag img

###### 153. Dicee Challenge Step 3 - Create a Random Number

criar um numero aleatorio de 1 a 6 usando javascript

```
var randomNumber1 = Math.floor((Math.random()*6)+1);
```

###### 154. Dicee Challenge Step 4 - Change the `<img>` to a Random Dice
```
var dice1 = document.querySelector(".img1");
dice1.setAttribute("src", "images/dice" + randomNumber() + ".png");
console.log("dice" + randomNumber1 + ".png");

function randomNumber() {
    return Math.floor((Math.random()*6)+1);
}
```

###### 155. Dicee Challenge Step 5 - Change both `<img>` Elements

```
var dice1 = document.querySelector(".img1");
var dice2 = document.querySelector(".img2");
dice1.setAttribute("src", diceeSrc(randomNumber()));
dice2.setAttribute("src", diceeSrc(randomNumber()));

document.getElementsByTagName('h1')[0].innerHTML = "Player X won! ";

function randomNumber() {
    return Math.floor((Math.random()*6)+1);
} 

function diceeSrc(randomNumber) {
    return "images/dice" + randomNumber + ".png";
}


```
###### 156. Dicee Challenge Step 6 - Change the Title to Display a Winner
`document.getElementsByTagName('h1')[0].innerHTML = "Player X won! ";`
###### 157. The Solution to the Dicee Challenge
resolvendo o desafio, meu final ficou assim

```
var dice1 = document.querySelector(".img1");
var dice2 = document.querySelector(".img2");
var numberDicee1 = randomNumber(6);
var numberDicee2 = randomNumber(6);
dice1.setAttribute("src", diceeSrc(numberDicee1));
dice2.setAttribute("src", diceeSrc(numberDicee2));


if(numberDicee1 > numberDicee2) {
    document.getElementsByTagName('h1')[0].innerHTML = "Player 1 won! ";
} else if(numberDicee1 < numberDicee2) {
    document.getElementsByTagName('h1')[0].innerHTML = "Player 2 won! ";
} else {
    document.getElementsByTagName('h1')[0].innerHTML = "Draw! ";
}

function randomNumber(number) {
    return Math.floor((Math.random()*number)+1);
} 

function diceeSrc(randomNumber) {
    return "images/dice" + randomNumber + ".png";
}


```

