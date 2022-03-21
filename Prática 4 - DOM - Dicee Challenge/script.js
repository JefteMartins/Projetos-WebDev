var dice1 = document.querySelector(".img1");
var dice2 = document.querySelector(".img2");
dice1.setAttribute("src", "images/dice" + randomNumber() + ".png");
dice2.setAttribute("src", "images/dice" + randomNumber() + ".png");
console.log("dice" + randomNumber1 + ".png");
function randomNumber() {
    return Math.floor((Math.random()*6)+1);
} 
