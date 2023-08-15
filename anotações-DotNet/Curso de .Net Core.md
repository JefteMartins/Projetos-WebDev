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

```ts
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements  OnInit {
  public eventos: any = [
    {
      Tema: 'Angular 11',
      Local: 'Belo Horizonte'
    },
    {
      Tema: 'Angular 12',
      Local: 'Teste'
    },
    {
      Tema: 'Angular 13',
      Local: 'Teste 2'
    },
  ]
  constructor() { }
  ngOnInit(): void {
  }
}
```

no html do componente ficaria (a grosso modo)

```html
<h1>Eventos  do Component</h1>

<p>{{eventos[0].Tema}}</p>
<p>{{eventos[0].Local}}</p>
```

e com o ngFor ficaria

```html
<div *ngFor="let evento of eventos">
    <p>{{evento.Tema}}</p>
    <p>{{evento.Local}}</p>
</div>
```

### Integrando front com o back

**Aula 36 e Aula 37 -** Request HTTP Angular e Config Cors

Criamos uma variável que irá receber nossos dados e vai ser utilizada no front


```typescript
public eventos: any;
```



Em nosso projeto angular começamos importanto o `HttpClientModule` em nossa sessão de imports dentro do @NgModule()
obs: importar tanto com o import {} from [ diretório ] como no imports: []

criamos dentro do construtor uma variável , nomeada como http nesse caso, do tipando HttpClient


```ts
constructor(private http: HttpClient) { }
```

após isso criamos um getEventos em que ele puxa as informações da nossa API com as informações já contidas no banco de dados



```typescript
public getEventos(): void {
    this.http.get("https://localhost:5001/api/eventos").subscribe(
     {
      next: (response: any) => {
        //atribuindo a response a varíavel criada anteriormente
        this.eventos = response;
      },
      error: (error: any) => {
        console.log(error);
      }
     }
    );
  }
```

No front é simples de se utilizar esses dados uma vez que eles foram atribuídos a uma variável

Com a diretiva NgFor é possível passar os dados da seguinte forma


```html
<h1>Eventos  do Component</h1>


<div *ngFor="let evento of eventos">
    <p><b>Tema:</b> {{evento.tema}}</p>
    <p><b>Local:</b> {{evento.local}}</p>
    <hr>
</div>

```

### Cors

Para ter acesso as informações vamos inicialmente permitir um acesso total a api por meio do cors

vamos adicionar

```csharp
services.AddCors();
```

Ao nosso ConfigureServices.  Bem como o 

```csharp
app.UseCors(
                x => 
                x.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());
```

ao nosso **Configure**