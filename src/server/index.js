const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const apiRouter = require('./routes/ApiRouter');
const cookieParser = require('cookie-parser');
const { DefaultHoplite, CreateUserSchema } = require('hopLiteJS');
const { AuthnController, AuthzController } = DefaultHoplite;
require('dotenv').config();
DefaultHoplite.test("hello");
console.log(DefaultHoplite)
// AuthzController.testAuthz("Authz Running");
// AuthnController.testAuthn("Authn Running");
/*
const {inputusername, somepassword, role} = req.body;

const hopliteUser = hoplite.createUser({
  username,
  password,
  role
})

*/
const testUser = {
  username: "test1",
  password: "password123",
  role: "admin"
}

const testRules = {
  cookiejwt: {
    cookieKey: "role",
    payload: {
      test: "tested payload",
      test1: "another key",
      test2: "final key"
    },
    secret: process.env.ACCESS_TOKEN_SECRET
  }
}
let hopliteRules = createRuleset(testRules);
// query database for user.
//if user exists, run create user
// console.log(express);
app.use(cookieParser());
app.post('/authn', async (req, res) => {
  const result = await AuthnController.authenticate(testRules, res);
})

app.post('/authz', AuthzController.authorize(testRules, process.env.ACCESS_TOKEN_SECRET), (req, res) => {
  console.log("Authz fired.")
  res.status(200).send("Authorization Successful");
})
// creating session;
// const session = require('express-session');
// const { v4: uuid } = require('uuid');

//connecting to api router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../public/src/index.html')));

app.use('/static', express.static(path.resolve(__dirname, "../public/src")));

app.use('/api', apiRouter);

// // check cookie
// function checkSignIn(req, res, next) {

//   console.log('hello world middleware')
//   console.log("these are the cookies", req.cookies)
//   if (req.cookies === { role: "token" }) {
//     next();     //If session exists, proceed to page
//   } else {
//     var err = new Error("Not logged in!");
//     console.log("not logged in with cookie");
//     next(err);  //Error, trying to access unauthorized page!
//   }
// }
// app.get('/protected_page', checkSignIn, function (req, res) {
//   console.log(req.cookies)
//   // res.render('protected_page', { id: req.session.user.id })
// })


//did you guys delete app.listen?
//Don't touch this.
app.listen(port, console.log(`Server listening on Port ${port}`))