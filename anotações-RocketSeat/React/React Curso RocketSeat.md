## Projeto 1

### Iniciando com React

#### Bundlers e Compilers

**Compilers**
O topico em questão destaca a importancia dessas ferramentas para rodar o código mais atiaul do JS em navegadores que nao suportam eles. Traduzindo pra um mais antigo. Um dos mais conhecidos é o Babel
**Bundlers**
Capacidade de dividir oprojeto em arquivos e um chamar o outro para execurar o projeto
Um dos mais conhecidos é o WebPack

Can I use? para ver qual navegador suporta o que

utilização do [Vite](https://vitejs.dev)

Para dispernsar o bundler

### Criando projeto React

criando projeto com vite

`npm create vite@latest`

escolhe as configurações do projeto

**React DOM**
integração do core do react com a DOM (documment object model)
é o que faz o react integrar com o ambiente web

o `ReactDOM.createRoot(document.getElementById('root'))` aponta para a
`<div id="root"></div>` no index.html, dizendo que pelo DOM tudo que for posto dentro do react será inserido nessa Div de classe root (raiz)

o método `.render(){}` é o que vamo utilizarpara inserir todo o código react

#### Componentes

**Componentes** são partes da interface da aplicaão que pode ser repetida

### Propriedades

recebido como (props)
ex `export function Post ( props )`
e recebe as informações pssadas na tag no App.jsx

```JSX
<component prop1="Prop1 content" />
```

### CSS Modules

adicionando css modules ao programa (vem como default no vite, o que foi feito no caso foi só a criação de um arquivo .modules.css)

### CSS Global

criação de um css para o site todo e o css modules funcionará na parte específica.
Adição da fonte

### Side bar

Começando a separar a tela em 2 partes para ter a side bar

Uso do phosphor react como biblioteca para ícones

### Post

começo da estilização dos posts
Processo recomendado é pegar o modelo fo figma, pensar no HTML, após isso, pensar no CSS necessário e partir para as funcionalidades.

**considerações:** HTML semantico se torna bem importante nesse ponto, na criação do componente do post há diversos elementos
a organização em questão foi a seguinte

```HTML
<article>
	<header>
	<div>
		<img>
		<strong>
		<span>
	<time>
	<header>
	<p>
```

#### Melhorando CSS do post

```CSS
.Classe + .Classe {
 /* aplicado quando há um elemento de classe Classe depois de um elemento da classe Classe 
    Ex: 2 posts seguidos, somente o de baixo vai ser aplicado esse CSS */
}
```

```CSS
.Classe > TagHTML {
	/*Só aplica estilização ao primeiro nivel de TagHTML dentro de
	.Classe*/
}
```

Ex:

```HTML
<class='Classe' div>
	<tagHTML> AQUI PEGARIA </tagHTML>
	<div>
		<tagHTML> AQUI NÃO PEGARIA </tagHTML>
	</div>
</div>
```

`.Classe button[type="submit"] {}`
para estilizar o butao de submit

### Refatoração do Avatar

Melhorando o código do Avatar e componentizando ele

```JSX
export function Avatar({ hasBorder = true, src}) {
  return (

    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar}

     src={src} />

  );

}
```

desestruturação das props para identificar quando nao tem a prop `hasBorder` e setar valor default de `true` .

### Responsividade

```css
@media (max-width: 768px) {
    html {
        font-size: 87.5%;
    }
    .wrapper {
        grid-template-columns: 1fr;
    }
}
```

### Iteração

A parte do projeto a seguir trata de dinamizar o conteúdo. Criando um json para consumo dos posts e iterando o json para a exibição do conteúdo

### Datas

Para atualizar a data mostrada no post foi usado a biblioteca date-fns

para forçatar a data para ser usada no title e a distancia, em tempo, para o momento relativo ao que se vê o post, foi adicionado o seguinte código

```jsx
import { format, formatDistanceToNow } from 'date-fns'
import  ptBR  from 'date-fns/locale/pt-BR'
{...}

export function Post({author, publishedAt }) {
  const publishedDateFormatted = format(publishedAt, "dd 'de' MMMM 'às' HH:mm", {locale: ptBR})
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,
     {
      locale: ptBR,
      addSuffix: true
    })
  return (
  {...}
  <time title={publishedDateFormatted} dateTime=   {publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
  {...}
```

### useState

nesse momento do desenvolvimento foi inicado o uso do useState()

setado como
`const [comments, setComments] = useState([1, 2])`
o useState() passa 2 parametros, o estado inicial e uma função

foi setado o estado inicial, [1,2 ], depois o setComments, que é a função que diz o que vai acontecer com nosso estado, é adicionada posteriormente em um handler criado para adicionar os comentários recebidos no formulário

```jsx
function handleCreateNewComment() {
  event.preventDefault();
  console.log("criar novo comentário");
  setComments([...comments, comments.length + 1]);
}
```

### Programação declarativa

começando o código pegando o valor do input e adicionando ao array de comentários

```jsx
const newComment = event.target.comment.value;
setComments([...comments, newComment]);

/*sabendo que o name do textArea é `name: 'comment'`*/
```

**Imperativa**
Diz diretamente ao software o que deve ser feito, como uma receita de bolo.

**Declarativa**
Fala o resultado que se espera, dando as condições pra ter o resultado final

### Key

o uso de key em map para identificar individualmente os componentes criados na iteração

**3 momentos em que um componente é renderizado**

- Quando o estado altera
- Quando uma propriedade altera
- Quando o componente pai renderiza novamente

a key se torna fundamental pq ele compara keys existentes com as keys pós mudança para ver quais compoenentes precisam ser renderizados novamente

### Comunicação entre componentes

Unica forma de fazer os componentes se comunicarem é entre as propriedades

Mas além de strings, ints e etc, também é possível passar funções nas props

Ex:
Temos um arquivo `Comment.js` com on click passando a função que estará presente no proximo arquivo

```jsx
{...}
export function Comment({content, deleteComment}) {
{...}
function handleDeleteComment() {
    console.log('Deletar comentário')
    console.log(content) /*mesmo content recebido no componente*/
    deleteComment(content)
  }
{...}
<button onClick={handleDeleteComment} title="Deletar">
	<Trash size={20} />
</button>
{...}
}
```

E onde a função será executada, o `Post.jsx`

```jsx
function deleteComment(comment) {
  console.log(`Deletar comentário ${comment}`);
}
```

### Removendo comentários (Imutabilidade)

Não alterar variáveis, mas sim criar um novo espaço na memória

```jsx
function deleteComment(commentDelete) {
  const commentsWithoutDeleted = comments.filter(
    (comment) => comment !== commentDelete
  );
  setComments(commentsWithoutDeleted);
  console.log(`Deletar comentário ${commentDelete}`);
}
```

### Validando campo de comentário

O ponto nesse tópico foi somente permitir a publicação de comentários não vazios e desabilitar o botão nesses casos

```jsx
function handleNewCommentInvalid() {
    event.target.setCustomValidity("O comentário não pode ser vazio");
}

{...}
<textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          required
          onInvalid={handleNewCommentInvalid}
/>
<footer>
          <button type="submit" disabled={newCommentText.length == 0}>
            Publicar
          </button>
 </footer>
```

criado um handle que ajusta a validação para uma mensagem que defini

```css
.commentForm button[type="submit"]:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
.commentForm button[type="submit"]:hover:not(:disabled) {
    background: var(--green-300);
}
```

css ajustado para dar opacidade e nao permitir cursor quando o botao estiver desabilitado e nao permitir hover enquanto o botao nao estiver funcional

### Like nos comentários

criado um useState que altera o numero de likes e aparecer o numero de likes somente quando nao for 0

```jsx
const [likeCount, setLikeCount] = useState(0);
  function handleLikeComment() {
    setLikeCount(likeCount + 1);
}
{...}
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir {likeCount !== 0 ? <span>{likeCount}</span> : ''}
```

### Closures no React

```jsx
function handleLikeComment() {
  setLikeCount((state) => {
    return state + 1;
  });
}
```

### Migrando projeto para TS

### Fundamentos TS

Ts é um superset do JavaScript, um conjunto fundamental que consegue adicionar tipagem estática em cima do Js, que tem tipagem dinâmica.

### TypeScript no react

Adicionando typescript no projeto que criamos.

como o projeto ainda é pequeno, o que vai ser feito é criar um novo projeto refatorando o codigo para typescript.

**Passo a passo:**

- Criar novo projeto com `npm create vite@latest`
- Configurar projeto para Rect => Typescript
- Tirar os arquivos de src deixando apenas o vite-env
- copiar as dependencias do package.json

  ```json
      "date-fns": "^2.29.3",
  	  "phosphor-react": "^1.4.1",
  ```

- Passar os <link /> do index.html que passam as fontes
- Copiar as pastas dentro de src e colar dentro do src do novo projeto
- Migrar as estensões de `jsx` para `tsx`

\*\*Erros encontrados e seus fixes:

`Main.tsx`

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/erroMaintsx.png?raw=true" />

Fix:
`(document.getElementById('root')!)`

O erro se dá por conta do Ts não saber se aquele endereço root existe. Mas com a exclamação a gente garante que aquilo não será nulo e que root existirá.

`app.tsx`

Sem erros aparente

**Componentes:**

1 **Post**

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/errorPost.png?raw=true" />

Fix:

criação de interfaces do que se recebe!

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/postFix.png?raw=true" />

**Events:**

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/eventsError.png?raw=true" />

O ReactTS não reconhece o event, então temos que usar tipos relacionados ao usado

*Form Event*

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/formEventFix.png?raw=true" />

_ChangeEvent_

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/changeEventFix.png?raw=true" />

O evento onChange precisa de um changeEvent. E como não foi exatamente o form que disparou essa função, mas um elemento dele, tem que se passar o generics `<HTMLTextAreaElement>` informando que um elemento do textArea acionou

_InvalidEvent_

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/invalidEventFix.png?raw=true" />

_DeleteComment_

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/deleteCommentFix.png?raw=true" />

**2. Comment**

Seguem os mesmo erros de tipos, então só colocarei o antes e depois

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/commentError.png?raw=true" />

Com uma única diferença de que ele recebe uma função que tem como parametro string e nao retorna nada.

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/commentFix.png?raw=true" />

**3. Avatar**

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/avatarError.png?raw=true" />
<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/avatarFix.png?raw=true" />

### Extensão de interface

dando exemplos de caso a gente queira passar qualquer tipo de propriedade de um elemento HTML numa interface typescript

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/extension.png?raw=true" />

<img src="https://github.com/JefteMartins/Projetos-WebDev/blob/main/anota%C3%A7%C3%B5es-RocketSeat/React/images/extension2.png?raw=true" />

O que foi feito neste caso é o seguinte
Imagine que vc quer adicionar alguma propriedade de um elemento img, dentre os inúmeros que existem. Mas pra isso teria que ficar adicionando cada propriedade desejada na construção do componente. O que foi feito na imagem permite o acesso a todos os tipos de propriedades presente dentro de ImgHTMLAttributes que por sua vez herda as propriedades HTMLAttributes
