# Advanced JS and DOM
###### 160. What We'll Make: Drum Kit
mostrando que vamos fazer um site com uma bateria tocável

###### 161. Download the Starting Files
download dos arquivos iniciais

###### 162. Adding Event Listeners to a Button
colocando um alerta quando clica
**SÓ FUNCIONA COM O PRIMEIRO BOTAO**
com função normal
```
document.querySelector("button").addEventListener("click", handleClick);

function handleClick(){
    alert("I got clicked!");
}
```
com função anonima
```
document.querySelector("button").addEventListener("click",function (){
    alert("I got clicked!");
} );
```

**Funcionando com todos os botões**
```
for(var i=0; i<document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        alert("I got clicked!");
        //alert when the button is clicked
    } );
}
```
