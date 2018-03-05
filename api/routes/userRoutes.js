'use strict'

const express = require("express");
const userRouter = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../verifyToken');

    userRouter.post('/account/login', userController.login);
    userRouter.post('/account/register', userController.register);

module.exports = userRouter;