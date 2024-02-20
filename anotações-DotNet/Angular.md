**Aula 80** - explicação do que vai ser feito

**Aula 81 e 82 -** Criação das interfaces 

[Link do commit](https://github.com/JefteMartins/ProEventos/commit/bcadc9a00a368b33eab44b1e437a6eb195974d6e))

Criando as interfaces no front. Basicamente a mesma coisa do C#, mas agora em TS.
O que foi bem interessante pq me deu uma ideia mt boa do quão proximo do C# o TS é.
Ex:
```typescript
import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSocial } from "./RedeSocial";

export interface Evento {
  id: number;
  local: string;
  dataEvento?: Date;
  tema: string;
  qtdPessoas: number;
  imagemURL: string;
  telefone: string;
  email: string;
  lotes: Lote[];
  redesSociais: RedeSocial[];
  palestrantesEventos: Palestrante[];
}
```

**Aula 83, 84 e 85**  - Criando services no front, injetando dependencia e tipando 
[tipando e atualizando endpoint · JefteMartins/ProEventos@9d3eff0 (github.com)](https://github.com/JefteMartins/ProEventos/commit/9d3eff06996f33b4b28cbef522c9bf79526b7d90#diff-995423baf0373c0d4cba4c59ef4a9e9e60938b2a4984a1cc3bf1739775dbfef7)

Criando services para o consumo da API

```typescript
export class EventoService {
  baseURL = 'https://localhost:5001/api/eventos';
  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`);
  }

  getEventosId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }
}
```

tipagem, usando classe evento para explicitar o que vai receber
```typescript
public eventos: Evento[] = [];
public eventosFiltrados: Evento[] = [];
showImage: boolean = false;
```

a injeção da dependencia pode ser feita de algumas formas, a utilizada foi no `app.modules.ts`

```typescript
providers: [EventoService],
```

**Aula 86 -** TS Lint
n fiz kkk

**Aula 87, 88 e 89** -  Lotes, imagens e icones | Pippe

Ajustando os botoes de editar e excluir e pipes no angular
onde eu explico o que foi feito
[Jefté no X: "[Dia 25 aka 1/4 do desafio] - Pipes no Angular Commit: https://t.co/YuiJelDm5t #100DiasDeCodigo #100DaysOfCode https://t.co/OczT2itwKQ" / X (twitter.com)](https://twitter.com/jetfemartins/status/1699963902669304125)

[pipe and icon on show img · JefteMartins/ProEventos@d23fb59 (github.com)](https://github.com/JefteMartins/ProEventos/commit/d23fb598b265cd7cb604401a3817e7717d715ebc)

**Aula 89 -** Tooltip e dropdown
nada de novo nessa parte, somente a inserção de tooltip e dropdown no codigo mesmo. O proprio commit é autoexplicativo;

[tooltip e modal · JefteMartins/ProEventos@76bd722 (github.com)](https://github.com/JefteMartins/ProEventos/commit/76bd722b2cc342900dd1c58c1c16187ef0f2ec87)




**Aula 92** - Atualizando angular
`ng update @angular/core @angular/cli` 


**Aula 91 a 100  -** toastr, desafios, parametros e routing

[toastr e spinner · JefteMartins/ProEventos@f5b2e26 (github.com)](https://github.com/JefteMartins/ProEventos/commit/f5b2e2641238573033f0d9c0d321ad0d16ce8246)

Essa parte foram bastantes aulas mas mais desafios, conceitos e coisas rapidas. Em suma foi adicionar o toastr pra mostrar a execução de algo, passando parametros pelos componentes usando @input e routing. Tudo muito simples e fácil de entender.

**Aula 102 -** bootswatch e bootsnipp

Fião, codigos prontos com bootstrap, só isso mesmo ta bom?

[Home of free code snippets for Bootstrap (bootsnipp.com)](https://bootsnipp.com/)

[Bootswatch: Free themes for Bootstrap](https://bootswatch.com/)

**Aula 142 - ** simplificando o validator
foi apresentado uma forma mais legível de fazer o validator do NgClass
criando uma função para validar, podemos passar como parametro nosso campo

```ts
export class EventoDetalheComponent implements OnInit {
	// resto do código {...}
  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

}
```

no HTML
```html
 <div class="form-group col-md-2">
          <label class="form-label">Qtd Pessoas</label>
          <input
            type="number"
            class="form-control mb-2 form-control-sm"
            [ngClass]="cssValidator(f.qtdPessoas)"
            formControlName="qtdPessoas"
            placeholder=""
          />
          <div
            *ngIf="f.qtdPessoas?.errors?.required && f.qtdPessoas?.touched"
            class="invalid-feedback"
          >
            Quantidade de pessoas é obrigatório
          </div>
          <div *ngIf="f.qtdPessoas?.errors?.max" class="invalid-feedback">
            Quantidade de pessoas excede o limite de {{ limiteDePessoas }}
          </div>
