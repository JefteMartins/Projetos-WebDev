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

