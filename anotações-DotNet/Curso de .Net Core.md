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

```C#
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