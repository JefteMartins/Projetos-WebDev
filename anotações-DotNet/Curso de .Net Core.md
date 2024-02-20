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

**Seção 6 - Múltiplas Camadas**

A ideia da sessão em questão é começar a lidar com a arquitetura da API, além de melhorias. Vamos criar uma solutions e class libraries para melhorar o projeto. Começaremos com a criação de uma solution

Criação de uma Solution

```
dotnet new sln -n [inserir nome]
```

Depois disso com a criação de três class libraries

```
dotnet new classlib -n [nome da librarie]
```

Foi criado um `Proeventos.Persistence` para a camada de persistencia, um `Proeventos.Domain`para dominio e uma application `Proeventos.Application`

A ideia é que a API entre em contato com a Application que utilize o Domain e o Application tambem entre em contato com a persistence.

**Aula 56 -  Referenciando Projetos**

Adicionando o projeto a solution

`dotnet sln [nome da solution] add [nome do projeto]`

ex: 
```
dotnet sln ProEventos.sln add ProEventos.Application
```

Adicionando referencia ao projeto da API

```
dotnet add ProEventos.API/ProEventos.API.csproj reference ProEventos.Application
```

**Aula 57 - Entidades Domínio: Parte 1**

![[Modelo Das Entidades.canvas]]
**Aula 59, 60 e 61 - Novo context e migrations**

Mudança do nome DbContext para ProEventosContext
Instalando EF Core da versão correta para o projeto, corrigindo erros de build (maioria so namespaces errados)
e, finalmente, migrations.
`dotnet ef migrations add Initial -p Proeventos.Persistence -s ProEventos.API` 


Fazer update do banco de dados

adicionando Microsoft.EntityFrameworkCore.Tools no csproj

```html
<ItemGroup>

    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="5.0.2" />

    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="5.0.2" />

</ItemGroup>
```


apos isso só executar o comando para criar o banco de dados

`dotnet ef database update -s ProEventos.API` 

**Aula 63: Interface Persistencia**

Nessa etapa foi criada uma interface pra guiar nosso crud. Usando genericos foi criado metodos add, update, delete e range. Além de Tasks para pegarmos os eventos ou palestrantes podendo ou nao puxar somente 1 ou os 2 juntos.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace Proeventos.Persistence
{
    public interface IProEventosPersistence
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void Range<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        //eventos
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventosAsync(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventoByIdAsync(int EventoId, bool includePalestrantes);
        
        //palestrantes
        Task<Evento[]> GetAllPalestrantesByNomeAsync(string Nome, bool includeEventos);
        Task<Evento[]> GetAllPalestrantesAsync(bool includePalestrantes);
        Task<Evento[]> GetAllPalestranteByIdAsync(int PalestranteId, bool includeEventos);
    }
}
```

**Aula 63 a 67 - Persistência**

Construção da camada de persistencia com interfaces e implementação dos primeiros métodos do projeto 
Ex:
```csharp
public interface IEventoPersist

    {
        //eventos
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);

        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);

        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);

    }
```

implementação de um dos metodos
```csharp
public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedesSociais);
            if (includePalestrantes)
            {
                query = query.Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }
            query = query.OrderBy(e => e.Id);
            return await query.ToArrayAsync();
        }
```

reestruturação das pastas para melhor design do projeto.

**Aula 68 a 70** - Application
Criando a camada de aplicação utilizando os metodos previamente criados na camada de persistencia

Seguindo exemplo de puxar todos os eventos

```csharp
 public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
                if (eventos == null) return null;
                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
```

**Aula 71 e 72** - Controller


Agora finalmente podemos rodar o projeto novamente com 
`dotnet watch run`

**Aula 127 -** EventoDto

Começaremos a usar os Data Transfer Objects, ou DTO's.
Vem pra sanar um problema de exposição excessiva do domínio.

Ele vem como objeto que transfere os dados da nossa api pra quem a consome

Como fazemos isso no projeto?

No ProEventos.API criamos uma pasta Dtos e dentro dela uma classe EventoDto.
Dentro dela inicializamos uma classe com as mesmas classes de evento do dominio
```csharp
namespace ProEventos.API.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        // public IEnumerable<Lote> Lotes { get; set; }
        // public IEnumerable<RedeSocial> RedesSociais { get; set; }
        // public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}
```


O instrutor optou por nao usar as propriedades que usam IEnumerable (rever)
No EventoController no endpoint `get` nos adicionamos um novo EventoDto

```csharp
public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);
                if (eventos == null) return NotFound("Nenhum evento encontrado.");
                var eventoRetorno = new List<EventoDto>();
                foreach (var evento in eventos)
                {
                    eventoRetorno.Add(new EventoDto()
                    {
                        Id = evento.Id,
                        Local = evento.Local,
                        DataEvento = evento.DataEvento.ToString(),
                        Tema = evento.Tema,
                        QtdPessoas = evento.QtdPessoas,
                        ImagemURL = evento.ImagemURL,
                        Telefone = evento.Telefone,
                        Email = evento.Email
                    });
                }
                return Ok(eventoRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }```

Dessa forma, nao exponho diretamente tudo o que minha api tem, mas um eventoRetorno

Dessa forma, o retorno do endpoint obtido foi o seguinte

```json
[
  {
    "id": 2,
    "local": "Maracanaú",
    "dataEvento": "02/09/2023 00:21:15",
    "tema": "Angular 11",
    "qtdPessoas": 350,
    "imagemURL": "Foto2.png",
    "telefone": "2345678",
    "email": "tanahorademolharobiscoito@hotmail.com"
  },
  {
    "id": 3,
    "local": "Fortaleza",
    "dataEvento": "02/09/2023 00:21:15",
    "tema": "Angular 11",
    "qtdPessoas": 350,
    "imagemURL": "Foto.png",
    "telefone": "2345678",
    "email": "tanahorademolharobiscoito@hotmail.com"
  }
]
```

Passando somente as informações recebidas no Dto

**Aula 128- ** AutoMapper e Profile (rever)

Instalação do automapper para usarmos no mapeamento dos campos de forma automatizada, ao inves de escrever um por um como fizemos no get da API

Primeiro vamos mudar os DTO's e Helpers que fizemos para a camada de aplicação pois os campos nao podem estar presentes na API. A ideia é que a API fique totalmente desprendida da camada de dominio.

como o Dto ja foi mostrado ali em cima, mostro agora o ProEventosProfile, que lida com o AutoMapper e está dentro da pasta Helpers

```csharp
using AutoMapper;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.Helpers
{
    public class ProEventosProfile: Profile
    {
        public ProEventosProfile()
        {
         CreateMap<Evento, EventoDto>();
        }
    }
}
```

Após isso temos que mudar nosso Contrato, para que ele retorne um Dto para a camada de API ao invés de retornar um objeto com o model

```csharp
using System.Threading.Tasks;
using ProEventos.Application.Dtos;
namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEvento(int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int eventoId);
        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}
