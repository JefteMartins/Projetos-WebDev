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