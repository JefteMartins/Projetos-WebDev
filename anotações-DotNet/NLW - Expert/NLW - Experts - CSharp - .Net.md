O projeto a ser feito consiste em um sistema de leilões utilizando banco de dados e testes unitários.

**Obs:** O curso é corrido, são somente 3 dias. Então algumas boas práticas serão deixadas de lado, mas uma lista de melhorias serão deixadas pelo instrutor.
- arquitetura (camadas e responsabilidades)
- pegando as infos diretas do BD e dando pro front sem mapeamento
- nao estao usando tasks, sem código assíncrono
- status codes
- injeção de dependência (pesquisar scoped transient singleton)
- mensagens de erro (localizar api para erros)
- validar erros (salvar ofertas válidas para produtos válidos)
- usar JWT

##### Começando:

Foi criado uma blank solution para inicar o projeto.

primeira estrutura do projeto

```plaintext
ExpertAuction.sln
│
├── src
└── tests
```


Primeiro codigo da controller

```C#
using Microsoft.AspNetCore.Mvc;

namespace ExpertAuction.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        public IActionResult GetCurrentAuction()
        {
            return Ok("Auction 1, Auction 2, Auction 3");
        }
    }
}

```


##### Organização das rotas
![[Pasted image 20240206113930.png]]



```c#
namespace ExpertAuction.API.Entities
{
    public class Auction
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty; //caso nao seja setado o nome ele vem como vazio ao invés de nulo
        public DateTime Starts { get; set; }
        public DateTime Ends { get; set; }
    }
}

```


#### Conectando DB

Instalando EFCore e EFCore Sqlite foi possível criar o dbcontext usando SQLite

```C#
using ExpertAuction.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpertAuction.API.repositories
{
    public class ExpertAuctionDbContext : DbContext
    {
        public DbSet<Auction> Auctions { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=C:\\jefte\\leilaoDbNLW.db");
        }
    }
}

```

**Algumas anotações**
A forma com que foi feita a referencia ao BD não foi a melhor, ver como foi feito no proeventos e tentar replicar ao projeto atual. 


#### Usando a tabela
o `DbSet<Auction>` é uma referencia a uma tabela ja existente no DB. para usar o uso deve ser feito da seguinte forma.

```C#
        public Auction Execute()
        {
            var repository = new ExpertAuctionDbContext();
            return repository.Auctions.First();
        }
```

Referenciando o dbcontext em uma variável é possível manipular essa variável para obter um resultado. O escolhido foi o primeiro da lista

#### Criando segunda entidade
Após isso, podemos criar a entidade Item, que contará com as informações dos itens a serem leiloados. E, assim, podemos também referenciar, como chave estrangeira, os itens no leilão, ficando da seguinte forma


```c#
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpertAuction.API.Entities
{
    [Table("Items")]
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public int Condition { get; set; }
        public decimal BasePrice { get; set; }
        public int AuctionId { get; set; }

    }
}

```

```C#
namespace ExpertAuction.API.Entities
{
    public class Auction
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Starts { get; set; }
        public DateTime Ends { get; set; }
        //caso nao seja setado, ele cria uma lista vazia
        public List<Item> Items { get; set; } = new List<Item>();
        //ou, simplificando
        //public List<Item> Items { get; set; } = [];
    }
}

```


