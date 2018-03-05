'use strict'

const express = require("express");
const decodeRouter = express.Router();

const linkController = require('../controllers/shortLinkController');
const userController = require('../controllers/userController');
const verifyToken = require('../verifyToken');

    decodeRouter.get('/:shortLink', linkController.get_long_url);

module.exports = decodeRouter;