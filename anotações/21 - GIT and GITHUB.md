# GIT and GITHUB

## 253. Introduction to Version Control and Git

falando sobre versionamento

## 254. Version Control Using Git and the Command Line

falando sobre command line 

`git init` pra iniciar o git na pasta
`git status` pra ver os arquivos que mudaram
`git add .` pra adicionar todos os que mudaram para commitar
`git commit -m "mensagem"` pra commitar com uma mensagem dizendo o que mudou
`git log` pra ver o que mudou 
`git diff "arquivo"` pra ver o que mudou
`git checkout "nome arquivo"` pra voltar ao que tava antes de tu dar add

## 255. GitHub and Remote Repositories 

falando sobre github e explicando como funciona

​                     origin/main pode ser qualquer nome
​                                           
`git remodte add origin/main  "url do repositório"`
`git push -u origin main` pra mandar pra main

## 256. GitHub Private Repos are now Free! ?

## 257. Gitignore

falando sobre .gitignore, rpa que serve e etc

basicamente evita alguns files e arquivos de serem carregados quando tu configura  o .gitignore

`git rm --cached -r .` tirar tudo do staged

## 258. Cloning

pegar a url do repo e usar
`git clone url`

vai baixar na pasta que tiver no terminal

## 259. Branching and Merging

`git branch  nomeDoBranch` criar branch
`git branch` mostra as branches
`git merge nomeDoBranch` pra mergear a o outro branch na main, caso vc esteja na main

 falou sobre readme.md

## 260. Optional Git Challenge

https://learngitbranching.js.org/?locale=pt_BR

## 261. Forking and Pull Requests

falando que é sobre fazer um clone do repositório de alguem no github deles e poder recomendar mudanças no seui repositório por meio do pull request