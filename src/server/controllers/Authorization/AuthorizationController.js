
const authorizationController = {};

authorizationController.checkSignIn = function (req, res, next) {
  console.log("these are the cookies", req.cookies);
  if (req.cookies.role === "admin") {
    console.log('it works')
    next();     //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log("not logged in with cookie");
    next(err);  //Error, trying to access unauthorized page!
  }
}

module.exports = authorizationController;