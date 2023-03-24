# JavaScript
###### 101. Introduction to Javascript
História do JS
###### 102. Javascript Alerts - Adding Behaviour To websites
formas de programar na web
devtools > console
devtools > sources > no canto esquerto clicar na '>>' que fica do lado de network e  filessystem > snippets > new snippet e programa

guidelines
https://github.com/rwaldron/idiomatic.js
###### 103. Data Types
string, numbers, boolean
typeof(); retorna o tipo
###### 104. Javascript Variables
uso de var
###### 105. Javascript Variables Exercise Start
explicando a tarefa
###### 106. Javascript Variables Exercise Solution
exercicio
######  107. Naming and Naming Conventions for Javascript Variables
###### Teste 2: Javascript Variable Naming Quiz
um teste sobre variaveis
###### 108. String Concatenation
basicamente fazendo retorno de 2 variaveis que guardam string
###### 109. String Lengths and Retrieving the Number of Characters
função .length
###### 110. Slicing and Extracting Parts of a String
função slice(primeiraPosição, segundaPosição(vai ate uma antes dessa));
```
var teste = 'teste'
teste.slice(0,2); // te

var tweet = prompt ("Compose your tweet:");
var tweetunder140 = tweet.slice(0,140);
alert(tweetUnder140);
           
```
###### 111. Challenge: Changing Casing in Text

.toUpperCase(); deixa tudo maiusculo
.toLowerCase(); tudo minusculo 

###### 112. Challenge: Changing String Casing Solution
deixar a primeira letra de um nome maiuscula

###### 113. Basic Arithmetic and the Modulo Operator in Javascript

` + - / * % `

###### 114. Increment and Decrement Expressions
x = x + 1;
x++;
x--;
x+= y;
###### Teste 3: Javascript Numbers Quiz
quiz sobre numeros

###### 115. Functions Part 1: Creating and Calling Functions
ensinando funções

###### 116. Functions Part 1 Challenge - The Karel Robot
exercicio no https://stanford.edu/~cpiech/karel/ide.html

###### 119. Functions Part 2: Parameters and Arguments
function func (var name){}
}
rounddown Math.floot(numero); arrendondar pra baixo


```
function lifeInWeeks(age) {
    var yearsRemaining - 90 - age;
    var days - yearsRemaining • 365;
    var weeks = yearsRemaining • 52;
   var months - yearsRemaining • 12;
    console.log("You have + days + days, " + weeks + " weeks, and " + months + " months left.");
}
```

###### 121. Functions Part 3: Outputs & Return Values
funções com return

###### 122. 123.  Challenge: Create a BMI Calculator
criando uma calculadora de imc e resolvendo

###### 124. Tip from Angela - Set Your Expectations
moitivacional

###### 125. Random Number Generation in Javascript: Building a Love Calculator
uma forma de simular um dado
```
var n = Math.random(); // varia entre 0 e 0.999999999
n = n* 6
n = Math.floor(n) + 1;
```
###### 126. Control Statements: Using If-Else Conditionals & Logic
if else
###### 127. Comparators and Equality
===
!==
'>'
'<'
etc
e falando que com == string '1' == 1 true e com === da false
###### 128. Combining Comparators
&& || 
###### 129. Introducting the Leap Year Code Challenge
falando sobre o desafio do ano bissexto
###### 130. Leap Year Solution
resolução do problema passado
###### 131. Collections: Working with Javascript Arrays
função .include pra saber se algo está dentro do array
```
var guestlist = ["Angela", "Jack", "Pam", "James", "Lara", "Jason"1;
var guestName = prompt("What is your name?");
                                                        I
if (guestlist.includes(guestName)) {
    alert("Welcome!");
 } else {
    alert("Sorry, maybe next time.");
```
###### 132. Adding Elements and Intermediate Array Techniques
uso de push
###### 133. Who's Buying Lunch Solution
function whosPaying(names) {
   var numberofPeople = names.length;
   var randomPersonPosition = Math.floor(Math.random() * number0fPeople);
   var randomPerson = names [randomPersonPosition];
   return randomPerson + " is going to buy lunch today!";
}
###### 134. Control Statements: While Loops
while
###### 135. Solution to the 99 Bottles Challenge
solução
###### 136. Control Statements: For Loops
for simples
for(var i; i<x ; i++){
}
