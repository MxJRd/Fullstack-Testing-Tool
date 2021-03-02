const express = require('express');
const ApiRouter = express.Router();
const { CrudController, getItems } = require('../controllers/CRUDController')
const { authenticateUser } = require('../controllers/Authentication/AuthenticationController');
const authorizationController = require('../controllers/Authorization/AuthorizationController')
ApiRouter.get('/', CrudController.getItems, (req, res) => {
  console.log(res.locals.allUsers);
  res.status(200).send(res.locals.allUsers);
})


ApiRouter.get('/authorizeuser', authorizationController.checkSignIn, (req, res) => {
  console.log(req.cookies.role)
})

ApiRouter.post('/createuser', CrudController.createUser, (req, res) => {

})

ApiRouter.post('/login', authenticateUser, (req, res) => {
  res.status(200);
})

ApiRouter.delete('/', CrudController.deleteItem, (req, res) => {

})

ApiRouter.patch('/', CrudController.updateItem, (req, res) => {

})
module.exports = ApiRouter;