# Curso de .Net Core

## EF Core

**Aula 21** - O que faremos - EF Core intro
EF = Entity Framework / um ORM
Foi mostrado o andamento do projeto no final do capítulo

**Aula 22 e 23** - Instalando o EF
Desde o .Net 3 ele nao é mais considerado parte do framerowk, mas uma ferramenta dele
```dotnet tool list - -global``` comando para ver as ferramentas instaladas
`dotnet tool install --global dotnet-ef` comando para instalar o EF

Instalação, pelo NuGet, do EF, do EF Design, do EF Tool e do SQLite
**Aula 24** - Criando contexto
o codigo do contexto do banco de dados é padrão

```csharp
namespace ProEventos.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){ }
        public DbSet<Evento> Eventos { get; set; }
    }
}
```

**Aula 25** -  Migrations
`dotnet ef migrations add MyFirstMigration` command line para executar a migrations para o codigo de bd da classe que ja tenho

**Aula 26** - Contexto na controller
exibir conteúdo do BD pelo .net

### Considerações do capítulo

O contepudo mostrado nesse capítulo foi bem direto
Gostei da forma como o .net é uma ferramenta que te manda uma API funcional pré fabricada. O Entity framework tambem automatiza bastante coisa tornando o trabalho mais tranquilo, especialmente com o migrations. 

## Angular

### Rodando o projeto

>  `ng serve`

**Aula 34**  Criando componente

` ng generate component /local/local` 

ou
`ng g c [nome do componente]`

**Aula 35** - Usando componentes

Para utilizar o componente deve chamar como tag na forma em que está sua nomenclatura do **seletor**. Este seletor fica no arquivo typescript [nomeDoComponente].component.ts

Usaremos como exemplo o componente **palestrantes**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palestrantes',
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.css']
})
export class PalestrantesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

o uso do componente seria 

```html
<app-palestrantes> </app-palestrantes> 
```

Lembrar de sempre adicionar o componente no declarations do NgModule no `app.module.ts` quando feito de forma manual, já que automaticamente a linha de comando e criação de componente por cliques adiciona automaticamente

Bem como adicionar os modulos dentro do imports quandof or criado modulos



**Aula 36** - Diretiva ngFor



diretivas sao recursos do Angular que permite manipular o HTML



exibir informações do ts no HTML