</div>
```

**Aula 143 e 144** - Datepicker e config PT-BR
Datepicker foi bem tranquilo de implementar, mas teve um ponto que deu problema na hora de salvar os dados
[Commit](https://github.com/JefteMartins/ProEventos/commit/5c62d064661627a54abf7536d337b90b584d36f0)

primeiro fazemos uma finção pra retornar as configurações
```ts
  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }
```

No HTML do componente só precisamos colocar `datepicker` no input e passar a configuração

```html
          <input
            class="form-control mb-2 form-control-sm"
            [ngClass]="cssValidator(f.dataEvento)"
            formControlName="dataEvento"
            placeholder=""
            bsDatepicker <!-- aqui -->
            [bsConfig]="bsConfig" <!-- </div> -->
          />
```

Mas dado momento o valor do input nao ficou bom pra salvar as informações, então adianto que a solução foi a seguinte

```html
          <input
            class="form-control mb-2 form-control-sm"
            [ngClass]="cssValidator(f.dataEvento)"
			
            value="{{evento.dataEvento | DateTimeFormat}}"
           
            formControlName="dataEvento"
            placeholder=""
            bsDatepicker
            [bsConfig]="bsConfig"
          />
```

com o `value="{{evento.dataEvento | DateTimeFormat}}"` o valor do datepicker fica formatado com a data que utilizamos no projeto

**Aula 145 -** Carregando evento
[commit](https://github.com/JefteMartins/ProEventos/commit/172f106e56793faa56f4c0d99095eb40ce67a1b7)

```ts
  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }
  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');
    if (eventoIdParam !== null) {
      this.spinner.show();
      this.eventoService.getEventosById(+eventoIdParam).subscribe(
        {
          next:(evento: Evento) => {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
            this.spinner.hide();
          },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.error('Erro ao tentar carregar evento.', 'Erro!');
            console.error(error);
          },
          complete: () => {
            this.spinner.hide();
          }
})}}
```

O metodo carregar evento acontece de forma simples. Ele pega o Id do parametro pelo router. Ou seja, com o evento que a gente clicou que ativou o seguinte metodo
```ts
  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
```

pelo router a gente consegue pegar o id. Nesse Id fazemos um get puxando as informações do evento clicado pelo Id e passamos o evento no patchValue, que preenche os campos.

**Aula 147 -** Delete StopPropagation

Quando clicava no botão de delete do site, ele abria o modal mas também mudava de pagina para a pagina de detalhes. Pq enfim, o botão de excluir ta na parte clicável do card. Mas tudo bem fácil de ser resolvido também
```ts
  openModal(event:any , template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
```

o `event.stopPropagation()` dentro do metodo que abre o modal irá solucionar esse problema

**Aula 148 a 154** - Terminando o crud

[Salvar e carregar detalhes evento, take e del mesg · JefteMartins/ProEventos@5088206 (github.com)](https://github.com/JefteMartins/ProEventos/commit/5088206437656aee78d6e39d0b04375315907ce7)