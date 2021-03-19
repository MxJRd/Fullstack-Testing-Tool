// const authorizationController = {};
require('dotenv').config();
  function checkSignIn(req, res, next) {
    console.log("these are the cookies", req.cookies);
    if (req.cookies.role === "admin") {
      console.log('it works');
      next();     //If session exists, proceed to page
    } else {
      var err = new Error("Not logged in!");
      console.log("not logged in with cookie");
      next(err);  //Error, trying to access unauthorized page!
    }
  }

  function checkJWT(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1]; // "Bearer kljahkl34jh4321jh41lkjh23k;l1j2h3lk1j2h31lkuj2j3"

    if (token === null) return res.status(401);
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // (token, secretkey, callback or promise)
    } catch (error) {
      console.log(error);
    }
  }
// const AuthorizationController = new AuthorizationControllerBlueprint();
// const { checkSignIn } = AuthorizationController;
module.exports = {
  checkSignIn,
  checkJWT
};