**Estudar o pq de ser List e não IEnumerable**
[Compreendendo Listas, Coleções e Enumeradores | desenvolvedor.io](https://desenvolvedor.io/blog/dot-net-core-compreendendo-list-collection-ienumerable#:~:text=O%20classe%20gen%C3%A9rica%20%5BList%3CT,tem%20seus%20objetos%20em%20mem%C3%B3ria.)

[Controller action return types in ASP.NET Core web API | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-8.0)


### Padronizando rotas dos controllers

Para evitar o excesso de 
```C#
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
```

nos múltiplos controllers a seguinte prática foi adotada.
- cria um [NomeDoProjeto]BaseController.cs na pasta dos controllers
- Passa esse novo controller como herança para os outros controllers
- remova o código de route e ApiController dos controllers que receberam o BaseController como herança
A seguinte prática faz todos os controllers herdarem do BaseController que, por sua vez, recebe como herança a classe `ControllerBase` do do ``AspNetCore.MVC``


**De:**
![[Pasted image 20240207115042.png]].

**Para:**
![[Pasted image 20240207115356.png]]

#### Pegando Id pela URL e infos FromBody


```C#
    public class OfferController : ExpertAuctionBaseController
    {
        [HttpPost]
        //exige um ID na request, o nome da variável deve ser o mesmo do método
        [Route("{itemId}")]
        public IActionResult CreateOffer(
        [FromRoute]int itemId,
        //este codigo cria um objeto a ser recebido pelo body, o objeto deve obedecer as propriedades existentes da classe **RequestCreateOffer**
        [FromBody] RequestCreateOfferJson request)
        {
            return Created("", null);
        }
    }
```


#### Simulando um bearer token

- Primeiro foi pego um email de um usuario e ecriptado no [Base64 Encode and Decode - Online](https://www.base64encode.org/)
- criado uma pasta Filters com uma classe AuthenticationUserAttribute

```C#
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ExpertAuction.API.Filters
{
	//herdou a classe AuthorizeAttribute do AspNetCore.Authorization e a interface IAuthorizationFilter
    public class AuthenticationUserAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
		    //pega o token no body e passa para a função que vai tratar
            var token = TokenOnRequest(context.HttpContext);
        }

        private string TokenOnRequest(HttpContext context)
        {
            var authentication = context.Request.Headers.Authorization.ToString();
			// retira os 7 primeiros caracteres e salva o resto em uma string
            return authentication["Bearer ".Length..];
        }
    }
}

```

```C#
namespace ExpertAuction.API.Controllers
{
	//todos os endpoints presentes necessitam de autenticação
    [ServiceFilter(typeof(AuthenticationUserAttribute))]
    //todos os endpoients dessa controller precisam de autenticação
    public class OfferController : ExpertAuctionBaseController
    {
        [HttpPost]
        [Route("{itemId}")]
        public IActionResult CreateOffer([FromRoute]int itemId, [FromBody] RequestCreateOfferJson request)
        {
            return Created("", null);
        }
    }
}
```

```C#
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//adicionar o codigo abaixo no program.cs
builder.Services.AddScoped<AuthenticationUserAttribute>();

var app = builder.Build();

```


#### Checando se há um usuario com aquele email no BD

Para checar, a primeira coisa é adicionar a tabela de usuários como DbSet no DbContext
```C#
public DbSet<User> Users { get; set; }
```


a lógica a seguir é o seguinte
  - pegar o token de authentication
  - retirar a parte do "Bearer " para checar se é bearer e guardar o código encriptado
  - Decriptar em uma função
  - Checar se o email decriptado existe na tabela Usuários adicionado como DbSet

Código final 
```C#
namespace ExpertAuction.API.Filters
{
    public class AuthenticationUserAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
	            //primeiro e segundo ponto nesta função
                var token = TokenOnRequest(context.HttpContext);
				
				// recebendo acesso ao banco de dados
                var repository = new ExpertAuctionDbContext();
				// terceiro ponto
                var email = FromBase64String(token);
				// quarto ponto
                var exist = repository.Users.Any(user => user.Email.Equals(email));

                if (!exist)
                    context.Result = new UnauthorizedObjectResult("E-mail not valid!");
            }
            catch(Exception ex)
            {
                context.Result = new UnauthorizedObjectResult(ex.Message);
            }
        }

        private string TokenOnRequest(HttpContext context)
        {
            var authentication = context.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authentication) || !authentication.StartsWith("Bearer "))
                throw new Exception("Token not found");

            return authentication["Bearer ".Length..];
        }

        private string FromBase64String(string token)
        {
            var data = Convert.FromBase64String(token);

            return System.Text.Encoding.UTF8.GetString(data);
        }
    }
}

```

#### Passando ID do usuario logado como parametro da oferta

- Criação de uma pasta services e uma classe LoggedUser
```C#
using ExpertAuction.API.Entities;
using ExpertAuction.API.repositories;

namespace ExpertAuction.API.Services
{
    public class LoggedUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        //construtor para ter acesso ao header
        //toda vez que essa classe for instanciada o construtor é chamado
        public LoggedUser(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public User User() {
        
            var repository = new ExpertAuctionDbContext();

            var token = TokenOnRequest();
            var email = FromBase64String(token);

            return repository.Users.First(user => user.Email.Equals(email));
        }


		//mesma decodificação feita anteriormente
        private string TokenOnRequest()
        {
            var authentication = _httpContextAccessor.HttpContext!.Request.Headers.Authorization.ToString();
            return authentication["Bearer ".Length..];
        }

        private string FromBase64String(string token)
        {
            var data = Convert.FromBase64String(token);

            return System.Text.Encoding.UTF8.GetString(data);
        }
    }
}

```


utilizando ela no CreateOfferUseCase

```C#
namespace ExpertAuction.API.UseCases.Offers.CreateOffer
{
    public class CreateOfferUseCase
    {
	    //para usar desta forma, é necessário passar o logged user como injeção de dependencia com `builder.Services.AddScoped<LoggedUser>();` no program.cs
        public readonly LoggedUser _loggedUser;
        public CreateOfferUseCase(LoggedUser loggedUser) => _loggedUser = loggedUser;
        public int Execute(int itemId, RequestCreateOfferJson request)
        {
            var repository = new ExpertAuctionDbContext();

            var user = _loggedUser.User();

            var offer = new Offer { 
                CreatedOn = DateTime.Now,
                ItemId = itemId,
                Price = request.Price,
                UserId = user.Id

            };

            repository.Offers.Add(offer);

            repository.SaveChanges();

            return offer.Id;
        }
    }
}

```

## Refatoração

Primeiramente, a refatoração focará no poder de várias classes em acessar diretamente as tabelas.
 - começa com a criação de um auction repository para ter acesso ao DbContext
 ```C#
 namespace ExpertAuction.API.repositories.DataAcess
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly ExpertAuctionDbContext _dbContext;
        public AuctionRepository(ExpertAuctionDbContext dbContext) => _dbContext = dbContext;

        public Auction? GetCurrent()
        {
            var today = new DateTime(2024, 01, 25);
            return _dbContext
                 .Auctions
                 .Include(auction => auction.Items)
                 .FirstOrDefault(auction => today >= auction.Starts && today <= auction.Ends);
        }
    }
}
```

a implementação da interface ficou da seguinte forma

```C#
namespace ExpertAuction.API.Contracts
{
    public interface IAuctionRepository
    {
        Auction? GetCurrent();
    }
}

```

com a injeção de dependencia no program.cs

```C#
builder.Services.AddScoped<IAuctionRepository, AuctionRepository>();
```

Mas pq tudo isso?

Para acessarmos os Leilões sem passar o db context diretamente

com isso, o GetCurrentAuctionUseCase ficou da seguinte forma

```C#
namespace ExpertAuction.API.UseCases.Auctions.GetCurrent
{
    public class GetCurrentAuctionUseCase
    {
        private readonly IAuctionRepository _repository;

        public GetCurrentAuctionUseCase(IAuctionRepository repository) => _repository = repository;

        public Auction? Execute() => _repository.GetCurrent();
    }
} 

```

Mas pra isso tambem teve que ser adicionado a seguinte injeção no program.cs
Com isso, um new auctionRepository será instanciado quando receber a seguinte interface como parametro
```C# 
builder.Services.AddScoped<IAuctionRepository, AuctionRepository>();
```

E como a chamada é feita no endpoint, tivemos que atualizar nossa controller para receber o parametro from service

```C#

	// ANTES
	    public class AuctionController : ExpertAuctionBaseController
    {
        [HttpGet]
        [ProducesResponseType(typeof(Auction), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult GetCurrentAuction()
        {
            var useCase = new GetCurrentAuctionUseCase();

            var result = useCase.Execute();

            var item = result.Items.First();

            if (result is null)
                return NoContent();

            return Ok(result);
        }
    }
	//DEPOIS
    public class AuctionController : ExpertAuctionBaseController
    {
        [HttpGet]
        [ProducesResponseType(typeof(Auction), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult GetCurrentAuction([FromServices] GetCurrentAuctionUseCase useCase)
        {

            var result = useCase.Execute();

            if (result is null)
                return NoContent();

            return Ok(result);
        }
    }
```

##### Fazendo o msm com novas ofertas

```C#
    public class CreateOfferUseCase
    {
        public readonly LoggedUser _loggedUser;
        public CreateOfferUseCase(LoggedUser loggedUser) => _loggedUser = loggedUser;
        public int Execute(int itemId, RequestCreateOfferJson request)
        {
	        //parte crítica do código a ser refatorada
            var repository = new ExpertAuctionDbContext();

            var user = _loggedUser.User();

            var offer = new Offer { 
                CreatedOn = DateTime.Now,
                ItemId = itemId,
                Price = request.Price,
                UserId = user.Id

            };

            repository.Offers.Add(offer);

            repository.SaveChanges();

            return offer.Id;
        }
    }
```

- criar OfferRepository (classe)]
- Criar a interface IOfferRepository
- Fazer a OfferRepository receber a interface
- remover as partes do código do CreateOfferUseCase que referenciem o repository que recebe o DbContext
- Criar uma função no OfferRepository para adicionar as infos no BD. Ela sim poderá acessar o context. (função abaixo)
```C#

	//interface em outro arquivo
	
	public interface IOfferRepository
    {
        void Add(Offer offer);
    }
    
    /// implementação usando a interface

    public class OfferRepository : IOfferRepository
    {
        private readonly ExpertAuctionDbContext _dbContext;
        public OfferRepository(ExpertAuctionDbContext dbContext) => _dbContext = dbContext;
        public void Add(Offer offer)
        {
            _dbContext.Offers.Add(offer);
            _dbContext.SaveChanges();
        }
    }
```

 - Mudança no CreateOfferUseCase
**De:**
```C#
    public class CreateOfferUseCase
    {
        public readonly LoggedUser _loggedUser;
        public CreateOfferUseCase(LoggedUser loggedUser) => _loggedUser = loggedUser;
        public int Execute(int itemId, RequestCreateOfferJson request)
        {
		 //{restante to código}
```
**Para:**
```C#
        public readonly LoggedUser _loggedUser;
        private readonly IOfferRepository _offerRepository;
        public CreateOfferUseCase(LoggedUser loggedUser, IOfferRepository offerRepository)
        {
            _loggedUser = loggedUser;
            _offerRepository = offerRepository;
        }
        public int Execute(int itemId, RequestCreateOfferJson request)
        //{restante do código}
        
        //adicionando oferta ao repositório
		_offerRepository.Add(offer);
```

E, por último, adicionar a injeção de dependência

##### Usuário
- criar User repository e interface
- ver onde era usado e criar funções que se portassem da mesma forma que o código onde ele estava sendo usado (Ex: se estava sendo usado para retornar um usuário, criar uma função que retorna o usuário)
- passar como injeção de dependencia para onde estava sendo usado
- passar os parametros para o program.cs

##### Refatorando DbContext

```C#
    public class ExpertAuctionDbContext : DbContext
    {
        public ExpertAuctionDbContext(DbContextOptions<ExpertAuctionDbContext> options) : base(options) { }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Offer> Offers { get; set; }
    }
```
Retirando as options para passar para o program.cs

```C#
builder.Services.AddDbContext<ExpertAuctionDbContext>(options => options.UseSqlite("Data Source=C:\\jefte\\leilaoDbNLW.db"));
```
## Testes Unitários
- Criou projeto XUnit
- criando mesma hierarquia de pastas com UseCase.Test > Auctions > GetCurrent
- Referenciar a API no projeto de teste
	- Botao direito no projeto de teste
	- adicionar referência de projeto
- ARRANGE ACT ASSERT
	- Arrange -> o próprio useCase
instalando nuget fluent assertion


```C#
using ExpertAuction.API.Contracts;
using ExpertAuction.API.Entities;
using ExpertAuction.API.UseCases.Auctions.GetCurrent;
using FluentAssertions;
using Moq;
using Xunit;

namespace UseCase.Test.Auctions.GetCurrent
{
    public class GetCurrentAuctionUseCaseTest
    {
        [Fact]
        public void Success() {

            var mock = new Mock<IAuctionRepository>();
            mock.Setup(i => i.GetCurrent()).Returns(new Auction());
            //ARRANGE
            var useCase = new GetCurrentAuctionUseCase(mock.Object);
            //ACT  
            var auction = useCase.Execute();
            //ASSERT
            auction.Should().NotBeNull();
        }
    }
}

```