const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const db = require('../../models/TestModel');
require('dotenv').config();
// configure the global variable process.env globally.
class AuthenticationControllerBlueprint {
  // async authenticateUser(req, res, next) {
  //   const user = { username, password }
  //   const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  //   //res.json({accessToken});
  // }
  
  async authenticateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1]; // "Bearer kljahkl34jh4321jh41lkjh23k;l1j2h3lk1j2h31lkuj2j3"

    if (token === null) return res.status(401);
    try {
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // (token, secretkey, callback or promise)
    } catch (error) {
      console.log(error);
    }
  }


  async authenticateUser(req, res, next) {
    const { inputUsername, inputPassword } = req.body;
    const queryString = `SELECT * FROM credential WHERE username = '${inputUsername}'`;
    const result = await db.query(queryString);
    console.log("result.rows[0]: ", result.rows[0]);

    const { username, password } = result.rows[0];

    if (inputUsername === username && inputPassword === password) {
      res.cookie('role', 'admin').send("Cookie Set.");
    }
    next();
  }
}

const AuthenticationController = new AuthenticationControllerBlueprint();
const { authenticateUser } = AuthenticationController;
// const authenticateToken = AuthenticationController.authenticateToken;

module.exports = {
  authenticateUser,
};