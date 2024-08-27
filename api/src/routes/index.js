const express = require('express');
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController.js');
const { login } = require('../controllers/authController.js');
const authenticate = require('../middleware/authenticate.js');
const authorization = require('../middleware/authorization.js');

const router = express.Router();

router.post('/register', createUser);
router.get('/user/:id', authenticate, getUser);
router.put('/user/:id', authorization, updateUser);
router.delete('/user/:id', authorization, deleteUser);

router.post('/login', login);

module.exports = router;