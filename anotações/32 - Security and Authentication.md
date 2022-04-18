# Authentication & Security

## 376. Introduction to Authentication

sobre quao seguro é seu site, guaradnadoi passwords e etc

criação de um site chamado Secrets em que qualquer um pode psotar qualquer coisa sem ser identificado

## 377. Getting Set Up

mostrando como vai ser o projeto, abrindo os arquivos iniciais e instalando o node

## 378. Level 1 - Register Users with Username and Password

fazer uma inserção de dados simples no db do login e senha

```js
  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password,
    });
    newUser.save(
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.render("secrets");
        }
      }
    );
  });
```



e login vendo se existe aquele email e senha no bd

```js
 .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          if (foundUser.password === password) {
            res.render("secrets");
          }
        }
      }
    });
 });
```

## 379. How to Review the Source Code

mostrando os codigos dos commits pra ver cada etapa dos codigos implementados

## 380. Level 2 - Database Encryption

usar o mongoose encruptioon

```js
//mudança
  const userSchema = {
    email: String,
    password: String,
  }
// para
   const userSchema = new mongooose.Schema({
    email: String,
    password: String
  });

```

O plugin encrypt DEVE ficar acima do model

```js
 const userSchema = new mongooose.Schema({
    email: String,
    password: String
  });

  const secret = "Thisisourlittlesecret.";
  userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"]});
  //colocando o encrypted fields so encripta o campo especificado
  const User = mongooose.model("User", userSchema);
```

## 381. Using Environment Variables to Keep Secrets Safe

falando sobre o pq de existir enviromenment variables e sorbe o .env além do gitignore

## 382. Level 3 - Hashing Passwords



faz o hash do password no BD e ele so guarda o hash. Pra comparar quando faz o login vc faz o hash do password no login e compara com o do bd

tira tudo do mongo encryption
` const password = md5(*req*.body.password);`

## 383. Hacking 101 ☣️

falando sobre o hash da mesma palavra sempre ser o mesmo, entao da pra saber quando pessoas tem a mesma senha

da pra saber qual a senha passando o hash das senhas mais comuns e comparando 

da pra colocar o hash no google pra ver se bate com algum ja mais "famoso"

## 384. Level 4 - Salting and Hashing Passwords with bcrypt

salt seria um adicional de caracteres pra fazer o hash ainda mais seguro

o salt fica guardado com o hash

Salt rounds - o numero de vezes que sua senha vai ser "salgada" botando salt no hash pra fazer outro hash

```js
bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      const newUser = new User({
        email: req.body.username,
        password: hash,
      });
```

```js
if (foundUser) {
          bcrypt.compare(password, foundUser.password, (err, result) => {
            res.render("secrets");
          });
        }
```

## 385. What are Cookies and Sessions?

manter informações de sites pra manter login com session token, id

## 386. Using Passport.js to Add Cookies and Sessions

instalar uns packages

1. passport
2. passport-local
3. passport-local-mongoose
4. express-session

para usar os passports tirei os post do login e do register

adiciona session e initialize

```js
app.use(session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
```

adiciona um plugin no schema que tiver usando

```js
userSchema.plugin(passportLocalMongoose);
```

serialise and deserialise

usar o register com passport

```js
app.route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    User.register({username: req.body.username}, req.body.password, (err, user) => {
      if(err){
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    });
  });

```

e o login

```js
 app.route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    });
  });
```

logout

```js
  //logout route
  app.route("/logout")
  .get((req, res) => {
    req.logout();
    res.redirect("/");
  });
```

