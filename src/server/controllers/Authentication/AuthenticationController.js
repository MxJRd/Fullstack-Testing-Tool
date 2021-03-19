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
  authenticateToken(req, res, next) {
    const { inputUsername } = req.body;
    const username = inputUsername;
    const accessToken = jwt.sign({ username, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.ACCESS_TOKEN_SECRET);
    
    console.log("🚀 ~ file: AuthenticationController.js ~ line 15 ~ AuthenticationControllerBlueprint ~ authenticateToken ~ accessToken", accessToken);
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
const { authenticateUser, authenticateToken } = AuthenticationController;
// const authenticateToken = AuthenticationController.authenticateToken;

module.exports = {
  authenticateUser,
  authenticateToken
};