const express = require('express');
const { createUser, getUser } = require('../controllers/userController.js');
const { login } = require('../controllers/authController.js');
const authenticate = require('../middleware/authenticate.js');

const router = express.Router();

router.post('/register', createUser);
router.get('/user/:id', authenticate, getUser);

router.post('/login', login);

module.exports = router;