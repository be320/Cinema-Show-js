const express = require('express');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/users');



router.post('/add-user',usersController.addUser);

module.exports = router;