```

Em seguida, temos que ir no nosso EventoService e atualizar os 
`Task<Evento> ` para `Task<EventoDto>` e `Evento model` para `EventoDto model`

**Aula 128 a 130 -** Dto e profile em application

[Link para o post da aula](https://x.com/jetfemartins/status/1707957396507705647?s=20)

Da forma com que foi feito, ainda fica muito exposto. Não pe certo que montemos o que vai ser retornado pro usuário dentro da nossa camada de API. Então os Dto's e os  helpers com o map foram movidos para dentro da camada de aplicação. No ProEventos.Application >EventoService.cs começamos a fazer as mudanças para que ele possa receber as informações da camada de dominio para enviar para a API com o Dto sem expor nossa camada de dominio.

Primeiro desfazemos as mudanças do ProEventos.API >Controllers >EventosController.cs

[commit da aula]([implementando primeiro mapper · JefteMartins/ProEventos@4ebdc7e (github.com)](https://github.com/JefteMartins/ProEventos/commit/4ebdc7e54c2d76c336de6723a0b9cbf182bf2f5b))


**aula 131 -** mapeando metodo Add

```csharp
public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                var evento = _mapper.Map<Evento>(model);
                _geralPersist.Add<Evento>(evento);
                if (await _geralPersist.SaveChangesAsync())
                {
                    var retornoEvento = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);
                    return _mapper.Map<EventoDto>(retornoEvento);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }```

Um problema foi encontrado nessa solução. O mapper é feito tanto de EventoDto para Evento, como de Evento para EventoDto. Porém, confirme visto em aulas anteriores, o
`CreateMap<Evento, EventoDto>()` feito no nosso codigo serve para mapear de evento para evento Dto, nao o contrário. Para solucionar esse problema temos 2 formas
```csharp
	//criar o inverso
	CreateMap<Evento, EventoDto>();
	CreateMap<EventoDto, Evento>();
	//ou usar o reverse map
	CreateMap<Evento, EventoDto>().ReverseMap();
```



**Aula 133 - ** Classes Dto's restantes

Como antes tinhamos comentado as propriedades com IEnumerable, temos que implementalas agora. comecemos criando os Dto's de cada uma delas *LoteDto, PalestranteDto e RedeSocialDto*

seguindo o fluxo do primeiro Evento Dto, vamos ate o dominio copiar a classe de correspondente de cada um para utilizarmos os mesmos campos

Mudando datetime para string e atualizando os tipos do dominio para os tipos dto
*ex: Evento => EventoDto*

Depois disso atualizar as associações no Helpers > ProEventosProfile.cs
```csharp
         CreateMap<Palestrante, PalestranteDto>().ReverseMap();
         CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
         CreateMap<Evento, EventoDto>().ReverseMap();
         CreateMap<Lote, LoteDto>().ReverseMap();
```


**Aula 134 -** staus code 134
mudando o retorno de erro de badrequest para 
```csharp
NoContent();
```

[Commit](https://github.com/JefteMartins/ProEventos/commit/8e84c4f2b912b5a92b1e7627cdf7df5814a0dad4)

**Aula 135, 136 e 137  -** Data Annotations e regex

uma forma de validação para os campos. 
```csharp
        [Required]
        public string Tema { get; set; }
        //adicionando mensagem de erro personalizada e validação por tamanho do conteúdo
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        StringLength(50, MinimumLength = 3,
        ErrorMessage = "O campo {0} deve ter entre 3 e 50 caracteres")]
        public string Tema { get; set; }
```

```csharp
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
         StringLength(50, MinimumLength = 3,
         ErrorMessage = "O campo {0} deve ter entre 3 e 50 caracteres")]
        public string Tema { get; set; }

        [Display(Name = "Qtd Pessoas")]
        [Range(1, 120000,
         ErrorMessage = "O campo {0} deve ter entre 1 e 120.000 pessoas")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
         ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Display(Name = "Telefone")]
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
         Phone(ErrorMessage = "O campo {0} está com número inválido")]
        public string Telefone { get; set; }

        [Display(Name = "e-mail")]
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
         EmailAddress(ErrorMessage = "O e-mail inserido é inválido")]
        public string Email { get; set; }
        
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrante { get; set; }
```

**Aula 139** - Data Annotation EF Core

Para trabalhar com um campo com nome X no código e Y no banco de dados

```csharp
[Table("NovoNome")]
```

Campo que só importa no codigo, nao no banco de dados
```csharp
        [NotMapped]
        public string ContagemDias { get; set; }
```